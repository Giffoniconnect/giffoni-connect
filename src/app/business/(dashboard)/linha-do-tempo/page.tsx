'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function LinhaDoTempoPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Cronograma de Atividades</h1>
        <p className="text-muted-foreground">
          Veja um histórico cronológico de todos os eventos da consultoria.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Cronograma de Atividades</CardTitle>
          <CardDescription>
            A visualização cronológica dos eventos será implementada aqui.
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
