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


const mockProofRequests = [
    { id: 'proof1', caseNumber: '0012345-67.2023.8.26.0100', clientName: 'João da Silva', opposingParty: 'Empresa ABC Ltda', actionType: 'Ação de Cobrança', type: 'Comprovantes de pagamento (últimos 6 meses)', date: '2024-07-22', deadline: '2024-07-29', status: 'Pendente' },
    { id: 'proof2', caseNumber: '1122334-55.2023.8.13.0024', clientName: 'Tecnologia LTDA', opposingParty: 'Construtora Y', actionType: 'Revisão Contratual', type: 'Contrato original assinado', date: '2024-07-18', deadline: '2024-07-25', status: 'Fornecida' },
]

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
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Provas Solicitadas</h1>
                <p className="text-muted-foreground">
                    Visualize e responda às solicitações de provas feitas por nossa equipe para cada um dos seus processos.
                </p>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Relação de Provas Solicitadas</CardTitle>
                    <CardDescription>
                        Esta tabela centraliza todos os pedidos de provas necessários para o andamento dos seus casos.
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
                                    <TableHead className="text-right">Ação</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                            {mockProofRequests.map(req => (
                                <TableRow key={req.id}>
                                    <TableCell className="font-mono">{req.caseNumber}</TableCell>
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
                                            <DialogTitle>Enviar Prova</DialogTitle>
                                            <DialogDescription>Forneça o item solicitado: "{req.type}".</DialogDescription>
                                        </DialogHeader>
                                        <div className="space-y-2">
                                            <Label htmlFor="info-text">Link para o documento/prova</Label>
                                            <Textarea id="info-text" placeholder="Cole o link para o documento aqui (Google Drive, Dropbox, etc.)..." className="min-h-[120px]" />
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
