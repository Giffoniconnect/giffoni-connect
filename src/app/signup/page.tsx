
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { useRouter } from 'next/navigation';

export default function SignupHubPage() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-muted/40 py-12">
      <Button onClick={() => router.back()} className="absolute top-4 right-4">
            Voltar
      </Button>
      <div className="mx-auto w-full max-w-md space-y-6 px-4">
        <div className="grid gap-2 text-center">
            <div className="flex justify-center">
                <Logo />
            </div>
            <h1 className="text-3xl font-bold">Cadastro de Novo Cliente</h1>
            <p className="text-balance text-muted-foreground">
                Selecione o tipo de cadastro que deseja realizar.
            </p>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Selecione o Tipo de Cliente</CardTitle>
                <CardDescription>Você será redirecionado para o formulário correspondente.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <Link href="/signup-pf">
                    <Button className="w-full">Pessoa Física</Button>
                </Link>
                <Link href="/signup-pj">
                    <Button variant="outline" className="w-full">Pessoa Jurídica</Button>
                </Link>
            </CardContent>
        </Card>
        <div className="mt-4 text-center text-sm">
            Já tem uma conta?{' '}
            <Link href="/client-login" className="underline">
              Faça login
            </Link>
          </div>
      </div>
    </div>
  );
}
