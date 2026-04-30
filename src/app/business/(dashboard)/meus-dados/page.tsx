'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function MeusDadosPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Meus Dados Cadastrais</h1>
        <p className="text-muted-foreground">
          Mantenha as informações da sua empresa e equipe sempre atualizadas.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Cadastro da Empresa</CardTitle>
          <CardDescription>
            Funcionalidade para preenchimento dos dados da empresa e sócio administrador será implementada aqui.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center rounded-lg border-2 border-dashed">
                <p className="text-muted-foreground">
                    Formulário de cadastro em construção.
                </p>
                <Link href="/signup">
                    <Button variant="link">Utilize a tela de Cadastro de Cliente por enquanto</Button>
                </Link>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
