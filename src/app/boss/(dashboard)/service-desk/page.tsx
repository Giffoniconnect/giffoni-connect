'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, FolderSearch, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ServiceDeskPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.push('/boss/client-editor')}>
              <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Funil de Atendimento (CEDRP)</h1>
            <p className="text-muted-foreground">
              Inicie um novo atendimento. Cadastre um novo cliente ou encontre um cliente existente para associar um novo processo.
            </p>
          </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Etapa 1: Identificação do Cliente</CardTitle>
          <CardDescription>
            Inicie o atendimento cadastrando um novo cliente ou buscando um já existente na base de dados.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="flex flex-col items-center justify-center p-6 text-center">
              <UserPlus className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Novo Cliente</h3>
              <p className="text-muted-foreground mb-4">
                Inicie o cadastro de um novo cliente, seja pessoa física ou jurídica, para dar entrada no funil.
              </p>
              <Link href="/boss/funil-cedrp/novo-cliente" className="w-full">
                <Button size="lg" className="w-full">Cadastrar Novo Cliente</Button>
              </Link>
            </Card>
            <Card className="flex flex-col items-center justify-center p-6 text-center">
              <FolderSearch className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Cliente Existente</h3>
              <p className="text-muted-foreground mb-4">
                Busque por um cliente já cadastrado no sistema para adicionar um novo caso ou serviço.
              </p>
              <Link href="/boss/dashboard" className="w-full">
                <Button size="lg" variant="secondary" className="w-full">
                  Buscar Cliente Existente
                </Button>
              </Link>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
