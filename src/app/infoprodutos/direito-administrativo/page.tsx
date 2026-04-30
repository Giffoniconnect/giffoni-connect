import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Landmark } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DireitoAdministrativoPage() {
  return (
    <div className="container py-8">
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight">Direito Administrativo</h1>
                <p className="text-muted-foreground">
                    Atuação em questões envolvendo a Administração Pública, seus atos e regulações.
                </p>
            </div>
            <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Landmark className="h-6 w-6" />
                    Detalhes da Área
                </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                <p>O conteúdo detalhado sobre Direito Administrativo, incluindo nossos serviços e abordagens, será adicionado aqui em breve.</p>
                <Link href="/about/infoproducts">
                  <Button variant="outline">Voltar para Infoprodutos</Button>
                </Link>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
