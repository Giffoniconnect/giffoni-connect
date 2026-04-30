'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export default function FinanceiroPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Financeiro</h1>
        <p className="text-muted-foreground">
          Acesse os detalhes do seu contrato e informações de pagamento.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Contrato de Consultoria</CardTitle>
          <CardDescription>
            Acesse o contrato de prestação de serviços da consultoria.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Link href="#" target="_blank">
                <Button>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Ver Contrato
                </Button>
            </Link>
        </CardContent>
      </Card>
    </div>
  );
}
