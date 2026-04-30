
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gavel } from 'lucide-react';
import Link from 'next/link';

export default function ResponsabilidadeCivilPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 text-center">
          <Gavel className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="text-3xl font-bold tracking-tight">Responsabilidade Civil</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Atuamos na busca pela reparação de danos (materiais, morais e estéticos) causados por atos ilícitos de terceiros.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Nossa Atuação em Responsabilidade Civil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>O conteúdo detalhado sobre Responsabilidade Civil, explicando seus pressupostos (conduta, dano, nexo causal) e as situações mais comuns (acidentes de trânsito, erro médico, ofensas), será adicionado aqui em breve.</p>
            <Link href="/infoprodutos/direito-civil">
              <Button variant="outline">Voltar para Direito Civil</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
