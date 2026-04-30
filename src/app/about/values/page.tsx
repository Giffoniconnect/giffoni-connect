import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gem } from 'lucide-react';

export default function ValuesPage() {
  return (
    <div className="container py-8">
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight">Visão e Valores</h1>
                <p className="text-muted-foreground">
                O futuro que aspiramos construir e os princípios que nos guiam.
                </p>
            </div>
            <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Gem className="h-6 w-6" />
                    Nossa Visão e Nossos Valores
                </CardTitle>
                </CardHeader>
                <CardContent>
                <p>O conteúdo sobre nossa visão e valores será adicionado aqui em breve.</p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
