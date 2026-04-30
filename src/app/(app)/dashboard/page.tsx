'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { useUser } from "@/firebase";
import { ArrowRight, FileText, FolderOpen, MessagesSquare, Receipt, Sparkles, HelpCircle, FileQuestion, User, Calendar, Microscope, Gavel } from "lucide-react";
import Link from "next/link";

const overviewItems = [
    { 
        id: '/cases',
        icon: FileText,
        title: "Casos",
        href: "/cases",
        description: "Acompanhe o andamento de todos os seus processos judiciais e administrativos. Veja o número do processo, as partes envolvidas, o status atual e a data da última movimentação.",
        steps: [
            "Na tela <strong>'Seus Casos'</strong>, clique em <strong>'Carregar Meus Processos'</strong> para visualizar a tabela.",
            "Cada linha representa um caso e mostra informações como nome, número do processo e status.",
            "Para ver a última movimentação e entender os próximos passos, clique no botão <strong>'Ver Detalhes'</strong>.",
        ]
    },
    { 
        id: '/audiencias',
        icon: Gavel,
        title: "Audiências",
        href: "/audiencias",
        description: "Consulte as datas, horários e detalhes de todas as suas audiências marcadas, sejam elas de conciliação, instrução ou julgamento.",
        steps: [
            "Acesse esta tela para ver uma lista de todas as suas audiências agendadas.",
            "Informações importantes como <strong>data, horário, local e tipo</strong> de audiência são destacadas.",
            "Verifique a modalidade (<strong>presencial, virtual ou híbrida</strong>) para se preparar adequadamente.",
        ]
    },
    { 
        id: '/pericias',
        icon: Microscope,
        title: "Perícias",
        href: "/pericias",
        description: "Acompanhe as perícias agendadas para seus processos, com informações sobre data, local e perito designado.",
        steps: [
            "Esta seção lista todas as perícias técnicas relacionadas aos seus casos.",
            "Consulte a <strong>data, horário e local</strong> agendados para a realização da perícia.",
            "Caso precise de mais detalhes sobre o perito ou o objeto da perícia, entre em contato conosco.",
        ]
    },
    { 
        id: '/reunioes',
        icon: Calendar,
        title: "Reuniões",
        href: "/reunioes",
        description: "Visualize o histórico de reuniões e os próximos encontros agendados com nossa equipe para alinhamento estratégico.",
        steps: [
            "Aqui você encontra o cronograma de reuniões conosco.",
            "Verifique a <strong>data, horário e a pauta</strong> de cada encontro.",
            "Confirme sua presença ou solicite o reagendamento, se necessário (funcionalidade em breve).",
        ]
    },
    { 
        id: '/documents',
        icon: FolderOpen,
        title: "Documentos",
        href: "/documents",
        description: "Acesse e baixe todos os documentos importantes relacionados aos seus casos, como petições, pareceres e decisões, organizados por data e nome.",
        steps: [
            "Você encontrará uma lista de todos os documentos que nossa equipe disponibilizou para você.",
            "A tabela mostra o nome do documento, o caso a que ele pertence e a data de envio.",
            "Para baixar um documento, basta clicar no botão <strong>'Baixar'</strong>. O arquivo será salvo em seu computador.",
        ]
    },
    { 
        id: '/messages',
        icon: MessagesSquare,
        title: "Mensagens",
        href: "/messages",
        description: "Comunique-se de forma segura e direta com nossa equipe. Envie e receba mensagens, esclareça dúvidas e anexe arquivos de forma confidencial.",
        steps: [
            "Esta é sua central de comunicação segura com o escritório.",
            "Na esquerda, você verá seus contatos. A conversa com o contato selecionado aparecerá à direita.",
            "Use o campo na parte inferior para digitar e enviar novas mensagens. Você também pode anexar arquivos clicando no ícone de clipe.",
        ]
    },
    { 
        id: '/invoices',
        icon: Receipt,
        title: "Faturas",
        href: "/invoices",
        description: "Consulte o histórico de todas as suas faturas, verifique valores, datas de vencimento, status de pagamento (pago, pendente, vencido) e baixe os boletos em PDF.",
        steps: [
            "Acompanhe todas as suas faturas de honorários e serviços.",
            "A lista mostra o número da fatura, valor, vencimento e status.",
            "Para obter uma cópia em PDF, clique no botão <strong>'Baixar'</strong>.",
        ]
    },
    { 
        id: '/recommendations',
        icon: Sparkles,
        title: "Assistente IA",
        href: "/recommendations",
        description: "Utilize nossa ferramenta de Inteligência Artificial para obter recomendações de documentos ou traduza termos jurídicos complexos para uma linguagem simples e clara.",
        steps: [
            "Use nossa IA para obter ajuda com duas tarefas principais: obter recomendações de documentos ou entender termos jurídicos.",
            "Para recomendações, descreva seu caso e perfil nos campos indicados e clique em <strong>'Obter Recomendações'</strong>.",
            "Para entender um termo, vá para a tela de <strong>'Atualização do Processo'</strong> em um de seus casos e use a função <strong>'Explicar para mim'</strong>.",
        ]
    },
];

const ManualDoUsuario = () => (
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
            
            <div className="flex flex-col gap-2 mt-auto">
                <div className="flex flex-col sm:flex-row gap-2">
                    {item.title === "Casos" && (
                        <>
                            <Link href="/solicitacoes-info" className="w-full sm:w-auto">
                                <Button variant="secondary" size="sm" className="w-full">
                                    <FileQuestion className="mr-2 h-4 w-4" />
                                    Relação de Informações Solicitadas
                                </Button>
                            </Link>
                            <Link href="/solicitacoes-provas" className="w-full sm:w-auto">
                                <Button variant="secondary" size="sm" className="w-full">
                                    <FileQuestion className="mr-2 h-4 w-4" />
                                    Relação de Provas Solicitadas
                                </Button>
                            </Link>
                        </>
                    )}
                </div>

                <div className="mt-2">
                  <Link href={item.href} className="w-full sm:w-auto">
                    <Button variant="outline" size="sm" className="w-full">
                      Ir para {item.title}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                <div className="mt-2">
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
                                <DialogDescription>Siga estas etapas para usar esta seção.</DialogDescription>
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
                            <DialogClose asChild><Button type="button">Entendido</Button></DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

          </CardContent>
        </Card>
      ))}
    </div>
  );


export default function DashboardPage() {
    const { user } = useUser();
    
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Olá, {user?.displayName || 'Cliente'}!</h1>
                <p className="text-muted-foreground">Bem-vindo(a) de volta! Este é o seu guia para navegar pelas funcionalidades do nosso portal.</p>
            </div>
            <ManualDoUsuario />
        </div>
      );
}
