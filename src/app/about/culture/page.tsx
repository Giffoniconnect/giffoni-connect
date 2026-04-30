import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartHandshake } from 'lucide-react';

export default function CulturePage() {
  return (
    <div className="container py-8">
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight">Nossa Cultura</h1>
                <p className="text-muted-foreground">
                O ambiente e a mentalidade que cultivamos em nossa equipe.
                </p>
            </div>
            <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <HeartHandshake className="h-6 w-6" />
                    Cultura Organizacional
                </CardTitle>
                </CardHeader>
                <CardContent>
                <p>O conteúdo sobre a nossa cultura será adicionado aqui em breve.</p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
