'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { Loader2, ArrowLeft, ArrowRight, PlusCircle } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from '@/components/ui/dialog';

const integrationCards = [
    {
      title: "Criar Tarefa via Formulário",
      description: "Acesse o laboratório para testar a criação de tarefas a partir de um formulário web.",
      href: "/dashboard",
      disabled: false,
    },
    {
      title: "Criar Subtarefa a Tarefa Principal",
      description: "Crie uma subtarefa vinculada a uma tarefa existente no Todoist.",
      href: "#",
      disabled: true,
    },
    {
      title: "Criar Tarefas em Massa para o Todoist",
      description: "Crie múltiplas tarefas no Todoist de uma só vez.",
      href: "#",
      disabled: true,
    },
    {
      title: "Criar Subtarefas em Massa para o Todoist",
      description: "Adicione várias subtarefas a uma tarefa principal existente.",
      href: "#",
      disabled: true,
    },
    {
        title: "Criar Filtro de Busca",
        description: "Crie filtros de busca baseados em projetos e tarefas no Todoist.",
        href: "#",
        disabled: true,
    }
  ];

const newIntegrationOptions = [
    "Criar Tarefa via Formulário",
    "Criar Subtarefa a Tarefa Principal",
    "Criar novas Tarefas em Massa para o Todoist",
    "Criar novas subtarefas em Massa para o Todoist",
    "Criar filtro de Busca",
    "Criar novo Card na pagina /integrations/todoist",
];


export default function TodoistIntegrationPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="text-muted-foreground">Verificando autenticação...</p>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-start bg-background p-4 sm:p-8">
      <div className="w-full max-w-4xl">
        <header className="flex w-full items-start justify-between mb-12">
          <div className="flex items-center gap-4">
            <Logo />
            <div>
              <h1 className="font-headline text-3xl font-bold text-foreground">
                Hub de Integração: Todoist
              </h1>
              <p className="text-muted-foreground">
                Selecione uma automação para configurar ou utilizar.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Button variant="outline" asChild>
                <Link href="/boss/integrations">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao Hub Principal
                </Link>
            </Button>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Criar nova integração do Todoist
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Criar nova Integração do Todoist</DialogTitle>
                        <DialogDescription>
                            Selecione uma função para criar uma nova automação ou card.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 gap-2 py-4">
                        {newIntegrationOptions.map((option) => (
                            <Button key={option} variant="outline" disabled>
                                {option}
                            </Button>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {integrationCards.map((card) => (
            <Card 
                key={card.title} 
                className={`flex flex-col justify-between ${card.disabled ? 'bg-muted/50 border-dashed' : ''}`}
            >
              <CardHeader>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                {card.disabled ? (
                  <Button className="w-full" disabled>
                    Em Breve
                  </Button>
                ) : (
                  <Button asChild className="w-full">
                    <Link href={card.href}>
                      Acessar Laboratório
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
