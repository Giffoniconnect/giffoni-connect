'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function PlanoDeTrabalhoPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Plano de Trabalho</h1>
        <p className="text-muted-foreground">
          Visualize as fases, subproblemas e microsoluções da consultoria.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Plano de Trabalho</CardTitle>
          <CardDescription>
            A estrutura hierárquica do plano de trabalho será implementada aqui.
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