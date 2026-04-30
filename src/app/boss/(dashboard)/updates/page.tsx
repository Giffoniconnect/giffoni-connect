'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Workflow, User, Handshake, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function UpdatesHubPage() {
  const portalMaps = [
    {
      title: 'Mapa de Updates do Painel Boss',
      href: '/boss/updates/system-map',
      icon: Workflow,
      description: 'Navegue pela árvore de funcionalidades completa do painel administrativo, desde telas e seções até as ações de cada botão.',
      color: 'text-primary',
    },
    {
      title: 'Mapa de Updates do Painel do Cliente',
      href: '/boss/updates/client-map',
      icon: User,
      description: 'Explore a estrutura do portal do cliente, incluindo dashboard, visualização de casos, documentos e faturas.',
      color: 'text-blue-600',
    },
    {
      title: 'Mapa de Updates do Painel do Parceiro',
      href: '/boss/updates/partner-map',
      icon: Handshake,
      description: 'Visualize todas as funcionalidades disponíveis para os parceiros, como controle financeiro e casos em parceria.',
      color: 'text-green-600',
    },
    {
      title: 'Mapa de Updates do Colaborador',
      href: '/boss/updates/collaborator-map',
      icon: Briefcase,
      description: 'Mapeamento completo da área de trabalho dos colaboradores, incluindo análises, casos delegados e finanças.',
      color: 'text-orange-600',
    }
  ];


  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Central de Atualizações e Mapas
        </h1>
        <p className="text-muted-foreground">
          Selecione um portal para visualizar seu mapa de sistema, estrutura e evolução.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portalMaps.map((map) => (
            <Link href={map.href} key={map.title}>
                <Card className="hover:shadow-md hover:border-primary transition-all cursor-pointer h-full flex flex-col">
                    <CardHeader>
                    <CardTitle className={`flex items-center gap-3 ${map.color}`}>
                        <map.icon className="h-6 w-6" />
                        {map.title}
                    </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-between">
                    <p className="text-muted-foreground text-sm">
                        {map.description}
                    </p>
                    <div className="flex justify-end mt-4">
                        <Button variant="outline" size="sm">
                        Ver Mapa
                        <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                    </CardContent>
                </Card>
            </Link>
        ))}
      </div>
    </div>
  );
}
