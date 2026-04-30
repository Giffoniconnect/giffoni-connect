'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock6 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PlanejamentoMedioPrazoPage() {
  const router = useRouter();

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">
                    Planejamento de Médio Prazo
                </h1>
                <p className="text-muted-foreground">
                    Soluções para o Planejamento de Médio Prazo da sua empresa.
                </p>
            </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock6 className="h-6 w-6" />
              Em Construção
            </CardTitle>
            <CardDescription>
              O conteúdo detalhado sobre esta competência será adicionado aqui em breve.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Volte em breve para ver as soluções completas que a Giffoni Business pode oferecer para o Planejamento de Médio Prazo.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
