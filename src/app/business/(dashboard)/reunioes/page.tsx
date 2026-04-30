'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function ReunioesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Reuniões</h1>
        <p className="text-muted-foreground">
          Gerencie o agendamento de reuniões da consultoria.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Agenda de Reuniões</CardTitle>
          <CardDescription>
            A tabela de reuniões e as ações de agendamento serão implementadas aqui.
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