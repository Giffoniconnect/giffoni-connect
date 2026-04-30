'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  ClipboardList,
  Workflow,
  Laptop,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';

export default function PodcHubPage() {
  const podcSections = [
    {
      title: '1. Planejamento',
      href: '#',
      icon: ClipboardList,
      description: 'Definição de escopo, requisitos e cronogramas. Onde as ideias tomam forma.',
      color: 'text-blue-600',
      disabled: true,
    },
    {
      title: '2. Organização',
      href: '#',
      icon: Workflow,
      description: 'Estruturação de tarefas, alocação de recursos e designação de responsabilidades.',
      color: 'text-orange-600',
      disabled: true,
    },
    {
      title: '3. Desenvolvimento',
      href: '#',
      icon: Laptop,
      description: 'A fase de codificação e implementação das funcionalidades planejadas.',
      color: 'text-green-600',
      disabled: true,
    },
    {
      title: '4. Controle',
      href: '/boss/podc/controle',
      icon: CheckCircle,
      description: 'Verificação funcional, testes de interface e garantia de qualidade do sistema.',
      color: 'text-purple-600',
      disabled: false,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          PODC - Planejamento, Organização, Desenvolvimento e Controle
        </h1>
        <p className="text-muted-foreground">
          Selecione uma etapa do ciclo de vida do projeto para visualizar ou gerenciar.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {podcSections.map((section) => (
          <Link href={section.disabled ? '#' : section.href} key={section.title} className={section.disabled ? 'pointer-events-none' : ''}>
            <Card className={`hover:shadow-md hover:border-primary transition-all ${section.disabled ? 'bg-muted/50' : ''}`}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className={`flex items-center gap-3 ${section.color}`}>
                  <section.icon className="h-6 w-6" />
                  {section.title}
                </CardTitle>
                 <Button variant="outline" size="sm" disabled={section.disabled}>
                  Acessar Seção
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  {section.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
