'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ProposePartnershipPage() {

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Propor Nova Parceria</h1>
        <p className="text-muted-foreground">
          Envie os detalhes de um novo caso ou cliente para avaliação.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Formulário de Proposta</CardTitle>
          <CardDescription>
            Esta funcionalidade será implementada em breve.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center rounded-lg border-2 border-dashed">
            <p className="text-muted-foreground">
                Aguarde. Em breve você poderá propor novas parcerias por aqui.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
