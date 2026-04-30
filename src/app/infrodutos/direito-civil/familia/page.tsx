
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import Link from 'next/link';

export default function FamiliaPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 text-center">
          <Users className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="text-3xl font-bold tracking-tight">Direito de Família</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Oferecemos suporte jurídico em momentos delicados como casamento, divórcio, união estável, guarda de filhos e pensão alimentícia.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Nossa Atuação em Direito de Família</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>O conteúdo detalhado sobre Direito de Família, abordando os regimes de bens, os tipos de divórcio, a definição da guarda e o cálculo da pensão alimentícia, será adicionado aqui em breve.</p>
            <Link href="/infoprodutos/direito-civil">
              <Button variant="outline">Voltar para Direito Civil</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
