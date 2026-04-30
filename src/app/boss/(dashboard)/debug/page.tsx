'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Bug } from 'lucide-react';

export default function DebugPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Painel de Debug</h1>
        <p className="text-muted-foreground">
          Ferramentas para identificação e depuração de erros no sistema.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bug className="h-6 w-6 text-red-500" />
            Central de Depuração
          </CardTitle>
          <CardDescription>
            Esta área será usada para exibir logs de erro, testar eventos e outras ferramentas de diagnóstico.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center rounded-lg border-2 border-dashed">
            <p className="text-muted-foreground">
                Painel de debug em construção.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
