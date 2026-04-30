'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BossAssessoriaPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Gerenciamento - Giffoni Assessoria</h1>
            <p className="text-muted-foreground">
                Área para monitorar e gerenciar o portal de assessoria jurídica.
            </p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Painel Giffoni Assessoria Jurídica</CardTitle>
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
