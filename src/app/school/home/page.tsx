'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpenCheck, GraduationCap, Rocket } from 'lucide-react';
import Link from 'next/link';

const mockCourses = [
  {
    title: 'Gestão para Advogados: Do Zero ao Avançado',
    description: 'Aprenda a gerenciar seu escritório como uma empresa de alta performance.',
    href: '/school/home/0-to-advance'
  },
  {
    title: 'Marketing Jurídico Ético e Eficaz',
    description: 'Atraia os clientes certos sem ferir as normas da OAB.',
    href: '#'
  },
  {
    title: 'Controladoria Jurídica na Prática',
    description: 'Implemente um sistema de controladoria para otimizar seus processos.',
    href: '#'
  },
];

export default function SchoolHomePage() {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center text-center gap-12">
        
        {/* Seção Hero */}
        <section className="w-full max-w-4xl">
          <GraduationCap className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Bem-vindo à Giffoni School
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A plataforma de educação que transforma advogados em gestores de alta performance.
          </p>
          <div className="mt-8">
            <Link href="/school/login">
              <Button size="lg">Acessar Portal do Aluno</Button>
            </Link>
          </div>
        </section>

        {/* Seção Missão, Visão, Valores */}
        <section className="w-full grid md:grid-cols-3 gap-8 text-left">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-6 w-6 text-primary" />
                Nossa Missão
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Capacitar advogados com ferramentas de gestão e negócios para que possam construir escritórios mais eficientes, lucrativos e sustentáveis.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-primary" />
                 Nossa Visão
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Ser a principal referência em educação de negócios para o mercado jurídico, impulsionando uma nova geração de advogados-empreendedores.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpenCheck className="h-6 w-6 text-primary" />
                Nossos Objetivos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Oferecer conteúdo prático e aplicável, focado em resultados reais e na transformação da advocacia tradicional.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Seção de Cursos */}
        <section className="w-full max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">Nossos Cursos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {mockCourses.map((course) => (
              <Link href={course.href} key={course.title} className={`block h-full ${course.href === '#' ? 'pointer-events-none' : ''}`}>
                <Card className={`flex flex-col h-full hover:shadow-lg transition-shadow ${course.href === '#' ? 'bg-muted/50' : ''}`}>
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{course.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
