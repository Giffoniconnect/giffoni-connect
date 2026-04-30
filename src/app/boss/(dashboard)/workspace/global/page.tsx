'use client';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Home, User, Building2, Briefcase, GraduationCap, Handshake, Shield, Wrench } from 'lucide-react';
import Link from 'next/link';

const workspaceItems = [
    {
        title: "Editar o Site Institucional",
        description: "Gerencie o conteúdo do site principal, como áreas de atuação, infoprodutos e equipe.",
        href: "/boss/site-editor",
        icon: Home,
    },
    {
        title: "Editar o Portal do Cliente",
        description: "Acesse as ferramentas para gerenciar as funcionalidades do portal do cliente.",
        href: "/boss/client-editor",
        icon: User,
    },
    {
        title: "Editar o Portal Giffoni Business",
        description: "Gerencie o conteúdo e as funcionalidades do portal de consultoria de negócios.",
        href: "/boss/business-editor",
        icon: Building2,
    },
    {
        title: "Editar o Portal Giffoni Assessoria",
        description: "Gerencie o conteúdo e as funcionalidades do portal de assessoria jurídica.",
        href: "/boss/assessoria",
        icon: Briefcase,
    },
    {
        title: "Editar o Portal Giffoni School",
        description: "Gerencie cursos, módulos e alunos da plataforma de ensino.",
        href: "/boss/school",
        icon: GraduationCap,
    },
    {
        title: "Editar o Portal de Parceiros",
        description: "Gerencie os dados cadastrais e as funcionalidades dos parceiros.",
        href: "/boss/edit-partner",
        icon: Handshake,
    },
    {
        title: "Editar o Portal de Colaboradores",
        description: "Gerencie os dados cadastrais e as funcionalidades dos colaboradores.",
        href: "/boss/edit-collaborator",
        icon: Briefcase,
    },
    {
        title: "Editar o Portal BOSS",
        description: "Gerencie as funcionalidades e a estrutura do próprio painel administrativo.",
        href: "/boss/podc/controle/HUB-BOSS",
        icon: Shield,
    },
    {
        title: "Ferramentas do Desenvolvedor",
        description: "Acesse as ferramentas de baixo nível, depuração e controle do sistema.",
        href: "/boss/developer-hub",
        icon: Wrench,
    },
];

export default function GlobalWorkspacePage() {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Área de Trabalho Global</h1>
                <p className="text-muted-foreground">
                    Selecione um portal para acessar suas ferramentas de edição e gerenciamento.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workspaceItems.map((item) => (
                    <Card key={item.title} className="flex flex-col justify-between hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <item.icon className="h-6 w-6 text-primary" />
                                {item.title}
                            </CardTitle>
                            <CardDescription>{item.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href={item.href}>
                                <Button className="w-full">
                                    Acessar Editor
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
