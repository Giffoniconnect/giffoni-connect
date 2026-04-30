'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Loader2, PlusCircle, User, Handshake, Briefcase, CheckCircle, XCircle, Copy, DatabaseZap, ArrowLeft } from "lucide-react"
import { useFirestore } from '@/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { getDocs, collection, limit, query, where, Firestore } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

// --- Logic from globalSearch.ts moved here ---

export type UnifiedSearchResult = {
    id: string;
    name: string;
    type: 'Pessoa Física' | 'Pessoa Jurídica';
    entityType: 'Cliente' | 'Parceiro' | 'Colaborador';
};

type LogFn = (entry: { message: string; status: 'info' | 'success' | 'error' }) => void;

async function executeQuery(
    firestore: Firestore,
    log: LogFn,
    collectionName: 'clients' | 'partners' | 'collaborators',
    searchField: string,
    searchTerm: string
): Promise<UnifiedSearchResult[]> {
    const results: UnifiedSearchResult[] = [];
    try {
        log({ message: `➡️ Consultando '${collectionName}' com ${searchField}`, status: 'info' });
        const q = query(
            collection(firestore, collectionName),
            where(searchField, '>=', searchTerm),
            where(searchField, '<=', searchTerm + '\uf8ff')
        );
        const querySnapshot = await getDocs(q);
        log({ message: `📦 ${collectionName} retornou: ${querySnapshot.size} registros`, status: 'success' });
        
        querySnapshot.forEach(doc => {
            const data = doc.data();
            let entityType: UnifiedSearchResult['entityType'];
            let type: UnifiedSearchResult['type'] = 'Pessoa Física';

            if (collectionName === 'clients') {
                entityType = 'Cliente';
                if (data.type === 'Pessoa Jurídica') type = 'Pessoa Jurídica';
            } else if (collectionName === 'partners') {
                entityType = 'Parceiro';
            } else {
                entityType = 'Colaborador';
            }

            results.push({
                id: doc.id,
                name: data.fullName || data.companyName || data.name,
                type: type,
                entityType: entityType
            });
        });
    } catch (error: any) {
        log({ message: `❌ Erro ao consultar '${collectionName}': ${error.message}`, status: 'error' });
    }
    return results;
}

export async function globalSearch(
    firestore: Firestore,
    searchTerm: string,
    log: LogFn
) {
    const isEmail = (str: string) => str.includes('@');
    const isNumeric = (str: string) => /^\d{2,3}(\.?\d{3})?(\.?\d{3})?(\/?\d{4})?-?\d{2}$/.test(str);
    
    const normalizedTerm = searchTerm.trim().toLowerCase();
    let searchType: 'Nome' | 'Email' | 'Documento' = 'Nome';
    let results: UnifiedSearchResult[] = [];
    
    if (isEmail(normalizedTerm)) {
        searchType = 'Email';
    } else if (isNumeric(normalizedTerm)) {
        searchType = 'Documento';
    }

    log({ message: `🔎 Tipo de busca detectado: ${searchType}`, status: 'info' });
    log({ message: `🔎 Termo normalizado: "${normalizedTerm}"`, status: 'info' });

    if (searchType === 'Nome') {
        // Search clients by name (PF and PJ)
        const clientResultsPF = await executeQuery(firestore, log, 'clients', '_searchableName', normalizedTerm);
        const clientResultsPJAdmin = await executeQuery(firestore, log, 'clients', '_searchableAdminName', normalizedTerm);
        
        // Search partners and collaborators
        const partnerResults = await executeQuery(firestore, log, 'partners', '_searchableName', normalizedTerm);
        const collaboratorResults = await executeQuery(firestore, log, 'collaborators', '_searchableName', normalizedTerm);

        const combined = new Map<string, UnifiedSearchResult>();
        [...clientResultsPF, ...clientResultsPJAdmin, ...partnerResults, ...collaboratorResults].forEach(item => {
            combined.set(item.id, item);
        });
        results = Array.from(combined.values());
    }
    
    return { results, searchType, normalizedTerm };
}

// --- End of logic from globalSearch.ts ---

type LogEntry = {
    message: string;
    status: 'pending' | 'success' | 'error' | 'info';
};

const LogIcon = ({ status }: { status: LogEntry['status'] }) => {
    if (status === 'pending') return <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />;
    if (status === 'success') return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (status === 'error') return <XCircle className="h-4 w-4 text-destructive" />;
    return <span className="text-blue-500 font-bold">🔎</span>; // Info
};


