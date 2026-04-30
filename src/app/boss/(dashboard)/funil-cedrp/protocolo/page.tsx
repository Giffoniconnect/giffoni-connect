'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Save, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ProtocoloPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const [hasAudiencia, setHasAudiencia] = useState('nao');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        startTransition(() => {
            toast({
                title: 'Protocolo Registrado (Simulado)',
                description: 'O processo foi protocolado e o funil foi concluído.',
            });
            router.push('/boss/dashboard');
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Dados do Processo</CardTitle>
                    <CardDescription>
                        Insira as informações do processo após o protocolo no sistema judicial.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="numero-processo">Número do Processo</Label>
                        <Input id="numero-processo" placeholder="0000000-00.0000.0.00.0000" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="data-protocolo">Data do Protocolo</Label>
                        <Input id="data-protocolo" type="date" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Audiência</CardTitle>
                    <CardDescription>
                        Houve audiência designada no momento do protocolo?
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <RadioGroup value={hasAudiencia} onValueChange={setHasAudiencia} className="flex gap-4">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="sim" id="aud-sim" /><Label htmlFor="aud-sim">Sim</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="nao" id="aud-nao" /><Label htmlFor="aud-nao">Não</Label></div>
                    </RadioGroup>

                    {hasAudiencia === 'sim' && (
                        <div className="space-y-4 p-4 border rounded-md">
                            <h4 className="font-semibold">Dados da Audiência</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="data-audiencia">Data da Audiência</Label>
                                    <Input id="data-audiencia" type="date" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="hora-audiencia">Hora da Audiência</Label>
                                    <Input id="hora-audiencia" type="time" />
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button type="submit" disabled={isPending}>
                    {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Finalizar Funil
                </Button>
            </div>
        </form>
    );
}
