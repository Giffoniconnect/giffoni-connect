
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgePercent } from 'lucide-react';
import Link from 'next/link';

export default function IndenizacoesPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 text-center">
          <BadgePercent className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="text-3xl font-bold tracking-tight">Indenizações por Danos Morais e Materiais</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Buscando a devida reparação por prejuízos sofridos, sejam eles financeiros ou emocionais.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Nossa Atuação em Ações Indenizatórias</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>O conteúdo detalhado sobre Danos Morais e Materiais, incluindo exemplos práticos, os requisitos para uma ação e como nossa equipe pode lutar pela sua compensação, será adicionado aqui em breve.</p>
            <Link href="/infoprodutos/direito-civil">
              <Button variant="outline">Voltar para Direito Civil</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
