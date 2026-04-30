'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { UserCheck, Calendar as CalendarIcon, Send, FileCheck } from 'lucide-react';

export default function DelegacaoPage() {
    const router = useRouter();
    const [prazo, setPrazo] = useState<Date | undefined>();

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Delegação de Tarefas</CardTitle>
                    <CardDescription>
                        Designe o responsável e defina o prazo para a elaboração da peça processual.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="responsavel">Responsável</Label>
                        <Input id="responsavel" placeholder="Digite o nome do colaborador..." />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="prazo">Prazo Final para Elaboração</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button id="prazo" variant="outline" className={cn("w-full justify-start text-left font-normal", !prazo && "text-muted-foreground")}>
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {prazo ? format(prazo, "PPP", { locale: ptBR }) : <span>Escolha a data</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={prazo} onSelect={setPrazo} initialFocus /></PopoverContent>
                        </Popover>
                    </div>
                    <Button>
                        <UserCheck className="mr-2 h-4 w-4" />
                        Delegar Tarefa
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Próximos Passos</CardTitle></CardHeader>
                <CardContent className="flex flex-col md:flex-row gap-4">
                    <Button variant="outline" className="w-full" onClick={() => router.push('#')}>
                        <Send className="mr-2 h-4 w-4" />
                        Agendar revisão
                    </Button>
                    <Button variant="secondary" className="w-full" onClick={() => router.push('/boss/funil-cedrp/analise-revisao')}>
                        <FileCheck className="mr-2 h-4 w-4" />
                        Ir para Análise de Revisão
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
