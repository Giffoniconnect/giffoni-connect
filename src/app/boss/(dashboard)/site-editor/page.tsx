'use client';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brush, Library, BookMarked, Building2, Users, MessageCircle, Share2, LifeBuoy, ArrowLeft, Database } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const editorItems = [
    {
        title: "Editar Áreas de Atuação",
        description: "Gerencie as áreas de atuação exibidas na página institucional.",
        href: "/boss/site-areas-editor", 
        icon: Library,
        disabled: false,
    },
    {
        title: "Editar Conteúdo (Base de Dados)",
        description: "Acesse a base de dados do Firestore para gerenciar conteúdos dinâmicos.",
        href: "/boss/database", 
        icon: Database,
        disabled: false,
    },
    {
        title: "Editar Infoprodutos Jurídicos",
        description: "Adicione ou remova os infoprodutos listados no site.",
        href: "/boss/edit-infoproducts",
        icon: BookMarked,
        disabled: false,
    },
    {
        title: "Editar Trajetória e Valores",
        description: "Altere os textos sobre a história, missão, visão e valores do escritório.",
        href: "/boss/site-editor/edit-history",
        icon: Building2,
        disabled: false,
    },
    {
        title: "Editar Nossa Equipe",
        description: "Gerencie os membros da equipe que aparecem na página institucional.",
        href: "/boss/team", 
        icon: Users,
    },
    {
        title: "Editar 'Fale com a Giffoni'",
        description: "Ajuste as informações de contato como telefone e WhatsApp.",
        href: "#", 
        icon: MessageCircle,
        disabled: true,
    },
    {
        title: "Editar Redes Sociais",
        description: "Atualize os links para Instagram, TikTok, Facebook, etc.",
        href: "#", 
        icon: Share2,
        disabled: true,
    },
    {
        title: "Editar Suporte",
        description: "Configure as opções de suporte e acesso restrito.",
        href: "#", 
        icon: LifeBuoy,
        disabled: true,
    },
]

export default function SiteEditorPage() {
    const router = useRouter();

  return (
    <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => router.push('/boss/workspace')}>
                <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Editor do Site Institucional</h1>
                <p className="text-muted-foreground">
                    Selecione a seção do site principal que você deseja editar.
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
                                <Brush className="mr-2 h-4 w-4" />
                                Editar Seção
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
