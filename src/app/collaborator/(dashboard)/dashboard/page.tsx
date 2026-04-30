'use client';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogFooter
  } from '@/components/ui/dialog';
import { useUser } from '@/firebase';
import { Button } from "@/components/ui/button";
import { ArrowRight, Library, Briefcase, DollarSign, Handshake, HelpCircle } from "lucide-react";
import Link from "next/link";

const overviewItems = [
    { 
        icon: Library,
        title: "Análises de Viabilidade",
        href: "/collaborator/viability-analysis",
        description: "Consulte e gerencie as análises de viabilidade de novos casos para avaliar os riscos e as chances de sucesso antes de prosseguir.",
        steps: ["<strong>Passo 1:</strong> Acesse esta seção para visualizar todas as <strong>análises de viabilidade</strong> pendentes.", "<strong>Passo 2:</strong> Analise os dados do caso proposto para dar seu parecer (<strong>viável</strong>, <strong>inviável</strong>, etc.).", "<strong>Passo 3:</strong> Submeta sua análise para que o administrador possa tomar a decisão final."]
    },
    { 
        icon: Briefcase,
        title: "Casos Delegados",
        href: "/collaborator/delegated-cases",
        description: "Acesse a lista de casos que foram atribuídos a você. Gerencie prazos, tarefas e o andamento processual.",
        steps: ["<strong>Passo 1:</strong> Esta tela lista todos os casos que estão sob sua responsabilidade.", "<strong>Passo 2:</strong> Clique em um caso para ver <strong>detalhes</strong>, <strong>documentos</strong> e <strong>tarefas</strong> associadas.", "<strong>Passo 3:</strong> Atualize o <strong>status das tarefas</strong> e registre o andamento do processo."]
    },
    { 
        icon: DollarSign,
        title: "Financeiro",
        href: "/collaborator/financial",
        description: "Consulte os registros financeiros, honorários e repasses relacionados aos casos em que você está atuando.",
        steps: ["<strong>Passo 1:</strong> Visualize o detalhamento financeiro de cada caso em que você atua.", "<strong>Passo 2:</strong> Acompanhe os valores de <strong>honorários contratados</strong> e os <strong>repasses previstos</strong>.", "<strong>Passo 3:</strong> Verifique o status dos pagamentos e as datas programadas."]
    },
    { 
        icon: Handshake,
        title: "Parcerias Internas",
        href: "/collaborator/internal-partnerships",
        description: "Visualize e gerencie as parcerias com outros colaboradores do escritório para atuação conjunta em casos complexos.",
        steps: ["<strong>Passo 1:</strong> Veja aqui os casos em que você está trabalhando em conjunto com outros colaboradores.", "<strong>Passo 2:</strong> Comunique-se com os outros membros da equipe do caso.", "<strong>Passo 3:</strong> Acompanhe a <strong>divisão de tarefas</strong> e responsabilidades na parceria."]
    },
];

export default function CollaboratorDashboardPage() {
  const { user } = useUser();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Manual do Colaborador</h1>
        <p className="text-muted-foreground">
          Bem-vindo(a), {user?.displayName || user?.email}! Este é seu guia de trabalho.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {overviewItems.map((item) => (
              <Card key={item.title} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                      <item.icon className="h-6 w-6 text-primary" />
                      {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow justify-between">
                   <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                   <div className="mt-auto flex flex-col sm:flex-row gap-2">
                        <Link href={item.href} className="w-full sm:w-auto" prefetch={false}>
                          <Button variant="outline" size="sm" className="w-full">
                              Ir para {item.title}
                              <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                       </Link>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="secondary" size="sm" className="w-full sm:w-auto">
                                    <HelpCircle className="mr-2 h-4 w-4" />
                                    Passo a passo
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2">
                                        <HelpCircle className="h-5 w-5" />
                                        Passo a passo: {item.title}
                                    </DialogTitle>
                                    <DialogDescription>
                                        Siga estas etapas para entender como usar esta seção.
                                    </DialogDescription>
                                </DialogHeader>
                                <ol className="space-y-3 text-sm text-muted-foreground">
                                    {item.steps.map((step, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <span className="font-bold text-primary">{index + 1}.</span>
                                            <span dangerouslySetInnerHTML={{ __html: step }} />
                                        </li>
                                    ))}
                                </ol>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="button">Entendido</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                   </div>
                </CardContent>
              </Card>
          ))}
      </div>
    </div>
  );
}
