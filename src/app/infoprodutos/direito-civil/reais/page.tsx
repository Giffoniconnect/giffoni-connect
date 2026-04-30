
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home } from 'lucide-react';
import Link from 'next/link';

export default function ReaisPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 text-center">
          <Home className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="text-3xl font-bold tracking-tight">Direitos Reais</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Assessorando em todas as questões que envolvem a relação entre pessoas e bens, como posse, propriedade, condomínio e usucapião.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Nossa Atuação em Direitos Reais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>O conteúdo detalhado sobre Direitos Reais, explicando as diferenças entre posse e propriedade, as regras de condomínio, os direitos de vizinhança e como regularizar seu imóvel, será adicionado aqui em breve.</p>
            <Link href="/infoprodutos/direito-civil">
              <Button variant="outline">Voltar para Direito Civil</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
