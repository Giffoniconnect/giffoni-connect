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
import { ArrowRight, Briefcase, PlusCircle, User, Handshake, DollarSign, HelpCircle } from "lucide-react";
import Link from "next/link";

const overviewItems = [
    { 
        icon: Handshake,
        title: "Alianças Estratégicas",
        href: "/partner/strategic-alliances",
        description: "Entenda o que é uma aliança estratégica, seus benefícios e as condições para construir uma parceria de sucesso conosco.",
        steps: ["<strong>Passo 1:</strong> Nesta seção, você aprenderá sobre o nosso <strong>modelo de parceria</strong>.", "<strong>Passo 2:</strong> Entenda os benefícios, como <strong>acesso a novos clientes</strong> e <strong>aumento de receita</strong>.", "<strong>Passo 3:</strong> Se você ainda não é parceiro, encontrará um link para se <strong>cadastrar</strong>."]
    },
    { 
        icon: Briefcase,
        title: "Casos da Parceria",
        href: "/partner/cases",
        description: "Acompanhe os casos indicados ou gerenciados em parceria, com acesso a informações relevantes sobre o andamento.",
        steps: ["<strong>Passo 1:</strong> Acesse a lista de todos os <strong>casos vinculados</strong> à sua parceria.", "<strong>Passo 2:</strong> Consulte informações básicas como <strong>nome do cliente</strong>, <strong>parte adversa</strong> e <strong>número do processo</strong>.", "<strong>Passo 3:</strong> Clique em <strong>'Ver dados do cliente'</strong> para obter mais detalhes sobre o caso."]
    },
    { 
        icon: DollarSign,
        title: "Controle Financeiro",
        href: "/partner/financials",
        description: "Consulte o histórico financeiro dos casos, veja o detalhamento de honorários, parcelas e o status dos seus repasses.",
        steps: ["<strong>Passo 1:</strong> Use a <strong>barra de busca</strong> para encontrar um registro financeiro específico.", "<strong>Passo 2:</strong> Clique em <strong>'Ver Contrato'</strong> para abrir um modal com todos os detalhes do contrato, incluindo <strong>valores</strong>, <strong>rateio</strong> e cronograma de <strong>parcelas e repasses</strong>.", "<strong>Passo 3:</strong> Acompanhe o <strong>status do seu repasse</strong> para cada parcela."]
    },
    { 
        icon: PlusCircle,
        title: "Propor Nova Parceria",
        href: "/partner/propose",
        description: "Envie os detalhes de um novo cliente ou caso potencial para nossa análise e inicie uma nova colaboração.",
        steps: ["<strong>Passo 1:</strong> Acesse o <strong>formulário</strong> para nos enviar uma nova indicação.", "<strong>Passo 2:</strong> Preencha os <strong>dados do cliente e do caso</strong> com o máximo de detalhes possível.", "<strong>Passo 3:</strong> Após o envio, nossa equipe analisará a proposta e entrará em contato."]
    },
    { 
        icon: User,
        title: "Meus Dados",
        href: "/partner/profile",
        description: "Visualize suas informações cadastrais, profissionais e bancárias registradas em nossa plataforma.",
        steps: ["<strong>Passo 1:</strong> Consulte todas as informações que você forneceu no seu <strong>cadastro</strong>.", "<strong>Passo 2:</strong> Verifique se seus <strong>dados profissionais e bancários</strong> estão corretos.", "<strong>Passo 3:</strong> Para qualquer alteração, entre em contato com nosso <strong>suporte administrativo</strong>."]
    },
    { 
        icon: HelpCircle,
        title: "Perguntas Frequentes",
        href: "/partner/faq",
        description: "Encontre respostas para as dúvidas mais comuns sobre o funcionamento do Portal de Parceiros, repasses e indicações.",
        steps: ["<strong>Passo 1:</strong> Acesse a lista de <strong>perguntas mais comuns</strong> sobre o portal.", "<strong>Passo 2:</strong> Clique em uma pergunta para <strong>expandir e ver a resposta</strong> detalhada.", "<strong>Passo 3:</strong> Se sua dúvida não estiver aqui, entre em contato com nosso <strong>suporte</strong>."]
    },
];

export default function PartnerDashboardPage() {
  const { user } = useUser();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Manual do Parceiro</h1>
        <p className="text-muted-foreground">
          Bem-vindo(a), {user?.displayName || user?.email}! Este é seu guia para o portal.
        </p>
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
