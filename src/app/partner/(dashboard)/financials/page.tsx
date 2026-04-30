'use client';

import { useState } from 'react';
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
import { Search, CheckCircle, XCircle } from "lucide-react"
import { financialRecords as allFinancialRecords } from '@/lib/data';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose
} from '@/components/ui/dialog';

type FinancialRecord = typeof allFinancialRecords[0];
  
export default function PartnerFinancialsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [records, setRecords] = useState<FinancialRecord[]>(allFinancialRecords);
    const [selectedRecord, setSelectedRecord] = useState<FinancialRecord | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);


    const handleSearch = () => {
        const lowercasedFilter = searchTerm.toLowerCase();
        if (!lowercasedFilter) {
            setRecords(allFinancialRecords);
            return;
        }

        const filteredData = allFinancialRecords.filter((record) => {
            const clientMatch = record.clientName.toLowerCase().includes(lowercasedFilter);
            const processMatch = record.processNumber.toLowerCase().includes(lowercasedFilter);
            const opposingPartyMatch = record.opposingParty.toLowerCase().includes(lowercasedFilter);
            const serviceTypeMatch = record.serviceType.toLowerCase().includes(lowercasedFilter);
            
            return clientMatch || processMatch || opposingPartyMatch || serviceTypeMatch;
        });
        setRecords(filteredData);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    }
    
    const handleViewDetails = (record: FinancialRecord) => {
        setSelectedRecord(record);
        setIsDialogOpen(true);
    };

    const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
        switch (status) {
          case 'Pago': return 'default';
          case 'Pendente': return 'secondary';
          case 'Cancelado': return 'destructive';
          case 'Contratado': return 'outline';
          default: return 'default';
        }
    };
    
    const DetailItem = ({ label, value, isCurrency = false }: { label: string; value?: string | number; isCurrency?: boolean}) => {
        if (value === undefined || value === null) return null;
        
        let displayValue: React.ReactNode = value;
        if (isCurrency && typeof value === 'number') {
            displayValue = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
        }

        return (
            <div>
                <p className="text-sm font-medium text-muted-foreground">{label}</p>
                <p className="font-semibold">{displayValue}</p>
            </div>
        );
    }
    
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
    }

    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Controle Financeiro da Parceria</h1>
            <p className="text-muted-foreground">Consulte o histórico financeiro dos clientes e casos da parceria.</p>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Registros Financeiros</CardTitle>
                <CardDescription>
                    Busque por nome do cliente, nº do processo, parte adversa ou tipo de serviço.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                            placeholder="Buscar registros..." 
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
                        <TableHead>Parte Adversa</TableHead>
                        <TableHead>Valor Total</TableHead>
                        <TableHead>Status Pag.</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {records.length > 0 ? (
                        records.map((record) => (
                            <TableRow key={record.id}>
                                <TableCell className="font-mono">{record.processNumber}</TableCell>
                                <TableCell className="font-medium">{record.clientName}</TableCell>
                                <TableCell>{record.opposingParty}</TableCell>
                                <TableCell>
                                    {new Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                    }).format(record.value)}
                                </TableCell>
                                <TableCell>
                                    <Badge variant={getStatusVariant(record.status)}>{record.status}</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm" onClick={() => handleViewDetails(record)}>
                                        Ver Contrato
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center h-24">
                                Nenhum registro encontrado.
                            </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
                </div>
            </CardContent>
        </Card>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Detalhes do Contrato</DialogTitle>
                    {selectedRecord && (
                        <DialogDescription>
                            Contrato referente ao processo {selectedRecord.processNumber}.
                        </DialogDescription>
                    )}
                </DialogHeader>
                {selectedRecord?.contractDetails && (
                    <div className="grid gap-6 py-4">
                       
                       <div className="p-4 border rounded-lg space-y-4">
                            <h3 className="font-semibold text-lg">Resumo do Contrato</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <DetailItem label="Valor Total dos Honorários" value={selectedRecord.contractDetails.totalFees} isCurrency />
                                <DetailItem label="Forma de Rateio" value={selectedRecord.contractDetails.feeSplit} />
                                <DetailItem label="Sua Expectativa Total" value={selectedRecord.contractDetails.partnerExpectedPayout} isCurrency />
                            </div>
                        </div>

                        {selectedRecord.contractDetails.installments ? (
                            <div className="space-y-2">
                                <h3 className="font-semibold text-lg">Detalhamento de Parcelas</h3>
                                <div className="border rounded-lg overflow-hidden">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="text-center">Parcela</TableHead>
                                            <TableHead>Valor</TableHead>
                                            <TableHead>Vencimento</TableHead>
                                            <TableHead>Seu Repasse</TableHead>
                                            <TableHead className="text-center">Status Repasse</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {selectedRecord.contractDetails.installments.map(inst => (
                                            <TableRow key={inst.installmentNumber}>
                                                <TableCell className="text-center font-medium">{inst.installmentNumber}</TableCell>
                                                <TableCell>{formatCurrency(inst.value)}</TableCell>
                                                <TableCell>{new Date(inst.dueDate).toLocaleDateString()}</TableCell>
                                                <TableCell>{formatCurrency(inst.partnerPayoutValue)}</TableCell>
                                                <TableCell className="text-center">
                                                    {inst.payoutComplete ? (
                                                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                                                    ) : (
                                                        <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                </div>
                            </div>
                        ) : (
                             <div className="p-4 border rounded-lg space-y-4">
                                <h3 className="font-semibold text-lg">Detalhes do Pagamento Único</h3>
                                <DetailItem label="Data de Vencimento" value={selectedRecord.contractDetails.dueDate ? new Date(selectedRecord.contractDetails.dueDate).toLocaleDateString() : '-'} />
                                <DetailItem label="Data de Repasse" value={selectedRecord.contractDetails.payoutDate ? new Date(selectedRecord.contractDetails.payoutDate).toLocaleDateString() : 'Pendente'} />
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-medium text-muted-foreground">Repasse Ocorreu?</p>
                                    {selectedRecord.contractDetails.payoutComplete ? (
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                    ) : (
                                        <XCircle className="h-5 w-5 text-red-500" />
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button">Fechar</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </div>
    )
  }
