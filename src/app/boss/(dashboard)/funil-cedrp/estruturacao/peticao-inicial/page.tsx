'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, Loader2, BrainCircuit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function PeticaoInicialPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        startTransition(() => {
            toast({
                title: 'Estruturação Salva (Simulado)',
                description: 'A petição inicial foi salva com sucesso.',
            });
            router.push('/boss/funil-cedrp/delegacao');
        });
    };

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <CardHeader>
                    <CardTitle>Estruturação da Petição Inicial</CardTitle>
                    <CardDescription>
                        Preencha as seções da petição. Você pode usar a IA para auxiliar na elaboração.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="fatos">Fatos</Label>
                        <Textarea id="fatos" placeholder="Descreva os fatos que deram origem à causa..." className="min-h-[120px]" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="fundamentos">Fundamentos Jurídicos</Label>
                        <Textarea id="fundamentos" placeholder="Apresente a base legal para os pedidos..." className="min-h-[120px]" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="pedidos">Pedidos</Label>
                        <Textarea id="pedidos" placeholder="Liste todos os pedidos, como condenação, citação, etc..." className="min-h-[120px]" />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button type="button" variant="secondary" disabled={isPending}>
                        <BrainCircuit className="mr-2 h-4 w-4" />
                        Estruturar com IA
                    </Button>
                    <div className="flex gap-2">
                        <Button type="submit" disabled={isPending}>
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Salvar Estruturação
                        </Button>
                        <Button type="button" onClick={() => router.push('/boss/funil-cedrp/delegacao')} disabled={isPending}>
                            Iniciar Delegação
                        </Button>
                    </div>
                </CardFooter>
            </form>
        </Card>
    );
}
