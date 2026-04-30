'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogFooter
  } from '@/components/ui/dialog';
import { useUser } from '@/firebase';
import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutDashboard, HelpCircle } from "lucide-react";
import Link from "next/link";

const overviewItems = [
    { 
        icon: LayoutDashboard,
        title: "Funcionalidade Futura",
        href: "#",
        description: "Esta é uma demonstração. Em breve, esta seção explicará como usar os 'Pedidos', 'Checklist Preventivo', 'Pareceres' e outras funcionalidades da Assessoria.",
        steps: [
            "<strong>Aguarde:</strong> Em breve esta seção será um guia completo para as funcionalidades de Assessoria Jurídica.",
            "Você aprenderá a submeter <strong>pedidos de análise</strong>, preencher <strong>checklists preventivos</strong> e acessar <strong>pareceres</strong>.",
            "O botão 'Ir para...' será habilitado assim que a funcionalidade estiver disponível.",
        ]
    },
];

export default function AssessoriaDashboardPage() {
  const { user } = useUser();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Manual do Usuário - Giffoni Assessoria</h1>
        <p className="text-muted-foreground">
          Bem-vindo(a), {user?.displayName || 'Cliente'}! Este é seu guia de funcionalidades.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {overviewItems.map((item) => (
              <Card key={item.title} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                      <item.icon className="h-6 w-6 text-primary" />
                      {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow justify-between">
                   <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                   <div className="mt-auto flex flex-col sm:flex-row gap-2">
                        <Link href={item.href} className="w-full sm:w-auto" prefetch={false}>
                            <Button variant="outline" size="sm" className="w-full" disabled>
                                Ir para {item.title}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="secondary" size="sm" className="w-full sm:w-auto">
                                    <HelpCircle className="mr-2 h-4 w-4" />
                                    Passo a passo
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2">
                                        <HelpCircle className="h-5 w-5" />
                                        Passo a passo: {item.title}
                                    </DialogTitle>
                                    <DialogDescription>
                                        Siga estas etapas para entender como usar esta seção.
                                    </DialogDescription>
                                </DialogHeader>
                                <ol className="space-y-3 text-sm text-muted-foreground">
                                    {item.steps.map((step, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <span className="font-bold text-primary">{index + 1}.</span>
                                            <span dangerouslySetInnerHTML={{ __html: step }} />
                                        </li>
                                    ))}
                                </ol>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="button">Entendido</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardContent>
              </Card>
          ))}
      </div>
    </div>
  );
}
