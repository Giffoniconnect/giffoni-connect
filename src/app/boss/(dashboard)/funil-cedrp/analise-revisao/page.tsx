'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Save, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
    status: z.enum(['aprovado', 'reprovado', 'aprovado_ressalvas'], {
        required_error: "Você precisa selecionar um status de revisão."
    }),
    ressalvas: z.string().optional(),
    motivo_reprovacao: z.string().optional(),
}).refine(data => {
    if (data.status === 'aprovado_ressalvas' && !data.ressalvas) return false;
    return true;
}, {
    message: "As ressalvas são obrigatórias quando o status é 'Aprovado com Ressalvas'.",
    path: ['ressalvas'],
}).refine(data => {
    if (data.status === 'reprovado' && !data.motivo_reprovacao) return false;
    return true;
}, {
    message: "O motivo da reprovação é obrigatório.",
    path: ['motivo_reprovacao'],
});

export default function AnaliseRevisaoPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const status = form.watch('status');

    function onSubmit(data: z.infer<typeof formSchema>) {
        startTransition(() => {
            console.log(data);
            toast({
                title: 'Análise de Revisão Salva (Simulado)',
                description: 'O resultado da revisão foi registrado.',
            });
            router.push('/boss/funil-cedrp/protocolo');
        });
    }

    return (
        <Card>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardHeader>
                        <CardTitle>Análise de Revisão</CardTitle>
                        <CardDescription>
                            Selecione o status da revisão da peça processual e adicione observações, se necessário.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormControl>
                                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl><RadioGroupItem value="aprovado" /></FormControl>
                                                <Label className="font-normal">Aprovado</Label>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl><RadioGroupItem value="aprovado_ressalvas" /></FormControl>
                                                <Label className="font-normal">Aprovado com Ressalvas</Label>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl><RadioGroupItem value="reprovado" /></FormControl>
                                                <Label className="font-normal">Reprovado</Label>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {status === 'aprovado_ressalvas' && (
                            <FormField
                                control={form.control}
                                name="ressalvas"
                                render={({ field }) => (
                                    <FormItem><Label>Ressalvas</Label><FormControl><Textarea placeholder="Descreva as ressalvas ou pequenos ajustes necessários..." {...field} /></FormControl><FormMessage /></FormItem>
                                )}
                            />
                        )}

                        {status === 'reprovado' && (
                            <FormField
                                control={form.control}
                                name="motivo_reprovacao"
                                render={({ field }) => (
                                    <FormItem><Label>Motivo da Reprovação</Label><FormControl><Textarea placeholder="Descreva em detalhes os motivos para a reprovação da peça..." {...field} /></FormControl><FormMessage /></FormItem>
                                )}
                            />
                        )}
                        <div className="flex justify-end">
                            <Button type="submit" disabled={isPending}>
                                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                Salvar Análise e Continuar
                            </Button>
                        </div>
                    </CardContent>
                </form>
            </Form>
        </Card>
    );
}
