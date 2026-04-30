
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Handshake } from 'lucide-react';
import Link from 'next/link';

export default function ObrigacoesPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 text-center">
          <Handshake className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="text-3xl font-bold tracking-tight">Direito das Obrigações</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Analisando os vínculos jurídicos que conectam credores e devedores, garantindo o cumprimento de deveres e a proteção de direitos.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Nossa Atuação em Direito das Obrigações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>O conteúdo detalhado sobre Direito das Obrigações, explicando os tipos de obrigações (dar, fazer, não fazer), as consequências do inadimplemento e nossas estratégias de atuação, será adicionado aqui em breve.</p>
            <Link href="/infoprodutos/direito-civil">
              <Button variant="outline">Voltar para Direito Civil</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
