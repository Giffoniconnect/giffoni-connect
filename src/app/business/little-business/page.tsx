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
  FileSignature,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const solutions = [
  {
    icon: Lightbulb,
    title: 'Ideação',
    description: 'Tenho uma ideia, mas não sei por onde começar.',
    href: '/business/little-business/new-idea',
  },
  {
    icon: FileSignature,
    title: 'Abertura de Empresa',
    description: 'Quero abrir a minha empresa.',
    href: '/business/little-business/open-new-business',
  },
  {
    icon: ShieldCheck,
    title: 'Regularização',
    description: 'Já tenho 1 empresa, mas não estou regular.',
    href: '/business/little-business/regularization',
  },
  {
    icon: TrendingUp,
    title: 'Profissionalização da Gestão',
    description: 'Quero profissionalizar a minha gestão.',
    href: '/business/little-business/professional',
  },
];

export default function LittleBusinessPage() {
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
                    Soluções para Pequenos e Médios Empresários
                </h1>
                <p className="text-muted-foreground">
                    Selecione o estágio atual do seu negócio para ver as soluções que podemos oferecer.
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.map((solution, index) => (
            <Card key={index} className="flex flex-col text-center">
              <CardHeader className="items-center justify-center flex-grow">
                <div className="flex flex-col items-center gap-4">
                  <solution.icon className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="text-2xl">{solution.title}</CardTitle>
                  <CardDescription className="text-lg pt-2">{solution.description}</CardDescription>
                </div>
              </CardHeader>
              <CardFooter className="pt-4">
                <Link href={solution.href} className="w-full">
                  <Button className="w-full">Saiba Mais</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
