
'use client';

import { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bell, Flame, Cloud, AlertTriangle, PowerOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';


const UsageIndicator = ({ title, usage, limit, unit }: { title: string, usage: number, limit: number, unit: string }) => {
    const percentage = (usage / limit) * 100;
    let colorClass = 'bg-green-500';
    if (percentage > 80) {
        colorClass = 'bg-red-500';
    } else if (percentage > 50) {
        colorClass = 'bg-yellow-500';
    }

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-baseline">
                <p className="font-medium">{title}</p>
                <p className="text-sm text-muted-foreground font-mono">
                    {usage.toLocaleString()} / {limit.toLocaleString()} <span className="text-xs">{unit}</span>
                </p>
            </div>
            <Progress value={percentage} indicatorClassName={colorClass} />
        </div>
    );
}

export default function BillingPage() {
    const { toast } = useToast();
    const [killSwitch, setKillSwitch] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleKillSwitchToggle = (checked: boolean) => {
        setIsSaving(true);
        // Simulate an API call
        setTimeout(() => {
            setKillSwitch(checked);
            toast({
                title: checked ? 'Kill Switch Ativado!' : 'Kill Switch Desativado!',
                description: checked ? 'O faturamento foi bloqueado. O sistema entrará em modo de manutenção.' : 'O faturamento foi reativado.',
                variant: checked ? 'destructive' : 'default',
            });
            setIsSaving(false);
        }, 1000);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Controle de Billing (Blaze Plan)</h1>
                <p className="text-muted-foreground">
                    Monitore o uso dos recursos do Firebase para se manter dentro do plano gratuito.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Flame className="text-orange-500" />
                        Visão Geral do Plano Blaze (No-Cost)
                    </CardTitle>
                    <CardDescription>
                        Monitoramento em tempo real (simulado) das principais métricas de uso do Firebase.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <UsageIndicator title="Leituras do Firestore" usage={15300} limit={50000} unit="leituras/dia" />
                    <UsageIndicator title="Gravações do Firestore" usage={8250} limit={20000} unit="gravações/dia" />
                    <UsageIndicator title="Invocações do Cloud Functions" usage={950000} limit={2000000} unit="invocações/mês" />
                    <UsageIndicator title="Armazenamento do Firestore" usage={0.2} limit={1} unit="GiB" />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bell />
                        Alertas de Orçamento
                    </CardTitle>
                    <CardDescription>
                        Configuração de notificações quando o uso atingir determinados limites. (Funcionalidade conceitual)
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button variant="outline" className="w-full sm:w-auto">Configurar Alerta de 50%</Button>
                        <Button variant="outline" className="w-full sm:w-auto">Configurar Alerta de 80%</Button>
                        <Button variant="destructive" className="w-full sm:w-auto">Configurar Alerta de 100%</Button>
                    </div>
                </CardContent>
            </Card>
            
            <Card className="border-destructive">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-destructive">
                        <PowerOff />
                        Kill Switch de Faturamento
                    </CardTitle>
                    <CardDescription>
                        Desabilita automaticamente o faturamento do projeto se o orçamento for atingido.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Atenção: Ação Crítica</AlertTitle>
                        <AlertDescription>
                            Ativar o Kill Switch colocará o projeto Firebase em modo somente leitura e o site entrará em manutenção. Use com extrema cautela.
                        </AlertDescription>
                    </Alert>
                    <div className="flex items-center space-x-2 rounded-md border p-4">
                        <Label htmlFor="kill-switch" className="flex-1">
                            Ativar bloqueio automático de faturamento
                        </Label>
                        <Switch
                            id="kill-switch"
                            checked={killSwitch}
                            onCheckedChange={handleKillSwitchToggle}
                            disabled={isSaving}
                            aria-label="Ativar Kill Switch"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
