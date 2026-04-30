'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Handshake, CheckCircle, Target, Award } from 'lucide-react';
import Link from 'next/link';

export default function StrategicAlliancesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 text-center">
        <Handshake className="mx-auto h-12 w-12 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Alianças Estratégicas</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Descubra como uma parceria com a Giffoni Advogados Associados pode impulsionar seu crescimento e gerar valor mútuo.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6" />
              1. O que é uma Aliança Estratégica?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Uma aliança estratégica é uma colaboração formal entre duas ou mais empresas que concordam em unir recursos para atingir um objetivo comum. Para nós, é uma parceria de confiança onde compartilhamos oportunidades, conhecimentos e clientes, visando o sucesso de todos os envolvidos. Não se trata apenas de indicar clientes, mas de construir um ecossistema de negócios forte e confiável.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-6 w-6" />
              2. Quais são os benefícios?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <span>**Acesso a Novos Clientes:** Expanda sua base de clientes através de indicações qualificadas e confiáveis.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <span>**Aumento da Receita:** Gere uma nova fonte de receita através de comissões por indicações bem-sucedidas.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <span>**Fortalecimento da Marca:** Associe sua marca a um escritório de advocacia respeitado e com sólida reputação no mercado.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6" />
            3. Condições para uma Boa Aliança Estratégica
          </CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">
                Para que a parceria floresça, acreditamos em pilares fundamentais: transparência total nas negociações, comunicação clara e constante, um compromisso mútuo com a excelência no atendimento ao cliente, e um alinhamento de valores éticos e profissionais. Buscamos parceiros que compartilhem da nossa visão de crescimento sustentável e de longo prazo.
            </p>
        </CardContent>
      </Card>

      <Card className="bg-primary text-primary-foreground border-none">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">4. Torne-se um Parceiro</CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Você está pronto para crescer conosco e construir uma aliança de sucesso?
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
            <Link href="/partner/signup">
                <Button variant="secondary" size="lg">
                    Quero ser um Parceiro Giffoni
                </Button>
            </Link>
        </CardContent>
      </Card>
    </div>
  );
}
