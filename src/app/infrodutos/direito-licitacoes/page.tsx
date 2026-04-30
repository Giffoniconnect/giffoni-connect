import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileCheck2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DireitoLicitacoesPage() {
  return (
    <div className="container py-8">
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight">Direito Administrativo das Licitações</h1>
                <p className="text-muted-foreground">
                    Assessoria completa em processos licitatórios e contratos públicos.
                </p>
            </div>
            <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileCheck2 className="h-6 w-6" />
                    Detalhes da Área
                </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                <p>O conteúdo detalhado sobre Direito das Licitações, incluindo nossos serviços e abordagens, será adicionado aqui em breve.</p>
                <Link href="/about/infoproducts">
                  <Button variant="outline">Voltar para Infoprodutos</Button>
                </Link>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
