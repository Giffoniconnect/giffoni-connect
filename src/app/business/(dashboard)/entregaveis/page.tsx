'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function EntregaveisPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Entregáveis e Documentos</h1>
        <p className="text-muted-foreground">
          Acesse os entregáveis do escritório e envie seus documentos.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Entregáveis e Documentos</CardTitle>
          <CardDescription>
            As seções de "Entregáveis do Escritório" e "Documentos do Cliente" serão implementadas aqui.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Em construção.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}