'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { BrainCircuit } from 'lucide-react';

export default function AiIntegrationPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Integração com IA (Terceira Onda)</h1>
        <p className="text-muted-foreground">
          Painel para gerenciar e visualizar agentes de IA e automações avançadas no workflow.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BrainCircuit className="h-6 w-6 text-primary" />
            Hub de Agentes de IA
          </CardTitle>
          <CardDescription>
            Esta área será usada para orquestrar agentes de IA que executam tarefas complexas e automatizadas, representando a "terceira onda" de integração.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center rounded-lg border-2 border-dashed">
            <p className="text-muted-foreground">
                Painel de integração de agentes de IA em construção.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
