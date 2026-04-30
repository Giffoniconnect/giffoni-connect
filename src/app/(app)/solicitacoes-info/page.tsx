'use client';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
    DialogTrigger
} from '@/components/ui/dialog';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Send, BadgeCent } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const mockInfoRequests = [
    { id: 'info1', caseNumber: '0012345-67.2023.8.26.0100', clientName: 'João da Silva', opposingParty: 'Empresa ABC Ltda', actionType: 'Ação de Cobrança', type: 'Endereço atualizado da parte adversa', date: '2024-07-20', deadline: '2024-07-27', status: 'Pendente' },
    { id: 'info2', caseNumber: '0054321-98.2023.8.19.0001', clientName: 'Maria Oliveira', opposingParty: 'Designer XYZ', actionType: 'Propriedade Intelectual', type: 'E-mail de contato do contador', date: '2024-07-15', deadline: '2024-07-20', status: 'Fornecida' },
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

export default function SolicitacoesInfoPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Informações Solicitadas</h1>
                <p className="text-muted-foreground">
                    Visualize e responda às solicitações de informações pendentes, essenciais para o andamento dos seus casos.
                </p>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Relação de Informações Solicitadas</CardTitle>
                    <CardDescription>
                        Esta tabela centraliza todos os pedidos de informações feitos por nossa equipe para cada um dos seus processos.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-lg overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nº do Processo</TableHead>
                                    <TableHead>Informação Solicitada</TableHead>
                                    <TableHead>Data da Solicitação</TableHead>
                                    <TableHead>Prazo para Entrega</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Ação</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                            {mockInfoRequests.map(req => (
                                <TableRow key={req.id}>
                                    <TableCell className="font-mono">{req.caseNumber || 'N/A'}</TableCell>
                                    <TableCell className="font-medium">{req.type}</TableCell>
                                    <TableCell>{new Date(req.date).toLocaleDateString('pt-BR')}</TableCell>
                                    <TableCell>{new Date(req.deadline).toLocaleDateString('pt-BR')}</TableCell>
                                    <TableCell><Badge variant={getStatusVariant(req.status)}>{req.status}</Badge></TableCell>
                                    <TableCell className="text-right">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                        <Button variant="outline" size="sm" disabled={req.status === 'Fornecida'}>
                                            <Send className="mr-2 h-4 w-4" />
                                            Enviar
                                        </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Enviar Informação</DialogTitle>
                                            <DialogDescription>Forneça o item solicitado: "{req.type}".</DialogDescription>
                                        </DialogHeader>
                                        <div className="space-y-2">
                                            <Label htmlFor="info-text">Sua Resposta</Label>
                                            <Textarea id="info-text" placeholder="Digite a informação ou o link para o documento aqui..." className="min-h-[120px]" />
                                        </div>
                                        <DialogFooter>
                                            <DialogClose asChild><Button type="button" variant="outline">Cancelar</Button></DialogClose>
                                            <DialogClose asChild><Button type="button">Salvar e Enviar</Button></DialogClose>
                                        </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                    </TableCell>
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
