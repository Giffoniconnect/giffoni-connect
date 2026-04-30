
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useState, useTransition } from 'react';

import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { Client } from '@/lib/data';
import { createProcess } from './actions';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2, ArrowLeft, Save, CheckCircle, XCircle, Circle } from 'lucide-react';

const cnjRegex = /^\d{7}-\d{2}\.\d{4}\.\d\.\d{2}\.\d{4}$/;

const formSchema = z.object({
  opposingParty: z.string().min(1, 'O nome da parte adversa é obrigatório.'),
  caseNumber: z.string().regex(cnjRegex, 'Número de processo inválido. Use o formato NNNNNNN-DD.AAAA.J.TR.OOOO.'),
  district: z.string().min(1, 'A comarca é obrigatória.'),
  state: z.string().min(2, 'O estado é obrigatório (UF)').max(2, 'Use a sigla do estado (ex: MG)'),
  court: z.string().min(1, 'A vara é obrigatória.'),
  responsibleJudge: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewProcessPage() {
    const router = useRouter();
    const params = useParams();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const clientId = params.clientId as string;
    const firestore = useFirestore();

    const [todoistTaskPreview, setTodoistTaskPreview] = useState('');
    const [integrationStatus, setIntegrationStatus] = useState<'idle' | 'success' | 'error'>('idle');


    const clientRef = useMemoFirebase(() => (firestore && clientId ? doc(firestore, 'clients', clientId) : null), [firestore, clientId]);
    const { data: client, isLoading: isClientLoading } = useDoc<Client>(clientRef);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            opposingParty: '',
            caseNumber: '',
            district: '',
            state: '',
            court: '',
            responsibleJudge: '',
        },
    });

    const formatCNJ = (value: string) => {
        const v = value.replace(/\D/g, '').slice(0, 20);
        if (v.length > 16) {
            return `${v.slice(0, 7)}-${v.slice(7, 9)}.${v.slice(9, 13)}.${v.slice(13, 14)}.${v.slice(14, 16)}.${v.slice(16, 20)}`;
        } else if (v.length > 14) {
            return `${v.slice(0, 7)}-${v.slice(7, 9)}.${v.slice(9, 13)}.${v.slice(13, 14)}.${v.slice(14, 16)}`;
        } else if (v.length > 13) {
            return `${v.slice(0, 7)}-${v.slice(7, 9)}.${v.slice(9, 13)}.${v.slice(13, 14)}`;
        } else if (v.length > 9) {
            return `${v.slice(0, 7)}-${v.slice(7, 9)}.${v.slice(9, 13)}`;
        } else if (v.length > 7) {
            return `${v.slice(0, 7)}-${v.slice(7, 9)}`;
        }
        return v;
    };


    async function onSubmit(values: FormValues) {
        if (!client) return;
        startTransition(async () => {
            const caseData = { ...values, clientName: client.fullName || client.companyName || '' }
            const result = await createProcess(clientId, caseData);

            if (result.success) {
                toast({
                    title: 'Processo Criado com Sucesso!',
                    description: `O novo processo para ${client?.fullName || client?.companyName} foi registrado.`,
                });
                
                const taskPreview = `${client.fullName || client.companyName} x ${values.opposingParty} - ${values.caseNumber} - ${values.district.toUpperCase()}/${values.state.toUpperCase()} - ${values.court.toUpperCase()}`;
                setTodoistTaskPreview(taskPreview);
                setIntegrationStatus('success');

            } else {
                toast({
                    variant: 'destructive',
                    title: 'Erro ao Criar Processo',
                    description: result.error || 'Não foi possível criar o novo processo.',
                });
                setIntegrationStatus('error');
            }
        });
    }

    if (isClientLoading) {
        return (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        );
    }
    
    if (!client) {
        return (
          <div className="flex flex-col items-center justify-center gap-4 text-center h-full">
            <h1 className="text-2xl font-bold">Cliente não encontrado</h1>
            <Button onClick={() => router.push('/boss/dashboard')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Painel de Clientes
            </Button>
          </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => router.push(`/boss/clients/${clientId}`)}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Cadastro de novo Processo</h1>
                    <p className="text-muted-foreground">
                        Para o cliente: <span className="font-semibold text-primary">{client.fullName || client.companyName}</span>
                    </p>
                </div>
            </div>

            <Card>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardHeader>
                            <CardTitle>Detalhes do Processo</CardTitle>
                            <CardDescription>Preencha as informações abaixo para registrar um novo processo.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <FormItem>
                                <FormLabel>Nome do Cliente</FormLabel>
                                <FormControl>
                                    <Input disabled value={client.fullName || client.companyName || ''} />
                                </FormControl>
                            </FormItem>
                             <FormField
                                control={form.control}
                                name="opposingParty"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome da parte adversa</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nome da parte contrária" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="caseNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Número do Processo</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="0000000-00.0000.0.00.0000"
                                                {...field}
                                                onChange={(e) => {
                                                    const formatted = formatCNJ(e.target.value);
                                                    field.onChange(formatted);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="district"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Comarca</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Ex: Viçosa" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="state"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Estado (UF)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Ex: MG" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="court"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Vara</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Ex: 1ª Vara Cível" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="responsibleJudge"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Juiz Responsável</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Ex: Dr. Fulano de Tal" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                             </div>
                        </CardContent>
                        <div className="p-6 pt-0 flex justify-end">
                            <Button type="submit" disabled={isPending}>
                                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                Salvar Novo Processo
                            </Button>
                        </div>
                    </form>
                </Form>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Integração para criação de Tarefa no Todoist</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    {/* Coluna 1 */}
                    <div className="space-y-2">
                        <Label>Visualização da Pré-estrutura da Tarefa</Label>
                        <div className="p-3 border rounded-md bg-muted text-sm font-mono h-[100px] flex items-center justify-center text-muted-foreground">
                            {todoistTaskPreview || 'A pré-estrutura da tarefa aparecerá aqui após salvar.'}
                        </div>
                    </div>
                    {/* Coluna 2 */}
                    <div className="flex justify-center">
                        <Button variant="outline" disabled={!todoistTaskPreview}>
                            CADASTRAR NOVO PROCESSO NO TODOIST
                        </Button>
                    </div>
                    {/* Coluna 3 */}
                    <div className="space-y-2 text-center">
                        <Label>Status da Integração</Label>
                        {integrationStatus === 'success' && (
                            <div className="text-green-600 font-semibold flex items-center justify-center gap-2">
                                <CheckCircle className="h-4 w-4" />
                                <span>Criado com sucesso</span>
                            </div>
                        )}
                        {integrationStatus === 'error' && (
                            <div className="text-red-600 font-semibold flex items-center justify-center gap-2">
                                <XCircle className="h-4 w-4" />
                                <span>Falha na integração</span>
                            </div>
                        )}
                        {integrationStatus === 'idle' && (
                            <div className="text-muted-foreground flex items-center justify-center gap-2">
                                <Circle className="h-4 w-4" />
                                <span>Aguardando</span>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}

