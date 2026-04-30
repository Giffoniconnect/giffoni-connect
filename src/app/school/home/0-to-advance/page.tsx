
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Lightbulb,
  Building,
  Users,
  Shield,
  Megaphone,
  Workflow,
  Handshake,
  BarChart3,
  TrendingUp,
  BrainCircuit,
  Scaling,
  Gem,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const phases = [
  {
    title: 'Fase 1: A Fundação (Do Zero ao CNPJ)',
    description: 'Os pilares essenciais para construir um escritório que já nasce sólido e com propósito.',
    modules: [
      {
        id: 'mentalidade-empreendedora',
        icon: Lightbulb,
        title: 'Mentalidade Empreendedora: De Advogado a Dono de Negócio',
        description: 'A virada de chave fundamental para pensar e agir como um verdadeiro empresário da advocacia.',
      },
      {
        id: 'planejamento-estrategico-nicho',
        icon: Building,
        title: 'Planejamento Estratégico: Definindo seu Nicho e DNA',
        description: 'Construa a identidade do seu escritório, defina seu público-alvo e crie um plano de negócios claro e objetivo.',
      },
      {
        id: 'estruturacao-societaria',
        icon: Handshake,
        title: 'Estruturação Societária e Acordo de Sócios',
        description: 'Aprenda a escolher o melhor tipo societário e a criar um acordo de sócios que protege a todos e evita conflitos futuros.',
      },
      {
        id: 'financas-101',
        icon: BarChart3,
        title: 'Finanças 101: Custos, Precificação e Capital de Giro',
        description: 'Domine os números do seu escritório desde o primeiro dia. Saiba precificar seus serviços e gerenciar o fluxo de caixa.',
      },
    ],
  },
  {
    title: 'Fase 2: A Estruturação (Os Primeiros Anos)',
    description: 'Organize a casa, otimize processos e prepare o terreno para um crescimento sustentável.',
    modules: [
      {
        id: 'marketing-juridico',
        icon: Megaphone,
        title: 'Marketing Jurídico Ético: Atraindo os Clientes Certos',
        description: 'Descubra como construir sua autoridade e atrair clientes qualificados sem ferir as normas da OAB.',
      },
      {
        id: 'processos-internos',
        icon: Workflow,
        title: 'Processos Internos: Criando um Fluxo de Trabalho Eficiente',
        description: 'Mapeie e otimize suas rotinas, da prospecção ao pós-venda, para aumentar a produtividade e a qualidade.',
      },
      {
        id: 'gestao-de-pessoas',
        icon: Users,
        title: 'Gestão de Pessoas: Contratando e Retendo Talentos',
        description: 'Aprenda a formar uma equipe de alta performance, delegar tarefas e cultivar um ambiente de trabalho positivo.',
      },
      {
        id: 'controladoria-juridica',
        icon: Shield,
        title: 'Controladoria Jurídica: Métricas e Indicadores de Sucesso',
        description: 'Vá além do faturamento. Meça o que realmente importa para a saúde e o crescimento do seu escritório.',
      },
    ],
  },
  {
    title: 'Fase 3: A Escalada (Gestão Avançada)',
    description: 'Leve seu escritório para o próximo nível com estratégias de liderança, inovação e visão de futuro.',
    modules: [
      {
        id: 'lideranca-e-cultura',
        icon: Gem,
        title: 'Liderança e Cultura Organizacional',
        description: 'Desenvolva suas habilidades como líder e construa uma cultura forte que inspire e motive sua equipe.',
      },
      {
        id: 'tecnologia-e-inovacao',
        icon: BrainCircuit,
        title: 'Tecnologia e Inovação: Automatizando para Crescer',
        description: 'Utilize a tecnologia para automatizar tarefas, otimizar a gestão e oferecer um serviço diferenciado aos seus clientes.',
      },
      {
        id: 'planejamento-financeiro-avancado',
        icon: TrendingUp,
        title: 'Planejamento Financeiro Avançado e Expansão',
        description: 'Prepare seu escritório para grandes saltos, analisando investimentos, novas áreas de atuação e modelos de expansão.',
      },
      {
        id: 'sucessao-e-legado',
        icon: Scaling,
        title: 'Sucessão e Legado: Construindo um Escritório que Dura',
        description: 'Pense no futuro do seu escritório. Planeje a sucessão e construa um legado que transcenda sua própria atuação.',
      },
    ],
  },
];

export default function GestaoAvancadaPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Gestão para Advogados: Do Zero ao Avançado
          </h1>
          <p className="text-muted-foreground">
            Uma jornada completa pela gestão de escritórios de advocacia, desde a fundação até a alta performance.
          </p>
        </div>
      </div>
      
      <div className="space-y-12">
        {phases.map((phase) => (
          <section key={phase.title}>
            <div className="mb-8">
              <h2 className="text-2xl font-bold">{phase.title}</h2>
              <p className="text-muted-foreground">{phase.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {phase.modules.map((mod) => (
                <Card key={mod.title} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-start gap-3">
                      <mod.icon className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                      <span>{mod.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{mod.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                        <Link href={`/school/home/0-to-advance/${mod.id}`}>
                            Quero aprender já
                        </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
