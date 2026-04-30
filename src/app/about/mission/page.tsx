import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket } from 'lucide-react';

export default function MissionPage() {
  return (
    <div className="container py-8">
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight">Nossa Missão</h1>
                <p className="text-muted-foreground">
                O propósito que nos move e direciona nossas ações diárias.
                </p>
            </div>
            <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Rocket className="h-6 w-6" />
                    Missão
                </CardTitle>
                </CardHeader>
                <CardContent>
                <p>O conteúdo sobre a nossa missão será adicionado aqui em breve.</p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
