'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
    DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Download, Eye, Loader2, Search, Building, User, FileJson, Braces } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
import type { Client, TeamMember, Partner, Collaborator } from '@/lib/data';


// Helper function to calculate the size of an object in bytes
const getObjectSize = (obj: any) => {
    const jsonString = JSON.stringify(obj);
    // Rough estimation of byte size
    return new Blob([jsonString]).size;
};

// Component for a single row in the database table
const CollectionRow = ({ collectionName, mockRecords, mockSize }: { collectionName: string; mockRecords: number, mockSize: string }) => {
    const firestore = useFirestore();
    const collectionRef = useMemoFirebase(() => firestore ? collection(firestore, collectionName) : null, [firestore, collectionName]);
    const { data, isLoading } = useCollection(collectionRef);
    const [totalSize, setTotalSize] = useState(0);

    // Client-specific modal states
    const [isClientModalOpen, setIsClientModalOpen] = useState(false);
    const [isRawClientModalOpen, setIsRawClientModalOpen] = useState(false);
    const [selectedRawClient, setSelectedRawClient] = useState<Client | null>(null);
    const [clientModalTab, setClientModalTab] = useState<'pf' | 'pj'>('pf');
    const [clientSearchTerm, setClientSearchTerm] = useState('');
    const [isRawView, setIsRawView] = useState(false);

    useEffect(() => {
        if (data) {
            const size = data.reduce((acc, doc) => acc + getObjectSize(doc), 0);
            setTotalSize(size);
        }
    }, [data]);

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 KB';
        const kbytes = bytes / 1024;
        return `${kbytes.toFixed(2)} KB`;
    };

    const filteredClients = useMemo(() => {
        if (collectionName !== 'clients' || !data) return [];
        const clients = data as Client[];
        const lowercasedSearch = clientSearchTerm.toLowerCase();
        
        return clients.filter(client => {
            const matchesType = (clientModalTab === 'pf' && client.type === 'Pessoa Física') || (clientModalTab === 'pj' && client.type === 'Pessoa Jurídica');
            if (!matchesType) return false;

            if (!lowercasedSearch) return true;

            const name = client.fullName || client.companyName || '';
            const doc = client.cpf || client.cnpj || '';

            return name.toLowerCase().includes(lowercasedSearch) || doc.includes(lowercasedSearch);
        });

    }, [data, collectionName, clientModalTab, clientSearchTerm]);

    const handleViewRawClient = (client: Client) => {
        setSelectedRawClient(client);
        setIsRawClientModalOpen(true);
    };

    const renderClientModal = () => (
        <Dialog open={isClientModalOpen} onOpenChange={setIsClientModalOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm"><Eye className="mr-2 h-4 w-4" /> Ver base</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Visualizando a Coleção: {collectionName}</DialogTitle>
                    <DialogDescription>
                        Navegue, filtre e pesquise os registros de clientes.
                    </DialogDescription>
                </DialogHeader>
                
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Button variant={clientModalTab === 'pf' ? 'default' : 'outline'} onClick={() => setClientModalTab('pf')}>Pessoa Física</Button>
                        <Button variant={clientModalTab === 'pj' ? 'default' : 'outline'} onClick={() => setClientModalTab('pj')}>Pessoa Jurídica</Button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FileJson className="h-5 w-5"/>
                        <Label htmlFor="raw-view-switch">Ver Coleção Integral Bruta</Label>
                        <Switch id="raw-view-switch" checked={isRawView} onCheckedChange={setIsRawView} />
                    </div>
                </div>

                {isRawView ? (
                     <ScrollArea className="flex-1 border rounded-md bg-muted/50 p-4">
                        <pre className="text-xs">{JSON.stringify(data, null, 2)}</pre>
                     </ScrollArea>
                ) : (
                    <>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                                placeholder="Buscar por nome ou documento..." 
                                className="pl-10"
                                value={clientSearchTerm}
                                onChange={(e) => setClientSearchTerm(e.target.value)}
                            />
                        </div>
                        <ScrollArea className="flex-1 border rounded-md p-2">
                            {isLoading ? (
                                <div className="flex items-center justify-center h-full"><Loader2 className="h-6 w-6 animate-spin"/></div>
                            ) : filteredClients.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                    {filteredClients.map(client => (
                                        <div key={client.id} className="flex items-center gap-2 p-2 rounded-md border bg-card hover:bg-accent transition-colors">
                                            <Link href={`/boss/dashboard/${client.id}`} className="flex-1 flex items-center gap-2 cursor-pointer">
                                                {client.type === 'Pessoa Física' ? <User className="h-4 w-4 text-muted-foreground"/> : <Building className="h-4 w-4 text-muted-foreground"/>}
                                                <div className="flex-1">
                                                    <p className="font-semibold text-sm truncate">{client.fullName || client.companyName}</p>
                                                    <p className="text-xs text-muted-foreground">{client.cpf || client.cnpj}</p>
                                                </div>
                                            </Link>
                                            <Button variant="ghost" size="icon" onClick={() => handleViewRawClient(client)}>
                                                <Braces className="h-4 w-4" />
                                                <span className="sr-only">Ver dados brutos</span>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full text-muted-foreground">Nenhum cliente encontrado.</div>
                            )}
                        </ScrollArea>
                    </>
                )}
                
                <DialogFooter>
                    <DialogClose asChild><Button>Fechar</Button></DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

    const renderDefaultModal = () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm"><Eye className="mr-2 h-4 w-4" /> Ver base</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Visualizando a Coleção: {collectionName}</DialogTitle>
                    <DialogDescription>
                        Abaixo estão os documentos presentes nesta coleção. 
                        <Badge variant="default" className="ml-2">REAL</Badge> indica dados do Firestore.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="flex-1 border rounded-md bg-muted/50 p-4">
                   <pre className="text-xs">{JSON.stringify(data, null, 2)}</pre>
                </ScrollArea>
                <DialogFooter>
                    <DialogClose asChild><Button>Fechar</Button></DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

    return (
        <>
            <TableRow>
                <TableCell>
                    <Badge variant="secondary">{collectionName}</Badge>
                </TableCell>
                <TableCell>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : formatSize(totalSize)}
                </TableCell>
                <TableCell>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : data?.length ?? 0}
                </TableCell>
                <TableCell className="text-right space-x-2">
                    {collectionName === 'clients' ? renderClientModal() : renderDefaultModal()}
                    <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> PDF</Button>
                    <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> TXT</Button>
                    <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> CSV</Button>
                </TableCell>
            </TableRow>
            <Dialog open={isRawClientModalOpen} onOpenChange={setIsRawClientModalOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Dados Brutos do Cliente</DialogTitle>
                        <DialogDescription>{selectedRawClient?.fullName || selectedRawClient?.companyName}</DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="max-h-[60vh] border bg-muted/50 rounded-md p-4">
                        <pre className="text-xs">{JSON.stringify(selectedRawClient, null, 2)}</pre>
                    </ScrollArea>
                    <DialogFooter>
                        <DialogClose asChild><Button>Fechar</Button></DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default function DatabasePage() {
    const databases: { id: string; name: string; size: string; records: number; }[] = [
        { id: 'private_leads', name: 'private_leads', size: '1 KB', records: 0 },
        { id: 'clients', name: 'clients', size: '120 MB', records: 3 },
        { id: 'partners', name: 'partners', size: '50 MB', records: 2 },
        { id: 'collaborators', name: 'collaborators', size: '30 MB', records: 5 },
        { id: 'boss_admins', name: 'boss_admins', size: '1 KB', records: 1 },
        { id: 'team', name: 'team', size: '5 MB', records: 5 },
        { id: 'quality_control_hubs', name: 'quality_control_hubs', size: '2 MB', records: 4 },
        { id: 'meetings', name: 'meetings', size: '1 KB', records: 0 },
    ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Banco de Dados do Firebase</h1>
        <p className="text-muted-foreground">
          Consulte e exporte os dados das coleções principais do Firestore.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Coleções do Firestore</CardTitle>
          <CardDescription>
            A funcionalidade de exportação será implementada. O tamanho e os registros agora refletem os dados reais do banco de dados.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <div className="border rounded-lg overflow-hidden">
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nome da Coleção</TableHead>
                        <TableHead>Tamanho (Calculado)</TableHead>
                        <TableHead>Registros</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {databases.map(db => (
                         <CollectionRow 
                            key={db.id}
                            collectionName={db.name}
                            mockRecords={db.records}
                            mockSize={db.size}
                         />
                    ))}
                </TableBody>
             </Table>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}

