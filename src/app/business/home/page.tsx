'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, BarChart3, Building, Lightbulb, Rocket, ShieldCheck, Target, Users, TrendingUp, Gauge, Pencil } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const services = [
    {
        icon: Target,
        title: "Apoio Estratégico ao Empreendedor",
        description: "Auxiliamos o líder na consecução de seus objetivos, oferecendo clareza para decisões que impactam o presente e o futuro do negócio."
    },
    {
        icon: BarChart3,
        title: "Análise de Ambiente Concorrencial",
        description: "Estudamos o mercado, concorrentes e riscos externos, permitindo decisões baseadas em realidade, não em improviso."
    },
    {
        icon: ShieldCheck,
        title: "Análise de Adversidades Empresariais",
        description: "Identificamos vulnerabilidades jurídicas, administrativas e operacionais, antecipando conflitos e reduzindo riscos estruturais."
    },
    {
        icon: Rocket,
        title: "Estruturação para Startups e Novos Negócios",
        description: "Criamos estratégias de staff inicial, organização jurídica e planejamento para garantir que a empresa sobreviva à fase mais delicada."
    },
    {
        icon: Lightbulb,
        title: "Tomada de Decisão Apoiada",
        description: "Pensamento proativo e análise de riscos e  dados antes da implementação da decisão."
    },
    {
        icon: Building,
        title: "Crescimento Sustentável e Controlado",
        description: "Planejamento estratégico orientado ao crescimento saudável, com controle, previsibilidade e visão de longo prazo."
    }
];

const targetAudience = [
    { text: "Startups em fase de estruturação", icon: Rocket, href: '#' },
    { text: "Pequenos e médios empresários", icon: Building, href: '/business/little-business' },
    { text: "Empreendedores em fase de expansão", icon: TrendingUp, href: '#' },
    { text: "Líderes que desejam crescer sem perder o controle", icon: ShieldCheck, href: '#' },
    { text: "Planejamento Estratégico", icon: Lightbulb, href: '#' },
    { text: "Negócios que pensam no longo prazo", icon: Gauge, href: '#' }
];

export default function BusinessHomePage() {
  const router = useRouter();

  return (
    <div className="relative flex flex-col items-center gap-16 py-8 md:py-12">
      
      {/* Back Button */}
      <div className="absolute top-4 left-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
        </Button>
      </div>
      
      {/* Admin Edit Button */}
      <div className="absolute top-4 right-4">
        <Link href="/business/login">
          <Button variant="outline" size="icon">
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Editar Portal Business</span>
          </Button>
        </Link>
      </div>
      
      {/* Hero Section */}
      <section className="text-center max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
          Giffoni Business
        </h1>
        <h2 className="mt-4 text-2xl md:text-3xl font-semibold">
          Consultoria Estratégica Jurídica para Negócios que Querem Durar
        </h2>
        <p className="mt-6 text-lg text-muted-foreground">
          Empreender é decidir todos os dias em um ambiente de incerteza. Ideias nascem fortes, mas empresas só sobrevivem quando contam com <strong>estrutura, estratégia e proteção</strong>.
        </p>
        <p className="mt-4 text-lg text-muted-foreground">
          A <strong>Giffoni Business</strong> nasce para apoiar <strong>empreendedores, startups e pequenos e médios negócios</strong> na construção de empresas sólidas, sustentáveis e preparadas para o longo prazo.
        </p>
         <div className="mt-8">
            <Link href="/business/login">
              <Button size="lg">Acessar Portal do Cliente Business <ArrowRight className="ml-2 h-5 w-5" /></Button>
            </Link>
          </div>
      </section>

      {/* Vision Section */}
      <section className="w-full max-w-4xl text-center bg-card p-8 rounded-lg border">
        <h2 className="text-3xl font-bold">Nossa Visão</h2>
        <p className="mt-4 text-muted-foreground text-lg">
          Acreditamos que grandes empresas não nascem prontas. Elas são <strong>pensadas, estruturadas e orientadas</strong> no momento certo. Toda organização passa por fases críticas: o nascimento da ideia, a sobrevivência inicial, o crescimento e a consolidação. É exatamente nesse ponto que atuamos.
        </p>
      </section>

      {/* Services Section */}
      <section className="w-full max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">O Que Fazemos</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <service.icon className="h-8 w-8 text-primary" />
                  <span className="text-xl">{service.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-justify">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Target Audience Section */}
      <section className="w-full max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Para Quem é a Giffoni Business</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Apoiamos quem está construindo hoje o que deseja sustentar amanhã.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {targetAudience.map((audience, index) => (
             <Link href={audience.href} key={index} className="block h-full">
                <Card className="flex flex-col items-center justify-center p-6 text-center hover:bg-accent/50 transition-colors h-full">
                    <audience.icon className="h-10 w-10 text-primary mb-4" />
                    <p className="font-semibold text-lg">{audience.text}</p>
                </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Differentiator Section */}
      <section className="w-full max-w-4xl bg-card p-8 rounded-lg border text-center">
          <h2 className="text-3xl font-bold">Nosso Diferencial</h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Não entregamos soluções genéricas. Oferecemos <strong>análise estratégica integrada</strong>, unindo visão empresarial, administrativa e jurídica. A diferença entre uma boa ideia e uma empresa duradoura está nas decisões tomadas no caminho.
          </p>
      </section>

       {/* Final CTA */}
      <section className="text-center max-w-4xl">
        <h2 className="text-3xl font-bold tracking-tight text-primary">
            Giffoni Business
        </h2>
        <p className="mt-2 text-2xl font-semibold">
          Pensando o futuro hoje. Construindo negócios para o amanhã.
        </p>
      </section>
    </div>
  );
}
