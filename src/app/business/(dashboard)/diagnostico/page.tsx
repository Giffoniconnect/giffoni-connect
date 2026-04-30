'use client';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Loader2, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data reflecting the new entities
const quiz = {
  id: 'quiz1',
  titulo: 'Diagnóstico Rápido de Estrutura Empresarial',
  perguntas: [
    {
      id: 'p1',
      texto: 'Qual é o seu regime tributário atual?',
      dimensao: 'estrutura_negocio',
      ordem: 1,
      respostas: [
        { id: 'r1a', texto: 'Simples Nacional', peso: 1 },
        { id: 'r1b', texto: 'Lucro Presumido', peso: 2 },
        { id: 'r1c', texto: 'Lucro Real', peso: 3 },
        { id: 'r1d', texto: 'Não sei', peso: 5 },
      ],
    },
    {
      id: 'p2',
      texto: 'Qual é a sua maior dor ou desafio hoje?',
      dimensao: 'dor',
      ordem: 2,
      respostas: [
        { id: 'r2a', texto: 'Fluxo de caixa apertado', peso: 5 },
        { id: 'r2b', texto: 'Baixa lucratividade', peso: 4 },
        { id: 'r2c', texto: 'Dificuldade em escalar as vendas', peso: 3 },
        { id: 'r2d', texto: 'Gestão de equipe e processos', peso: 3 },
      ],
    },
    {
      id: 'p3',
      texto: 'Qual é o seu principal objetivo para os próximos 12 meses?',
      dimensao: 'objetivo',
      ordem: 3,
      respostas: [
        { id: 'r3a', texto: 'Aumentar o faturamento em mais de 50%', peso: 1 },
        { id: 'r3b', texto: 'Melhorar a margem de lucro', peso: 2 },
        { id: 'r3c', texto: 'Organizar a operação interna', peso: 3 },
        { id: 'r3d', texto: 'Expandir para novos mercados', peso: 2 },
      ],
    },
    {
        id: 'p4',
        texto: 'Quão urgente é para você resolver esses desafios?',
        dimensao: 'urgencia',
        ordem: 4,
        respostas: [
          { id: 'r4a', texto: 'Extremamente urgente, afeta a sobrevivência do negócio.', peso: 5 },
          { id: 'r4b', texto: 'Muito urgente, está limitando nosso crescimento.', peso: 4 },
          { id: 'r4c', texto: 'Moderadamente urgente, mas podemos esperar um pouco.', peso: 2 },
          { id: 'r4d', texto: 'É importante, mas não é uma prioridade imediata.', peso: 1 },
        ],
      },
  ],
};

type RespostaSelecionada = {
    perguntaId: string;
    respostaId: string;
};

export default function DiagnosticoPage() {
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [respostas, setRespostas] = useState<RespostaSelecionada[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const totalPerguntas = quiz.perguntas.length;
  const progress = ((currentQuestionIndex + 1) / totalPerguntas) * 100;

  const handleNext = () => {
    if (!selectedAnswer) {
      toast({
        variant: 'destructive',
        title: 'Atenção',
        description: 'Por favor, selecione uma resposta para continuar.',
      });
      return;
    }
    
    setRespostas([
        ...respostas,
        { perguntaId: quiz.perguntas[currentQuestionIndex].id, respostaId: selectedAnswer }
    ]);

    setSelectedAnswer(null);

    if (currentQuestionIndex < totalPerguntas - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    setIsLoading(true);
    // Simula o processamento das respostas e geração do relatório
    setTimeout(() => {
        setIsFinished(true);
        setIsLoading(false);
        toast({
            title: 'Diagnóstico Concluído!',
            description: 'Seu relatório preliminar está pronto.',
        });
    }, 1500);
  }

  const currentQuestion = quiz.perguntas[currentQuestionIndex];

  if (isLoading) {
    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-lg text-muted-foreground">Gerando seu relatório de diagnóstico...</p>
        </div>
    )
  }

  if (isFinished) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Diagnóstico Concluído!</CardTitle>
                <CardDescription>Obrigado por suas respostas. Veja abaixo um resumo preliminar. Nossa equipe entrará em contato em breve para discutir os próximos passos.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center rounded-lg border-2 border-dashed p-8">
                    <p className="font-bold text-lg">Relatório Interativo</p>
                    <p className="text-muted-foreground mt-2">A visualização detalhada do seu diagnóstico, com nível de risco, áreas críticas e resumo narrativo, aparecerá aqui na Fase 3.</p>
                </div>
            </CardContent>
        </Card>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">{quiz.titulo}</h1>
        <p className="text-muted-foreground">
          Responda as perguntas abaixo para entendermos melhor o seu negócio.
        </p>
      </div>
      <Card className="max-w-3xl mx-auto w-full">
        <CardHeader>
           <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Pergunta {currentQuestionIndex + 1} de {totalPerguntas}</p>
                <Progress value={progress} />
           </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-lg font-semibold text-center">{currentQuestion.texto}</p>
            <RadioGroup
              value={selectedAnswer ?? ''}
              onValueChange={setSelectedAnswer}
              className="space-y-3"
            >
              {currentQuestion.respostas.map((resposta) => (
                <Label
                  key={resposta.id}
                  htmlFor={resposta.id}
                  className="flex items-center gap-4 rounded-md border p-4 cursor-pointer hover:bg-accent has-[div>div>input:checked]:bg-accent"
                >
                  <RadioGroupItem value={resposta.id} id={resposta.id} />
                  <span>{resposta.texto}</span>
                </Label>
              ))}
            </RadioGroup>
            <Button onClick={handleNext} className="w-full">
              {currentQuestionIndex < totalPerguntas - 1 ? 'Próxima Pergunta' : 'Finalizar Diagnóstico'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
