'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Lightbulb, DollarSign, ShieldAlert, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

const services = [
  {
    icon: Lightbulb,
    title: 'Da Ideia à Realidade',
    description: 'Sua ideia é genial, mas como transformá-la em um negócio? Nós estruturamos seu conceito em um modelo de negócio claro, definindo os primeiros passos para sair do papel.',
    cta: 'Estruturar minha Ideia',
  },
  {
    icon: DollarSign,
    title: 'Análise de Investimento Inicial',
    description: 'Quanto custa tirar seu sonho do chão? Mapeamos todos os custos iniciais, desde a tecnologia até as taxas legais, para que você tenha um número, não um chute.',
    cta: 'Calcular meu Investimento',
  },
  {
    icon: ShieldAlert,
    title: 'Análise de Risco sobre a Ideia',
    description: 'Toda grande ideia tem riscos. Nós identificamos as ameaças - concorrentes, regulamentação, mercado - antes que elas se tornem problemas, protegendo seu projeto desde o início.',
    cta: 'Analisar meus Riscos',
  },
  {
    icon: Search,
    title: 'Pesquisa de Mercado e Tangibilidade',
    description: 'Sua ideia tem clientes esperando por ela? Validamos seu público-alvo e analisamos a demanda real, garantindo que você está construindo algo que as pessoas realmente querem comprar.',
    cta: 'Validar meu Mercado',
  },
];

export default function NewIdeaPage() {
  const router = useRouter();

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-12">
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">
                    Ideação: Do "Eureka!" ao Primeiro Passo
                </h1>
                <p className="text-muted-foreground">
                    Você teve aquela ideia que muda o jogo. A Giffoni Business te ajuda a não se perder no caminho.
                </p>
            </div>
        </div>
        
        <div className="text-center bg-amber-100 dark:bg-amber-900/30 border-2 border-dashed border-amber-400 dark:border-amber-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-300">
                Aquele momento de pura genialidade chegou. E agora?
            </h2>
            <p className="mt-2 text-amber-700 dark:text-amber-400 max-w-3xl mx-auto">
                Sabemos como é. A empolgação de uma grande ideia é contagiante, mas a incerteza sobre os próximos passos pode ser paralisante. Não deixe sua visão se perder em um mar de dúvidas. Estamos aqui para transformar essa energia em um plano concreto.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader className="items-center text-center">
                <service.icon className="h-10 w-10 text-primary mb-2" />
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow text-center">
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
              <div className="p-6 pt-0">
                <Button className="w-full" size="lg">{service.cta}</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
