'use client';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const integrationCards = [
    {
      title: "Integração Todoist",
      description: "Gerencie suas tarefas e subtarefas, crie automações e conecte com outros serviços.",
      href: "/integrations/todoist",
    },
    {
      title: "Google Drive",
      description: "Automações para gerenciamento de arquivos e pastas, como criação de pastas de clientes e manipulação de documentos.",
      href: "/integrations/drive",
    },
    {
      title: "Google Docs",
      description: "Crie documentos dinâmicos a partir de templates.",
      href: "/integrations/docs",
    },
    {
      title: "Google Agenda",
      description: "Gerencie eventos, crie agendamentos e automações de calendário.",
      href: "/integrations/gcal",
    },
    {
      title: "Google Meet",
      description: "Automações para videoconferências e reuniões virtuais.",
      href: "/integrations/meet",
    },
    {
      title: "Gmail",
      description: "Automatize a estrutura de emails, como follow-ups estruturados.",
      href: "/integrations/gmail",
    },
    {
      title: "ASAAS",
      description: "Integração para gestão financeira.",
      href: "/integrations/asaas",
    },
    {
      title: "NIBO",
      description: "Integração para gestão contábil.",
      href: "/integrations/nibo",
    },
    {
      title: "W.A Speed",
      description: "Automação de envio de mensagens e documentos pelo navegador via W.A Speed/Wascript. Usa o secret Wascript_API configurado e não depende da API oficial do WhatsApp.",
      href: "/integrations/wa-speed",
    },
    {
      title: "Integrações Múltiplas",
      description: "Crie gatilhos orquestrados com múltiplas finalidades, criando automações sobre as automações.",
      href: "/integrations/multiple",
    },
    {
      title: "Integrações Nativas do Website",
      description: "Aproveite a base de dados do website para torná-lo ainda mais útil e funcional para a equipe.",
      href: "/integrations/native",
    },
    {
      title: "Integrações com IA",
      description: "Uma super inteligência para executar qualquer função no sistema.",
      href: "/integrations/ai",
    },
];

export default function IntegrationsHubPage() {
    const { user, isUserLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isUserLoading && !user) {
            router.push('/');
        }
    }, [user, isUserLoading, router]);

    if (isUserLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }
    
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-start bg-background p-4 sm:p-8">
      <div className="w-full max-w-6xl">
        <header className="flex flex-col items-center text-center mb-12">
          <Logo />
          <h1 className="font-headline text-4xl font-bold mt-6 text-foreground">
            Hub de Integrações
          </h1>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl">
            Selecione um serviço para acessar seu hub de automações e integrações.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {integrationCards.map((card) => (
            <Card key={card.title} className="flex flex-col">
              <CardHeader className="flex-grow">
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={card.href}>
                    Acessar Hub
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
