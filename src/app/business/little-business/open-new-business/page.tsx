'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Handshake, FolderKanban, Users, Scale, Calculator, Landmark, ShieldCheck, Workflow } from 'lucide-react';
import { useRouter } from 'next/navigation';

const services = [
  {
    icon: Handshake,
    title: 'Acordo de Sócios',
    description: 'Defina as regras do jogo antes que ele comece. Um acordo claro é o que protege sua amizade, seu investimento e o futuro da empresa.',
    cta: 'Proteger minha Sociedade',
  },
  {
    icon: FolderKanban,
    title: 'Biblioteca de Documentos',
    description: 'Centralize a documentação vital da sua empresa. Crie um cofre digital que facilita a gestão, auditorias e a busca por investimentos.',
    cta: 'Organizar meus Documentos',
  },
  {
    icon: Users,
    title: 'Contratação de Pessoas',
    description: 'Sua equipe é seu maior ativo. Estruturamos o processo de contratação, do contrato às políticas internas, para você atrair talentos sem riscos.',
    cta: 'Montar minha Equipe',
  },
  {
    icon: Scale,
    title: 'Jurídico Essencial',
    description: 'Navegue pela complexidade legal sem medo. Cuidamos de tudo, do Contrato Social aos alvarás, para que sua empresa opere 100% em conformidade.',
    cta: 'Blindar meu Negócio',
  },
  {
    icon: Calculator,
    title: 'Contabilidade e Finanças',
    description: 'Estruture o pilar financeiro do seu negócio, da escolha do contador à implementação de sistemas, garantindo que seus números trabalhem a seu favor.',
    cta: 'Estruturar meu Financeiro',
  },
  {
    icon: Landmark,
    title: 'Regime Tributário Inteligente',
    description: 'Pagar menos impostos legalmente é estratégia. Analisamos seu modelo de negócio para enquadrá-lo no regime tributário mais vantajoso.',
    cta: 'Otimizar meus Impostos',
  },
  {
    icon: ShieldCheck,
    title: 'Registro de Marca',
    description: 'Sua marca é o coração do seu negócio. Nós a protegemos contra cópias e garantimos que seu maior ativo seja exclusivamente seu.',
    cta: 'Registrar minha Marca',
  },
  {
    icon: Workflow,
    title: 'Definição do Modelo de Negócio',
    description: 'Como sua empresa vai operar e gerar valor? Desenhamos seus processos, produtos e estratégias para garantir um caminho claro para a lucratividade.',
    cta: 'Desenhar meu Modelo',
  },
];

export default function OpenNewBusinessPage() {
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
                    Abertura de Empresa: Construindo a Fundação do seu Sucesso
                </h1>
                <p className="text-muted-foreground">
                    Transforme seu CNPJ em uma fortaleza. Estruturamos cada pilar do seu novo negócio para que ele já nasça sólido, seguro e pronto para crescer.
                </p>
            </div>
        </div>
        
        <div className="text-center bg-blue-100 dark:bg-blue-900/30 border-2 border-dashed border-blue-400 dark:border-blue-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300">
                Você tem o CNPJ. Nós temos o plano.
            </h2>
            <p className="mt-2 text-blue-700 dark:text-blue-400 max-w-3xl mx-auto">
                Abrir uma empresa vai muito além do registro. É sobre construir uma base sólida que sustentará seu crescimento por anos. Deixe-nos cuidar da estrutura para que você possa focar em fazer seu negócio decolar.
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
