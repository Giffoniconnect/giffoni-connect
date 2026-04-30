import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ConsultoriaJuridicaPage() {
  return (
    <div className="container py-8">
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight">Consultoria Jurídica</h1>
                <p className="text-muted-foreground">
                    Orientação estratégica e pareceres para tomada de decisão segura.
                </p>
            </div>
            <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-6 w-6" />
                    Detalhes da Área
                </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                <p>O conteúdo detalhado sobre Consultoria Jurídica, incluindo nossos serviços e abordagens, será adicionado aqui em breve.</p>
                <Link href="/about/infoproducts">
                  <Button variant="outline">Voltar para Infoprodutos</Button>
                </Link>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
