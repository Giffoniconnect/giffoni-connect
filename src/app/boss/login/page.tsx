'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function BossLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleEnter = () => {
    setIsLoading(true);
    // Direct navigation to the BOSS portal without authentication
    router.push('/boss/workspace');
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <div className="absolute top-4 right-4 flex gap-2">
        <Link href="/">
          <Button>Voltar</Button>
        </Link>
      </div>
      <div className="mx-auto grid w-[380px] gap-6">
        <div className="grid gap-2 text-center">
          <Logo className="mx-auto mb-4" />
          <h1 className="text-3xl font-bold">Portal BOSS</h1>
          <p className="text-balance text-muted-foreground">
            Acesso exclusivo para administradores.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Acesso Direto</CardTitle>
            <CardDescription>
              A funcionalidade de login está temporariamente desabilitada. Clique
              abaixo para entrar. A autenticação será reimplementada.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleEnter} className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Entrar no Portal BOSS'
              )}
            </Button>
          </CardContent>
        </Card>
        <div className="mt-4 text-center text-sm">
          &copy; {new Date().getFullYear()} Giffoni Advogados Associados
        </div>
      </div>
    </div>
  );
}
