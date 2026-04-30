'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShieldCheck, FileText, Users, Handshake, BadgeHelp, Banknote, ShieldQuestion, LockKeyhole } from 'lucide-react';
import { useRouter } from 'next/navigation';

const services = [
  {
    icon: FileText,
    title: 'Formalização de Contratos',
    description: 'Transforme acordos verbais em contratos sólidos que protegem seu negócio contra inadimplência e disputas com clientes e fornecedores.',
    cta: 'Formalizar meus Contratos',
  },
  {
    icon: Users,
    title: 'Regularização de Colaboradores',
    description: 'Evite passivos trabalhistas. Estruturamos a contratação da sua equipe (CLT, PJ, autônomos) da forma correta e segura.',
    cta: 'Regularizar minha Equipe',
  },
  {
    icon: Banknote,
    title: 'Diagnóstico Fiscal e Tributário',
    description: 'Entenda suas obrigações fiscais, evite multas e encontre o regime tributário mais eficiente para sua operação atual.',
    cta: 'Analisar meus Impostos',
  },
  {
    icon: Handshake,
    title: 'Revisão e Estruturação Societária',
    description: 'Sua sociedade não está no papel? Formalizamos o acordo de sócios para proteger o patrimônio e definir as responsabilidades de cada um.',
    cta: 'Estruturar minha Sociedade',
  },
  {
    icon: BadgeHelp,
    title: 'Obtenção de Alvarás e Licenças',
    description: 'Opere com tranquilidade. Identificamos e auxiliamos na obtenção de todas as licenças necessárias para sua atividade.',
    cta: 'Obter minhas Licenças',
  },
  {
    icon: ShieldQuestion,
    title: 'Renegociação de Dívidas',
    description: 'Dívidas com fornecedores ou bancos estão travando seu crescimento? Negociamos as melhores condições para você limpar seu nome e focar no futuro.',
    cta: 'Negociar minhas Dívidas',
  },
  {
    icon: ShieldCheck,
    title: 'Proteção de Ativos',
    description: 'Sua marca, nome e criações são seus maiores ativos. Registramos sua propriedade intelectual para que ninguém possa copiá-la.',
    cta: 'Proteger minha Marca',
  },
  {
    icon: LockKeyhole,
    title: 'Adequação à LGPD',
    description: 'Proteja os dados dos seus clientes e evite multas pesadas. Adequamos seu negócio à Lei Geral de Proteção de Dados.',
    cta: 'Adequar à LGPD',
  },
];

export default function RegularizationPage() {
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
                    Regularização: Da Informalidade à Segurança Jurídica
                </h1>
                <p className="text-muted-foreground">
                    Sua empresa opera, mas a falta de estrutura formal impede seu crescimento? É hora de organizar a casa.
                </p>
            </div>
        </div>
        
        <div className="text-center bg-red-100 dark:bg-red-900/30 border-2 border-dashed border-red-400 dark:border-red-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-red-800 dark:text-red-300">
                O risco da informalidade é um sócio silencioso.
            </h2>
            <p className="mt-2 text-red-700 dark:text-red-400 max-w-3xl mx-auto">
                Operar sem a devida regularização é como construir um prédio sem fundação. A qualquer momento, um problema trabalhista, uma fiscalização ou um contrato não cumprido pode colocar tudo a perder. Vamos construir essa fundação juntos.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader className="items-center text-center">
                <service.icon className="h-10 w-10 text-primary mb-2" />
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow text-center">
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </CardContent>
              <div className="p-6 pt-0">
                <Button className="w-full">{service.cta}</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
