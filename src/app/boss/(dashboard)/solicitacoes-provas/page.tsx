'use client';
import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Search, Loader2, FileQuestion, Calendar as CalendarIcon, ArrowLeft } from 'lucide-react';
import { cases, type Case } from '@/lib/data';
import { Badge } from "@/components/ui/badge";
import { useRouter } from 'next/navigation';


const proofTypes = [
    'Prova Documental',
    'Prova Testemunhal',
    'Prova por Depoimento Pessoal',
    'Prova Audiovisual',
    'Prova Digital',
    'Outro'
];

const mockProofRequests = [
    { id: 'proof1', caseNumber: '0012345-67.2023.8.26.0100', clientName: 'João da Silva', opposingParty: 'Empresa ABC Ltda', actionType: 'Ação de Cobrança', type: 'Comprovantes de pagamento (últimos 6 meses)', date: '2024-07-22', deadline: '2024-07-29', status: 'Pendente' },
    { id: 'proof2', caseNumber: '1122334-55.2023.8.13.0024', clientName: 'Tecnologia LTDA', opposingParty: 'Construtora Y', actionType: 'Revisão Contratual', type: 'Contrato original assinado', date: '2024-07-18', deadline: '2024-07-25', status: 'Fornecida' },
];

const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'Fornecida':
        return 'default';
      case 'Pendente':
        return 'secondary';
      default:
        return 'outline';
    }
  };


export default function SolicitacoesProvasPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Case[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [deadline, setDeadline] = useState<Date | undefined>();
  const [proofType, setProofType] = useState<string>('');
  const [customProofType, setCustomProofType] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, after hydration
    setIsClient(true);
    setCurrentDate(format(new Date(), 'dd/MM/yyyy'));
  }, []);


  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setHasSearched(true);
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const lowercasedFilter = searchTerm.toLowerCase();
      const filteredData = cases.filter(
        (c) =>
          c.clientName.toLowerCase().includes(lowercasedFilter) ||
          c.opposingParty.toLowerCase().includes(lowercasedFilter) ||
          c.caseNumber.toLowerCase().includes(lowercasedFilter)
      );
      setSearchResults(filteredData);
      setHasSearched(true);
      setIsLoading(false);
    }, 1000);
  };

  const handleOpenDialog = (caseItem: Case) => {
    setSelectedCase(caseItem);
    setDeadline(undefined);
    setProofType('');
    setCustomProofType('');
  };
  
  const formatWeekdayName = (day: Date) => {
    return format(day, 'EEEEEE', { locale: ptBR });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Solicitar Provas</h1>
            <p className="text-muted-foreground">
            Busque um processo para criar uma nova solicitação de prova para o cliente.
            </p>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Buscar Processo</CardTitle>
          <CardDescription>
            Use o nome do cliente, parte adversa ou nº do processo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Digite para buscar..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Search className="mr-2 h-4 w-4" />
              )}
              Buscar
            </Button>
          </div>
        </CardContent>
      </Card>

      {hasSearched && (
        <Card>
          <CardHeader>
            <CardTitle>Resultados da Busca</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nº do Processo</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Parte Adversa</TableHead>
                    <TableHead className="text-right">Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                      </TableCell>
                    </TableRow>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((caseItem) => (
                      <TableRow key={caseItem.id}>
                        <TableCell className="font-mono">
                          {caseItem.caseNumber}
                        </TableCell>
                        <TableCell>{caseItem.clientName}</TableCell>
                        <TableCell>{caseItem.opposingParty}</TableCell>
                        <TableCell className="text-right">
                            <Dialog onOpenChange={() => handleOpenDialog(caseItem)}>
                                <DialogTrigger asChild>
                                    <Button variant="outline">
                                        <FileQuestion className="mr-2 h-4 w-4" />
                                        Solicitar Prova
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-xl">
                                    <DialogHeader>
                                        <DialogTitle>Solicitar Nova Prova</DialogTitle>
                                        <DialogDescription>
                                            Preencha os detalhes da prova a ser solicitada para o cliente do processo {selectedCase?.caseNumber}.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-6 py-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Nº do Processo</Label>
                                                <Input disabled value={selectedCase?.caseNumber || ''} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Nome do Cliente</Label>
                                                <Input disabled value={selectedCase?.clientName || ''} />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="proof-type">Qual é o tipo de Prova?</Label>
                                            <Select value={proofType} onValueChange={setProofType}>
                                                <SelectTrigger id="proof-type">
                                                    <SelectValue placeholder="Selecione o tipo..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {proofTypes.map(type => (
                                                        <SelectItem key={type} value={type}>{type}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="proof-details">Detalhes da prova (Escreva o nome da prova)</Label>
                                            <Input id="proof-details" placeholder="Ex: Contrato de aluguel, Notas fiscais de 2023..." />
                                        </div>
                                        {proofType === 'Outro' && (
                                            <div className="space-y-2">
                                                <Label htmlFor="proof-custom-type">Especifique o tipo de prova</Label>
                                                <Input 
                                                    id="proof-custom-type" 
                                                    value={customProofType}
                                                    onChange={(e) => setCustomProofType(e.target.value)}
                                                    placeholder="Digite o tipo personalizado..." 
                                                />
                                            </div>
                                        )}
                                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="request-date">Data da Solicitação</Label>
                                                <Input id="request-date" value={currentDate} disabled />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="deadline-date">Prazo para Entrega</Label>
                                                <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button variant={'outline'} className={cn('w-full justify-start text-left font-normal', !deadline && 'text-muted-foreground')}>
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {deadline ? format(deadline, 'PPP', { locale: ptBR }) : <span>Escolha uma data</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        mode="single"
                                                        selected={deadline}
                                                        onSelect={setDeadline}
                                                        initialFocus
                                                        locale={ptBR}
                                                        formatters={{ formatWeekdayName }}
                                                    />
                                                </PopoverContent>
                                                </Popover>
                                            </div>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild><Button type="button" variant="outline">Cancelar</Button></DialogClose>
                                        <DialogClose asChild><Button type="button">Criar Solicitação</Button></DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        Nenhum processo encontrado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Relação de Provas Solicitadas (Relatório Global)</CardTitle>
          <CardDescription>
            Visualize todas as solicitações de provas pendentes e fornecidas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nº do Processo</TableHead>
                        <TableHead>Prova Solicitada</TableHead>
                        <TableHead>Data da Solicitação</TableHead>
                        <TableHead>Prazo para Entrega</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {mockProofRequests.map(req => (
                    <TableRow key={req.id}>
                        <TableCell className="font-mono">{req.caseNumber}</TableCell>
                        <TableCell className="font-medium">{req.type}</TableCell>
                        <TableCell>{isClient ? new Date(req.date).toLocaleDateString('pt-BR') : ''}</TableCell>
                        <TableCell>{isClient ? new Date(req.deadline).toLocaleDateString('pt-BR') : ''}</TableCell>
                        <TableCell><Badge variant={getStatusVariant(req.status)}>{req.status}</Badge></TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
