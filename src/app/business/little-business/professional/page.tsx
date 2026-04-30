'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  TestTube2,
  Landmark,
  Users,
  Megaphone,
  Network,
  Cog,
  Map,
  Target,
  Clock3,
  Clock6,
  Clock9,
  FlaskConical,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const competencies = [
    { href: '/business/little-business/professional/ped', icon: TestTube2, title: 'P&D', description: 'Transforme ideias em inovações que dominam o mercado. Vamos descobrir seu próximo grande diferencial competitivo?' },
    { href: '/business/little-business/professional/financas', icon: Landmark, title: 'Finanças', description: 'Assuma o controle total do seu caixa e maximize a lucratividade. Pronto para parar de apagar incêndios e começar a construir riqueza?' },
    { href: '/business/little-business/professional/rh', icon: Users, title: 'RH', description: 'Monte a equipe dos sonhos que levará sua empresa ao próximo nível. Contrate, treine e retenha os melhores talentos.' },
    { href: '/business/little-business/professional/marketing', icon: Megaphone, title: 'Marketing', description: 'Sua marca é seu maior ativo. Vamos construir uma estratégia que atrai, converte e fideliza clientes de forma irresistível.' },
    { href: '/business/little-business/professional/sig', icon: Network, title: 'SIG', description: 'Decisões baseadas em dados, não em achismos. Transforme informação em poder e saia na frente da concorrência.' },
    { href: '/business/little-business/professional/operacional', icon: Cog, title: 'Operacional', description: 'Otimize seus processos para eliminar gargalos e escalar com eficiência. Sua operação pode ser uma máquina de gerar resultados.' },
    { href: '/business/little-business/professional/tecnologia-e-inovacao', icon: FlaskConical, title: 'Tecnologia e Inovação', description: 'Automatize, inove e disrupte. A tecnologia certa pode ser o motor do seu crescimento exponencial.' },
    { href: '/business/little-business/professional/planejamento-longo-prazo', icon: Clock9, title: 'Planejamento de Longo Prazo', description: 'Onde sua empresa estará em 5 anos? Vamos desenhar o mapa do seu legado e garantir que cada passo seja na direção certa.' },
    { href: '/business/little-business/professional/planejamento-medio-prazo', icon: Clock6, title: 'Planejamento de Médio Prazo', description: 'Transforme a visão de longo prazo em metas trimestrais e anuais realistas. É aqui que a estratégia encontra a execução.' },
    { href: '/business/little-business/professional/planejamento-curto-prazo', icon: Clock3, title: 'Planejamento de Curto Prazo', description: 'Domine seu dia a dia com um planejamento que garante a execução perfeita. Cada semana, uma vitória.' },
    { href: '/business/little-business/professional/tatico', icon: Map, title: 'Tático', description: 'A ponte entre a grande estratégia e a operação diária. Vamos criar os movimentos táticos que garantem suas vitórias no mercado.' },
    { href: '/business/little-business/professional/estrategico', icon: Target, title: 'Estratégico', description: 'Defina o rumo da sua empresa com clareza e ousadia. A estratégia certa é a diferença entre sobreviver e dominar.' },
];

export default function ProfessionalizationPage() {
  const router = useRouter();

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">
                    Profissionalização da Gestão
                </h1>
                <p className="text-muted-foreground">
                    Selecione a competência empresarial que você deseja desenvolver.
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {competencies.map((comp, index) => (
            <Card key={index} className="flex flex-col text-center hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                    <comp.icon className="h-10 w-10 text-primary mb-2 mx-auto" />
                    <CardTitle>{comp.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-muted-foreground text-sm">{comp.description}</p>
                </CardContent>
                <CardFooter>
                    <Button asChild className="w-full">
                        <Link href={comp.href}>Contratar Solução</Link>
                    </Button>
                </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
