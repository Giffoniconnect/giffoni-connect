'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Building } from 'lucide-react';
import Link from 'next/link';

export default function NovoClientePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastro de Novo Cliente</CardTitle>
        <CardDescription>Selecione o tipo de cliente que deseja cadastrar.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="flex flex-col items-center justify-center p-6 text-center">
            <User className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Pessoa Física</h3>
            <p className="text-muted-foreground mb-4">
              Cadastro para clientes individuais (CPF).
            </p>
            <Link href="/boss/funil-cedrp/novo-cliente/pessoa-fisica" className="w-full">
              <Button size="lg" className="w-full">Cadastrar Pessoa Física</Button>
            </Link>
          </Card>
          <Card className="flex flex-col items-center justify-center p-6 text-center">
            <Building className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Pessoa Jurídica</h3>
            <p className="text-muted-foreground mb-4">
              Cadastro para empresas, associações e outras entidades (CNPJ).
            </p>
            <Link href="/boss/funil-cedrp/novo-cliente/pessoa-juridica" className="w-full">
              <Button size="lg" variant="secondary" className="w-full">
                Cadastrar Pessoa Jurídica
              </Button>
            </Link>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
