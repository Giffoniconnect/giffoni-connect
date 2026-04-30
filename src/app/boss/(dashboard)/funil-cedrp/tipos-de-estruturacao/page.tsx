'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Save, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function TiposDeEstruturacaoPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const [selectedStructure, setSelectedStructure] = useState('peticao-inicial');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        startTransition(() => {
            toast({
                title: 'Tipo de Estruturação Salvo (Simulado)',
                description: 'Você será redirecionado para a etapa de estruturação.',
            });
            router.push(`/boss/funil-cedrp/estruturacao/${selectedStructure}`);
        });
    };
    
    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <CardHeader>
                    <CardTitle>Tipos de Estruturação</CardTitle>
                    <CardDescription>
                        Selecione como o caso será estruturado. A opção escolhida definirá o próximo passo do funil.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <RadioGroup value={selectedStructure} onValueChange={setSelectedStructure}>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="peticao-inicial" id="peticao-inicial" />
                            <Label htmlFor="peticao-inicial">Petição Inicial (Novo Processo Judicial)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="requerimento-adm" id="requerimento-adm" />
                            <Label htmlFor="requerimento-adm">Requerimento Administrativo</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="notificacao-extra" id="notificacao-extra" />
                            <Label htmlFor="notificacao-extra">Notificação Extrajudicial</Label>
                        </div>
                    </RadioGroup>
                    <div className="flex justify-end">
                        <Button type="submit" disabled={isPending}>
                            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                            Salvar e Continuar
                        </Button>
                    </div>
                </CardContent>
            </form>
        </Card>
    );
}
