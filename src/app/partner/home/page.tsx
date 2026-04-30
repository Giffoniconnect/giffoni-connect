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
  ArrowRight,
  ShieldCheck,
  DollarSign,
  Workflow,
  Target,
  Users,
  Building,
  UserCheck,
  Briefcase
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const advantages = [
    {
        icon: Target,
        title: "Vantagem Estratégica",
        description: "Fortaleça sua marca ao se associar a um escritório com sólida reputação. Juntos, acessamos novos mercados e criamos uma rede de confiança que beneficia a todos."
    },
    {
        icon: Workflow,
        title: "Vantagem Operacional",
        description: "Utilize nosso centro de serviços compartilhado para otimizar a gestão de clientes e casos. Conte com um portal exclusivo para acompanhar tudo em tempo real."
    },
    {
        icon: DollarSign,
        title: "Vantagem Financeira",
        description: "Transforme indicações em uma nova fonte de receita. Nosso modelo de honorários é transparente e todo o controle é feito através do seu portal."
    },
    {
        icon: ShieldCheck,
        title: "Vantagem Estrutural",
        description: "Acesse uma equipe jurídica multidisciplinar sem aumentar seus custos fixos. Ofereça um leque de serviços mais amplo e fortaleça sua proposta de valor."
    }
];

const targetAudience = [
    { text: "Advogados e Escritórios", icon: Briefcase },
    { text: "Contadores", icon: UserCheck },
    { text: "Consultorias", icon: Building },
    { text: "Outros Profissionais", icon: Users },
];

export default function PartnerHomePage() {
  const router = useRouter();

  return (
    <div className="bg-muted/20">
      <div className="relative container mx-auto flex flex-col items-center gap-16 py-12 md:py-20">
        
        <div className="absolute top-4 left-4">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
            </Button>
        </div>
        
        {/* Hero Section */}
        <section className="text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
            Alianças Estratégicas: Cresça Conosco
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Una sua expertise à nossa estrutura jurídica e crie um ecossistema de negócios mais forte, rentável e competitivo. O Programa de Parcerias da Giffoni Advogados foi desenhado para profissionais e empresas que buscam entregar valor excepcional aos seus clientes e construir relações de longo prazo.
          </p>
           <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/partner/signup">
                <Button size="lg" className="w-full sm:w-auto">Quero ser Parceiro <ArrowRight className="ml-2 h-5 w-5" /></Button>
              </Link>
              <Link href="/partner/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">Acessar Portal do Parceiro</Button>
              </Link>
            </div>
        </section>

        {/* Advantages Section */}
        <section className="w-full max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Vantagens de ser um Parceiro Giffoni</h2>
            <p className="mt-2 text-muted-foreground">Benefícios que vão além da indicação.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="flex items-start gap-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                    <advantage.icon className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{advantage.title}</h3>
                  <p className="mt-1 text-muted-foreground">{advantage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Target Audience Section */}
        <section className="w-full max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Para Quem é o Programa de Parceria?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetAudience.map((audience, index) => (
                <Card key={index} className="flex flex-col items-center justify-center p-6 text-center">
                    <audience.icon className="h-10 w-10 text-primary mb-4" />
                    <p className="font-semibold text-lg">{audience.text}</p>
                </Card>
            ))}
          </div>
        </section>

         {/* Final CTA */}
        <section className="w-full max-w-4xl text-center bg-card p-8 rounded-lg border">
            <h2 className="text-3xl font-bold tracking-tight text-primary">
                Pronto para Construir o Futuro Conosco?
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Vamos unir forças para oferecer soluções mais completas e criar oportunidades que, sozinhos, não alcançaríamos.
            </p>
            <div className="mt-6">
                <Link href="/partner/signup">
                    <Button size="lg">Cadastre-se como Parceiro</Button>
                </Link>
            </div>
        </section>
      </div>
    </div>
  );
}
