'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function BossBusinessPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Gerenciamento - Giffoni Business</h1>
        <p className="text-muted-foreground">
            Área para monitorar e gerenciar o portal de consultoria de negócios.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Painel Giffoni Business</CardTitle>
          <CardDescription>
            As ferramentas de gerenciamento para este portal serão implementadas aqui.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center rounded-lg border-2 border-dashed">
            <p className="text-muted-foreground">
                Em construção.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
