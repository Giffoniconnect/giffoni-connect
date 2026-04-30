'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getRecommendations } from './actions';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles, FileText, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  caseDetails: z
    .string()
    .min(30, 'Forneça mais detalhes sobre seu caso (pelo menos 30 caracteres).'),
  clientProfile: z
    .string()
    .min(20, 'Forneça mais detalhes sobre seu perfil (pelo menos 20 caracteres).'),
});

export function RecommendationForm() {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      caseDetails: '',
      clientProfile: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setRecommendations([]);
    const result = await getRecommendations(values);
    setIsLoading(false);

    if (result.success) {
      setRecommendations(result.data);
    } else {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: result.error,
      });
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Descreva sua Situação</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="caseDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detalhes do Caso</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ex: 'Estou abrindo uma nova empresa de tecnologia e preciso elaborar contratos de sócios e proteger minha propriedade intelectual...'"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="clientProfile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Perfil do Cliente</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ex: 'Empreendedor de primeira viagem, orçamento limitado, objetivo principal é garantir o financiamento inicial...'"
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Obter Recomendações
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recomendações da IA</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">
                Analisando suas informações...
              </p>
            </div>
          ) : recommendations.length > 0 ? (
            <div className="space-y-4">
                <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Aviso Legal</AlertTitle>
                    <AlertDescription>
                        Estas são sugestões geradas por IA e não constituem aconselhamento jurídico. Por favor, consulte seu advogado.
                    </AlertDescription>
                </Alert>
                <ul className="space-y-2">
                {recommendations.map((rec, index) => (
                  <li key={index} className="flex items-center gap-3 rounded-md border p-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="font-medium">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center rounded-lg border-2 border-dashed">
                <Sparkles className="h-8 w-8 text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">
                    Suas recomendações de documentos aparecerão aqui.
                </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
