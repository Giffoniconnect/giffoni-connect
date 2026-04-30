'use client';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, User, Workflow, FileSignature, FileUp, FileQuestion, MessageSquare, Calendar, Gavel, Microscope, DollarSign, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const editorItems = [
    {
        title: "LEADS Particulares em Potencial",
        description: "Gerencie e qualifique leads particulares que ainda não se tornaram clientes.",
        href: "/boss/leads/private",
        icon: Workflow,
    },
    {
        title: "Dados Cadastrais do Cliente",
        description: "Consulte e edite as informações dos clientes cadastrados.",
        href: "/boss/dashboard",
        icon: User,
    },
    {
        title: "Funil de Atendimento (CEDRP)",
        description: "Gerencie o fluxo de entrada e qualificação de novos clientes.",
        href: "/boss/service-desk",
        icon: Workflow,
    },
    {
        title: "Cadastro de Processos",
        description: "Adicione novos processos judiciais ou administrativos ao sistema.",
        href: "/boss/atualizacao-processual", // Reusing for now
        icon: FileSignature,
    },
    {
        title: "Atualização de Andamento Processual",
        description: "Lance novas movimentações e despachos nos processos.",
        href: "/boss/atualizacao-processual",
        icon: FileUp,
    },
    {
        title: "Solicitação de Provas",
        description: "Crie e gerencie as solicitações de provas para os clientes.",
        href: "/boss/solicitacoes-provas",
        icon: FileQuestion,
    },
    {
        title: "Solicitação de Informações",
        description: "Crie e gerencie as solicitações de informações para os clientes.",
        href: "/boss/solicitacoes-info",
        icon: MessageSquare,
    },
    {
        title: "Marcar Reunião",
        description: "Agende reuniões com clientes e equipe.",
        href: "/boss/marcar-reuniao",
        icon: Calendar,
    },
    {
        title: "Marcar Audiência",
        description: "Registre audiências nos processos dos clientes.",
        href: "/boss/marcar-audiencia",
        icon: Gavel,
    },
    {
        title: "Marcar Perícia",
        description: "Agende perícias e informe os detalhes aos clientes.",
        href: "/boss/marcar-pericia",
        icon: Microscope,
    },
    {
        title: "Atualizar Financeiro",
        description: "Gerencie contratos de honorários e registros financeiros.",
        href: "/boss/financial",
        icon: DollarSign,
    },
    {
        title: "Delegação de Prazos",
        description: "Designe e acompanhe os prazos para a equipe.",
        href: "#",
        icon: Clock,
        disabled: true,
    },
];

export default function ClientEditorPage() {
    const router = useRouter();

  return (
    <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => router.push('/boss/workspace')}>
                <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Editor do Portal do Cliente</h1>
                <p className="text-muted-foreground">
                    Selecione a funcionalidade que você deseja gerenciar.
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {editorItems.map((item) => (
                <Card key={item.title} className={`flex flex-col justify-between hover:shadow-lg transition-shadow ${item.disabled ? 'bg-muted/50' : ''}`}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <item.icon className="h-6 w-6 text-primary" />
                            {item.title}
                        </CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link href={item.href}>
                            <Button className="w-full" disabled={item.disabled}>
                                Acessar
                                <ArrowRight className="ml-auto h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
  );
}
