'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

export default function FunilCedrpLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // A page can define its own title and description
  const pageTitle = "Funil de Clientes (CEDRP)";
  const pageDescription = "Processo de cadastro de clientes, coleta de informações, estruturação e protocolo.";

  return (
    <div className="container mx-auto max-w-4xl font-body">
      <header className="flex justify-between items-center py-4 mb-8">
        <div className="flex items-center gap-4">
          <Logo />
          <div>
            <h1 className="text-3xl font-bold font-headline">{pageTitle}</h1>
            <p className="text-muted-foreground">{pageDescription}</p>
          </div>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}
