'use client';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, ShieldCheck, History, CreditCard, KeyRound, Puzzle, Network, BrainCircuit, DatabaseBackup, Upload, Workflow, ClipboardList, Gauge, Database, ToggleRight, Bug } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const developerTools = [
    { title: "Regras de Cybersegurança", href: "/boss/security-rules", icon: ShieldCheck, description: "Repositório vivo de regras de segurança e acesso do sistema." },
    { title: "Logs de Acesso", href: "/boss/access-logs-hub", icon: History, description: "Consulte o histórico de login de clientes e parceiros." },
    { title: "Controle de Billing", href: "/boss/billing", icon: CreditCard, description: "Monitore o uso de recursos do Firebase (Blaze Plan)." },
    { title: "Gerenciador de Chaves de API", href: "/boss/api-keys", icon: KeyRound, description: "Banco de dados central para as chaves de API do ecossistema." },
    { title: "Integrações do Ecossistema", href: "/boss/integrations", icon: Puzzle, description: "Visão geral das ferramentas e serviços conectados." },
    { title: "Base de Webhooks", href: "/boss/webhooks", icon: Network, description: "Mapa de automações que conectam o sistema." },
    { title: "Hub de Agentes de IA", href: "/boss/ai-integration", icon: BrainCircuit, description: "Painel para gerenciar agentes de IA e automações avançadas." },
    { title: "Snapshot Evolutivo de Projetos", href: "/boss/snapshot", icon: DatabaseBackup, description: "Gere um snapshot completo do estado atual do sistema." },
    { title: "Mapas de Updates", href: "/boss/updates", icon: Upload, description: "Visualize o mapa do sistema, estrutura e evolução." },
    { title: "WorkFlow do Sistema", href: "/boss/workflow", icon: Workflow, description: "Mapa visual do fluxo de informações e interações." },
    { title: "PODC do Sistema", href: "/boss/podc", icon: ClipboardList, description: "Gestão de Planejamento, Organização, Desenvolvimento e Controle." },
    { title: "Capacidade do Sistema", href: "/boss/capacity", icon: Gauge, description: "Monitore o uso de armazenamento dos bancos de dados." },
    { title: "Banco de Dados (Firestore)", href: "/boss/database", icon: Database, description: "Consulte e exporte os dados das coleções principais." },
    { title: "Habilitar/Desabilitar funções", href: "/boss/feature-flags", icon: ToggleRight, description: "Painel para ativar e desativar funcionalidades críticas." },
    { title: "Painel de Debug", href: "/boss/debug", icon: Bug, description: "Ferramentas para identificação e depuração de erros." },
];

export default function DeveloperHubPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => router.push('/boss/workspace')}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Ferramentas do Desenvolvedor</h1>
                    <p className="text-muted-foreground">
                        Painel de acesso às ferramentas de baixo nível, depuração e controle do sistema.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {developerTools.map((tool) => (
                    <Card key={tool.title} className="flex flex-col justify-between hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <tool.icon className="h-6 w-6 text-primary" />
                                {tool.title}
                            </CardTitle>
                            <CardDescription>{tool.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href={tool.href}>
                                <Button className="w-full">
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
