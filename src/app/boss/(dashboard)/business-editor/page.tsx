'use client';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Workflow, ClipboardCheck, Network, Puzzle, CheckSquare, BarChart3, Calendar, Package, User, FileText, Clock, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const editorItems = [
    {
        title: "Funil de Atendimento (CEDRP)",
        description: "Gerencie o fluxo de entrada e qualificação de novos clientes de consultoria.",
        href: "/boss/funil-cedrp",
        icon: Workflow,
    },
    {
        title: "Diagnóstico",
        description: "Gerencie os quizzes de diagnóstico e analise os resultados dos clientes.",
        href: "/business/diagnostico",
        icon: ClipboardCheck,
        disabled: true,
    },
    {
        title: "Plano de Trabalho",
        description: "Estruture as fases e microsoluções para os planos de consultoria.",
        href: "/business/plano-de-trabalho",
        icon: Network,
        disabled: true,
    },
    {
        title: "Microsoluções",
        description: "Crie e gerencie as microsoluções que compõem os planos de trabalho.",
        href: "/business/microsolucoes",
        icon: Puzzle,
        disabled: true,
    },
    {
        title: "Tarefas",
        description: "Atribua e acompanhe as tarefas para a equipe e para os clientes.",
        href: "/business/tarefas",
        icon: CheckSquare,
        disabled: true,
    },
    {
        title: "Relatórios",
        description: "Adicione e gerencie os relatórios de progresso da consultoria.",
        href: "/boss/business-reports",
        icon: BarChart3,
    },
    {
        title: "Reuniões",
        description: "Agende e gerencie as reuniões com os clientes de consultoria.",
        href: "/business/reunioes",
        icon: Calendar,
        disabled: true,
    },
    {
        title: "Entregáveis",
        description: "Gerencie os documentos e materiais entregues aos clientes.",
        href: "/business/entregaveis",
        icon: Package,
        disabled: true,
    },
    {
        title: "Dados Cadastrais",
        description: "Consulte e edite as informações dos clientes de consultoria.",
        href: "/business/meus-dados",
        icon: User,
        disabled: true,
    },
    {
        title: "Documentos da Consultoria",
        description: "Gerencie os documentos enviados pelos clientes.",
        href: "/business/documentos",
        icon: FileText,
        disabled: true,
    },
    {
        title: "Cronograma de Atividades",
        description: "Visualize e gerencie a linha do tempo dos projetos de consultoria.",
        href: "/business/linha-do-tempo",
        icon: Clock,
        disabled: true,
    },
    {
        title: "Financeiro",
        description: "Gerencie os contratos e pagamentos da consultoria.",
        href: "/business/financeiro",
        icon: DollarSign,
        disabled: true,
    },
];

export default function BossBusinessEditorPage() {
    const router = useRouter();

  return (
    <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => router.push('/boss/workspace')}>
                <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Editor do Portal Giffoni Business</h1>
                <p className="text-muted-foreground">
                    Selecione a funcionalidade da consultoria que você deseja gerenciar.
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
