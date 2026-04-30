'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function MicrosolucoesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Microsoluções</h1>
        <p className="text-muted-foreground">
          Acompanhe o progresso de cada microsolução.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Microsoluções</CardTitle>
          <CardDescription>
            A lista gamificada de microsoluções será implementada aqui.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Em construção.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}