export default function BossDashboardPage() {
    const firestore = useFirestore();
    const { toast } = useToast();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<UnifiedSearchResult[] | null>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [isReady, setIsReady] = useState(false);

    const addLog = (entry: LogEntry) => {
        setLogs(prev => [...prev, entry]);
    };

    useEffect(() => {
        if (!firestore) {
            setLogs([{ message: 'Aguardando instância do Firestore...', status: 'info' }]);
            return;
        }

        const checkConnections = async () => {
          setLogs([]); // Reset logs
          let allChecksPassed = true;
          
          addLog({ message: 'Firebase inicializado', status: 'success' });
          addLog({ message: 'Firestore disponível', status: 'success' });
          
          const checkCollection = async (name: string): Promise<boolean> => {
            try {
              addLog({ message: `Verificando acesso à coleção '${name}'...`, status: 'info' });
              await getDocs(query(collection(firestore, name), limit(1)));
              addLog({ message: `Acesso à coleção '${name}': OK`, status: 'success' });
              return true;
            } catch (e: any) {
                addLog({ message: `Acesso à coleção '${name}': ERRO. Permissões podem estar faltando ou a coleção não existe.`, status: 'error' });
                console.error(`Firestore access error (${name}):`, e);
                return false;
            }
          };
    
          const checks = await Promise.all([
            checkCollection('clients'),
            checkCollection('partners'),
            checkCollection('collaborators')
          ]);
          allChecksPassed = checks.every(result => result);
    
          if (allChecksPassed) {
            addLog({ message: 'Conexões verificadas. Busca pronta para uso.', status: 'success' });
            setIsReady(true);
          } else {
             addLog({ message: 'Busca desabilitada devido a erro de conexão com uma ou mais coleções.', status: 'error' });
             setIsReady(false);
          }
        };
    
        checkConnections();

    }, [firestore]);


    const handleSearch = async () => {
        if (!isReady || !searchTerm.trim()) {
            setResults([]);
            return;
        }
        
        setIsSearching(true);
        setResults([]);
        setLogs([]); // Clear logs for new search
        addLog({ message: 'Iniciando nova busca...', status: 'info' });
        
        try {
            const { results: finalResults } = await globalSearch(firestore, searchTerm, addLog as LogFn);
            
            addLog({ message: `Busca concluída. Total de resultados: ${finalResults.length}`, status: 'success' });
            setResults(finalResults);

        } catch (error: any) {
            console.error("Erro na busca:", error);
            addLog({ message: `❌ Erro na busca: ${error.message}`, status: 'error' });
            setResults([]);
        } finally {
             setIsSearching(false);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };
    
    const getDetailLink = (item: UnifiedSearchResult): string => {
        switch (item.entityType) {
            case 'Cliente':
                return `/boss/clients/${item.id}`;
            case 'Parceiro':
                return `/boss/partners/${item.id}`;
            case 'Colaborador':
                return `/boss/collaborators/${item.id}`;
            default:
                return '#';
        }
    };

    const getEntityTypeIcon = (type: UnifiedSearchResult['entityType']) => {
        switch (type) {
            case 'Cliente': return <User className="h-4 w-4 text-muted-foreground" />;
            case 'Parceiro': return <Handshake className="h-4 w-4 text-muted-foreground" />;
            case 'Colaborador': return <Briefcase className="h-4 w-4 text-muted-foreground" />;
            default: return null;
        }
    }
    
    const handleCopyLogs = () => {
        const logText = `Logs de Diagnóstico - ${new Date().toISOString()}\n\n` + logs.map(log => `${log.status.toUpperCase()}: ${log.message}`).join('\n');
        navigator.clipboard.writeText(logText);
        toast({
            title: "Logs Copiados!",
            description: "O status da conexão e da busca foi copiado para a área de transferência."
        });
    }

    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight">Painel de Clientes</h1>
              <p className="text-muted-foreground">Consulte clientes, parceiros e colaboradores em um único lugar.</p>
          </div>
          <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
          </Button>
        </div>
        
        <div className="flex flex-col gap-4">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-semibold">Status da Conexão</CardTitle>
                        <Button variant="outline" size="sm" onClick={handleCopyLogs}>
                            <Copy className="mr-2 h-4 w-4" />
                            Copiar Logs
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <div className="space-y-1 font-mono text-xs">
                        {logs.map((log, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <LogIcon status={log.status} />
                            <span className={log.status === 'error' ? 'text-destructive font-semibold' : 'text-muted-foreground'}>{log.message}</span>
                        </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="Buscar por nome, e-mail, CPF/CNPJ..." 
                        className="pl-10 h-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyPress}
                        disabled={!isReady || isSearching}
                        title={!isReady ? "Aguardando conexão com a base de dados..." : ""}
                    />
                </div>
                <Button onClick={handleSearch} disabled={!isReady || isSearching} className="w-full sm:w-auto">
                    {isSearching ? <Loader2 className="h-4 w-4 animate-spin"/> : "Buscar"}
                </Button>
            </div>
             <div className="flex flex-col sm:flex-row gap-2">
                <Link href="/boss/service-desk" className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Cadastrar Cliente
                    </Button>
                </Link>
                <Link href="/boss/database/migrate" className="w-full sm:w-auto">
                    <Button variant="destructive" className="w-full">
                         <DatabaseZap className="mr-2 h-4 w-4" />
                         Migrar Dados Antigos para Busca
                    </Button>
                </Link>
            </div>
        </div>

        <div className="border rounded-lg overflow-hidden bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome / Razão Social</TableHead>
                <TableHead>Portal de Origem</TableHead>
                <TableHead>Tipo de Pessoa</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isSearching ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                    <p className="text-sm text-muted-foreground mt-2">Buscando...</p>
                  </TableCell>
                </TableRow>
              ) : results && results.length > 0 ? (
                results.map((item) => (
                <TableRow key={`${item.entityType}-${item.id}`}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <Badge variant={'secondary'} className="flex items-center gap-1.5 w-fit">
                        {getEntityTypeIcon(item.entityType)}
                        {item.entityType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {item.type || 'Pessoa Física'}
                  </TableCell>
                  <TableCell className="text-right">
                      <Link href={getDetailLink(item)}>
                        <Button variant="outline" size="sm">Ver Detalhes</Button>
                      </Link>
                  </TableCell>
                </TableRow>
              ))
              ) : (
                <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                        {results === null ? "Faça uma busca para ver os resultados." : "Nenhum registro encontrado."}
                    </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }
