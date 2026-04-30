
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scroll } from 'lucide-react';
import Link from 'next/link';

export default function SucessoesPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 text-center">
          <Scroll className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="text-3xl font-bold tracking-tight">Direito das Sucessões</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Organizando a transmissão de patrimônio após o falecimento, por meio de inventários, testamentos e partilhas de bens.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Nossa Atuação em Sucessões</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>O conteúdo detalhado sobre Direito das Sucessões, explicando como funciona um inventário (judicial e extrajudicial), a importância do planejamento sucessório e a validade de testamentos, será adicionado aqui em breve.</p>
            <Link href="/infoprodutos/direito-civil">
              <Button variant="outline">Voltar para Direito Civil</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
