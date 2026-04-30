'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function TarefasPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Tarefas</h1>
        <p className="text-muted-foreground">
          Visualize as tarefas pendentes para você e para o escritório.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Quadro de Tarefas</CardTitle>
          <CardDescription>
            Os quadros "Minhas tarefas" e "Tarefas do Escritório" serão implementados aqui.
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