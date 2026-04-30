'use client';

import { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose
} from '@/components/ui/dialog';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
  
const defaultMessages = [
    {
        id: '1',
        name: 'Cliente Interessado',
        email: 'cliente.interessado@email.com',
        phone: '(11) 91234-5678',
        message: 'Olá, vi a página de Direito Civil e gostaria de saber mais sobre como vocês podem me ajudar com um problema de contrato que estou enfrentando. Agradeço o retorno.',
        receivedAt: '2023-11-10T10:30:00Z',
        source: 'LP Direito Civil',
        status: 'Lido'
    }
]

type ReceivedMessage = {
    id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    receivedAt: string;
    source: string;
    status: 'Lido' | 'Não lido';
}

export default function BossMessagesPage() {
    const [messages, setMessages] = useState<ReceivedMessage[]>([]);
    const [selectedMessage, setSelectedMessage] = useState<ReceivedMessage | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        try {
            const storedMessages = localStorage.getItem('receivedMessages');
            const parsedMessages = storedMessages ? JSON.parse(storedMessages) : defaultMessages;
            // Sort messages by date, most recent first
            parsedMessages.sort((a: ReceivedMessage, b: ReceivedMessage) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime());
            setMessages(parsedMessages);
        } catch (error) {
            console.error("Failed to parse messages from localStorage", error);
            setMessages(defaultMessages);
        }
    }, []);

    const updateMessageStatus = (messageId: string, status: 'Lido' | 'Não lido') => {
        const updatedMessages = messages.map(msg => {
            if (msg.id === messageId) {
                return { ...msg, status };
            }
            return msg;
        });
        setMessages(updatedMessages);
        try {
            localStorage.setItem('receivedMessages', JSON.stringify(updatedMessages));
        } catch (error) {
            console.error("Failed to save updated messages to localStorage", error);
        }
    };

    const handleViewDetails = (message: ReceivedMessage) => {
        setSelectedMessage(message);
        setIsDialogOpen(true);
        if (message.status === 'Não lido') {
            updateMessageStatus(message.id, 'Lido');
        }
    }

    const getStatusVariant = (status: string): "default" | "secondary" => {
        return status === 'Lido' ? 'default' : 'secondary';
    }

    const generateTodoistLeadLink = (message: ReceivedMessage | null) => {
        if (!message) return '#';
        const title = encodeURIComponent(`LEAD - ${message.name} - ${message.email} - ${message.phone} #LEADS todo dia útil p1 +giffonisecretaria`);
        const comment = encodeURIComponent(message.message);
        return `https://todoist.com/add?content=${title}&comment=${comment}`;
    }

    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Mensagens Recebidas</h1>
            <p className="text-muted-foreground">Mensagens enviadas através dos formulários de contato do site.</p>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle>Caixa de Entrada</CardTitle>
                <CardDescription>
                    As mensagens mais recentes são exibidas primeiro. Clique em "Ver Detalhes" para ler a mensagem.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead className="w-[150px]">Data</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Contato</TableHead>
                        <TableHead>Origem</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {messages.map((msg) => (
                        <TableRow key={msg.id}>
                            <TableCell className="font-medium">
                                {new Date(msg.receivedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                            </TableCell>
                            <TableCell>{msg.name}</TableCell>
                            <TableCell>
                                <div className="flex flex-col">
                                    <span>{msg.email}</span>
                                    <span className="text-xs text-muted-foreground">{msg.phone}</span>
                                </div>
                            </TableCell>
                             <TableCell>
                                <Badge variant="outline">{msg.source}</Badge>
                            </TableCell>
                            <TableCell>
                                <Badge variant={getStatusVariant(msg.status)}>{msg.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="outline" size="sm" onClick={() => handleViewDetails(msg)}>
                                    Ver Detalhes
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </div>
            </CardContent>
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Detalhes da Mensagem</DialogTitle>
                    {selectedMessage && (
                        <DialogDescription>
                            Recebida de {selectedMessage.name} em {new Date(selectedMessage.receivedAt).toLocaleString('pt-BR')}.
                        </DialogDescription>
                    )}
                </DialogHeader>
                {selectedMessage && (
                    <div className="grid gap-6 py-4">
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Nome</p>
                                <p className="font-semibold">{selectedMessage.name}</p>
                            </div>
                             <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">E-mail</p>
                                <p className="font-semibold">{selectedMessage.email}</p>
                            </div>
                             <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Telefone</p>
                                <p className="font-semibold">{selectedMessage.phone}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Mensagem</p>
                                <div className="p-4 border rounded-md bg-muted min-h-[100px]">
                                    <p className="text-sm whitespace-pre-wrap">{selectedMessage.message}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 rounded-lg border bg-background p-4">
                            <h3 className="font-semibold">Ações BOSS</h3>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <a href={generateTodoistLeadLink(selectedMessage)} target="_blank" rel="noopener noreferrer" className='w-full'>
                                    <Button variant="outline" className="w-full">Criar LEAD no Todoist</Button>
                                </a>
                                <a href="https://todoist.com/add" target="_blank" rel="noopener noreferrer" className='w-full'>
                                    <Button variant="outline" className="w-full">Criar Tarefa no Todoist</Button>
                                </a>
                            </div>
                        </div>
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
