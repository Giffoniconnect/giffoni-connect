
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ArrowLeft, CheckCircle, CreditCard, Info } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { courseModules } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

export default function ModulePurchasePage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const moduleId = params.moduleId as string;

  const module = courseModules.find((m) => m.id === moduleId);

  if (!module) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 text-center h-full">
        <h1 className="text-2xl font-bold">Módulo não encontrado</h1>
        <Button onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      </div>
    );
  }
  
  const handlePurchase = () => {
    toast({
        title: "Processando Pagamento (Simulação)",
        description: "Em um ambiente real, você seria redirecionado para o Stripe.",
    });
  }

  return (
    <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
                <p className="text-sm text-muted-foreground">{module.phase}</p>
                <h1 className="text-3xl font-bold tracking-tight">{module.title}</h1>
            </div>
        </div>

        <div className="grid md:grid-cols-[2fr_1fr] gap-8 items-start">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>O que você vai aprender neste módulo?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-6">{module.detailedDescription}</p>
                        <ul className="space-y-3">
                            {module.learnings.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                 <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>O Arroz com Feijão que Gera Resultados</AlertTitle>
                    <AlertDescription>
                        Não prometemos fórmulas mágicas. Nossa metodologia se baseia em fazer o básico da gestão de forma consistente e bem-feita. É a disciplina nos fundamentos que constrói escritórios de advocacia que duram e prosperam.
                    </AlertDescription>
                </Alert>
            </div>
            
            <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle className="text-center">Resumo da Compra</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg border">
                        <p className="font-semibold text-sm">Você está adquirindo:</p>
                        <p className="text-muted-foreground text-sm">{module.title}</p>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Valor</span>
                        <span className="text-2xl font-bold">
                             {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            }).format(module.price)}
                        </span>
                    </div>
                </CardContent>
                <CardFooter>
                     <Button className="w-full" size="lg" onClick={handlePurchase}>
                        <CreditCard className="mr-2 h-5 w-5" />
                        Comprar com Stripe
                    </Button>
                </CardFooter>
            </Card>
        </div>
    </div>
  );
}
