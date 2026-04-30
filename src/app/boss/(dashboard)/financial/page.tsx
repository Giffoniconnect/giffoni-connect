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
import { PlusCircle, Search, ArrowLeft } from "lucide-react"
import { financialRecords } from '@/lib/data';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { format, parseISO } from 'date-fns';
import { useRouter } from 'next/navigation';
  
  export default function FinancialPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRecords, setFilteredRecords] = useState(financialRecords);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleSearch = () => {
        const lowercasedFilter = searchTerm.toLowerCase();
        const filteredData = financialRecords.filter((record) => {
            return (
                record.processNumber.toLowerCase().includes(lowercasedFilter) ||
                record.clientName.toLowerCase().includes(lowercasedFilter)
            );
        });
        setFilteredRecords(filteredData);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    }

    const getStatusVariant = (status: string): "default" | "secondary" | "destructive" => {
        switch (status) {
          case 'Pago':
            return 'default';
          case 'Pendente':
            return 'secondary';
          case 'Cancelado':
            return 'destructive';
          case 'Contratado':
            return 'outline';
          default:
            return 'default';
        }
    };

    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Financeiro</h1>
                <p className="text-muted-foreground">Registre e consulte o histórico financeiro vinculado aos processos.</p>
            </div>
             <Button variant="outline" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
            </Button>
        </div>
        
        <div className="flex justify-start">
            <Link href="/boss/financial/new-contract">
                 <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Adicionar Contrato de Honorários
                </Button>
            </Link>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Registros Financeiros</CardTitle>
                <CardDescription>
                    Use a busca para filtrar por número do processo ou nome do cliente.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                            placeholder="Buscar por nº do processo ou cliente..." 
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                    </div>
                    <Button onClick={handleSearch}>Buscar</Button>
                </div>
                <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Nº do Processo</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Tipo de Serviço</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {filteredRecords.map((record) => (
                        <TableRow key={record.id}>
                            <TableCell className="font-mono">{record.processNumber}</TableCell>
                            <TableCell className="font-medium">{record.clientName}</TableCell>
                            <TableCell>{record.serviceType}</TableCell>
                            <TableCell>
                                {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                                }).format(record.value)}
                            </TableCell>
                            <TableCell>{isClient ? format(parseISO(record.contractDate), 'dd/MM/yyyy') : ''}</TableCell>
                            <TableCell>
                                <Badge variant={getStatusVariant(record.status)}>{record.status}</Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </div>
            </CardContent>
        </Card>
      </div>
    )
  }
