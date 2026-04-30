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
import { ArrowLeft, ArrowRight, ClipboardCheck, Network, Puzzle, CheckSquare, Calendar, Package, Clock, User, FileText, DollarSign, BarChart3, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const overviewItems = [
    { 
        icon: ClipboardCheck,
        title: "Diagnóstico",
        href: "/business/diagnostico",
        description: "Responda nosso quiz para identificarmos as principais dores e necessidades do seu negócio. É o ponto de partida da nossa consultoria.",
        steps: ["<strong>Passo 1:</strong> Acesse a seção para iniciar o quiz de diagnóstico.", "<strong>Passo 2:</strong> Responda às perguntas com atenção. Suas respostas nos ajudarão a entender seu negócio.", "<strong>Passo 3:</strong> Ao final, um relatório preliminar será gerado."]
    },
    { 
        icon: Network,
        title: "Plano de Trabalho",
        href: "/business/plano-de-trabalho",
        description: "Visualize a estrutura completa da consultoria, dividida em fases, subproblemas e as microsoluções que serão implementadas.",
        steps: ["<strong>Passo 1:</strong> Esta seção apresenta um mapa hierárquico de toda a consultoria.", "<strong>Passo 2:</strong> Navegue pelas <strong>fases</strong> para ver os <strong>subproblemas</strong> que serão abordados.", "<strong>Passo 3:</strong> Clique em cada subproblema para ver as <strong>microsoluções</strong> propostas."]
    },
    { 
        icon: Puzzle,
        title: "Microsoluções",
        href: "/business/microsolucoes",
        description: "Acompanhe o progresso de cada solução específica que estamos desenvolvendo para sua empresa. Veja o status e o impacto de cada uma.",
        steps: ["<strong>Passo 1:</strong> Visualize o progresso de cada solução em um formato gamificado.", "<strong>Passo 2:</strong> Acompanhe o status (<strong>Pendente</strong>, <strong>Em Andamento</strong>, <strong>Concluído</strong>) de cada tarefa.", "<strong>Passo 3:</strong> Veja o impacto de cada microsolução no seu negócio."]
    },
    { 
        icon: CheckSquare,
        title: "Tarefas",
        href: "/business/tarefas",
        description: "Gerencie as atividades pendentes. Veja o que precisa ser feito por você e o que está sob a responsabilidade da nossa equipe.",
        steps: ["<strong>Passo 1:</strong> Acesse os quadros de tarefas para ver as atividades.", "<strong>Passo 2:</strong> O quadro <strong>'Minhas tarefas'</strong> lista o que você precisa fazer.", "<strong>Passo 3:</strong> O quadro <strong>'Tarefas do Escritório'</strong> mostra o que nossa equipe está fazendo por você."]
    },
     { 
        icon: BarChart3,
        title: "Relatórios",
        href: "/business/relatorios",
        description: "Acesse e baixe todos os relatórios e análises produzidos pela nossa equipe durante a consultoria, consolidando o progresso e os resultados.",
        steps: ["<strong>Passo 1:</strong> Nesta tela, você encontrará uma tabela com todos os relatórios publicados.", "<strong>Passo 2:</strong> Localize o relatório desejado pela data e nome.", "<strong>Passo 3:</strong> Clique em <strong>'Baixar'</strong> para obter uma cópia do arquivo em PDF."]
    },
    { 
        icon: Calendar,
        title: "Reuniões",
        href: "/business/reunioes",
        description: "Agende novas reuniões, confirme sua presença, adicione pautas e consulte o histórico dos encontros realizados.",
        steps: ["<strong>Passo 1:</strong> Veja as próximas reuniões e o histórico das passadas.", "<strong>Passo 2:</strong> Use o botão <strong>'Agendar'</strong> para propor um novo encontro.", "<strong>Passo 3:</strong> Confirme sua presença ou adicione pautas para as próximas reuniões."]
    },
    { 
        icon: Package,
        title: "Entregáveis",
        href: "/business/entregaveis",
        description: "Acesse os documentos, planilhas e outros materiais produzidos pelo escritório e disponibilizados para você.",
        steps: ["<strong>Passo 1:</strong> Esta área funciona como um repositório de arquivos.", "<strong>Passo 2:</strong> Navegue pelas pastas para encontrar os materiais produzidos pela nossa equipe.", "<strong>Passo 3:</strong> Faça o download dos arquivos que precisar."]
    },
     { 
        icon: User,
        title: "Meus Dados Cadastrais",
        href: "/business/meus-dados",
        description: "Mantenha as informações da sua empresa, sócios e equipe sempre atualizadas para garantir uma comunicação eficiente.",
        steps: ["<strong>Passo 1:</strong> Acesse esta seção para visualizar e editar os dados da sua empresa.", "<strong>Passo 2:</strong> Para atualizar, clique no botão de <strong>edição</strong> ao lado de cada informação.", "<strong>Passo 3:</strong> É possível adicionar novos membros da equipe que participarão da consultoria."]
    },
     { 
        icon: FileText,
        title: "Documentos da Consultoria",
        href: "/business/documentos",
        description: "Envie os documentos obrigatórios e outros arquivos necessários para o andamento da consultoria de forma segura.",
        steps: ["<strong>Passo 1:</strong> Nesta tela, você verá uma lista de documentos obrigatórios.", "<strong>Passo 2:</strong> Para cada documento, cole a <strong>URL</strong> (link de compartilhamento do Google Drive, Dropbox, etc.) no campo correspondente.", "<strong>Passo 3:</strong> Clique em <strong>'Salvar Link'</strong> para nos enviar o documento."]
    },
    { 
        icon: Clock,
        title: "Cronograma de Atividades",
        href: "/business/linha-do-tempo",
        description: "Veja um histórico completo e cronológico de todos os eventos importantes da consultoria, desde o início até o momento atual.",
        steps: ["<strong>Passo 1:</strong> A linha do tempo mostra todos os eventos importantes em ordem cronológica.", "<strong>Passo 2:</strong> Use-a para ter uma visão clara do progresso e dos marcos da consultoria.", "<strong>Passo 3:</strong> Filtre os eventos por tipo para facilitar a visualização."]
    },
    { 
        icon: DollarSign,
        title: "Financeiro",
        href: "/business/financeiro",
        description: "Acesse os detalhes do seu contrato de consultoria, verifique informações de pagamento e baixe documentos financeiros.",
        steps: ["<strong>Passo 1:</strong> Consulte as informações do seu contrato de consultoria.", "<strong>Passo 2:</strong> Clique no botão <strong>'Ver Contrato'</strong> para acessar o documento completo.", "<strong>Passo 3:</strong> Futuramente, você poderá ver detalhes de faturas e pagamentos aqui."]
    },
];

export default function BusinessDashboardPage() {
  const { user } = useUser();
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Manual do Usuário - Giffoni Business</h1>
                <p className="text-muted-foreground">
                Bem-vindo(a), {user?.displayName || 'Empreendedor(a)'}! Este é seu guia de funcionalidades.
                </p>
            </div>
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
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
