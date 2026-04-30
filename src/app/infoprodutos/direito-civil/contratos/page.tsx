
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import Link from 'next/link';

export default function ContratosPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 text-center">
          <FileText className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="text-3xl font-bold tracking-tight">Contratos</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Garantindo segurança e clareza em seus acordos. Atuamos na elaboração, análise e revisão de todos os tipos de contratos.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Nossos Serviços em Contratos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>O conteúdo detalhado sobre nossa atuação em Contratos, incluindo os tipos de serviços, nossa metodologia e como podemos ajudar a proteger seus interesses, será adicionado aqui em breve.</p>
            <Link href="/infoprodutos/direito-civil">
              <Button variant="outline">Voltar para Direito Civil</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
