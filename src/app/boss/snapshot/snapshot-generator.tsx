'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Download, Loader2, FileText, AlertCircle } from 'lucide-react';
import { generateProjectSnapshot } from './actions';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

export function SnapshotGenerator() {
  const [snapshot, setSnapshot] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsLoading(true);
    setSnapshot(null);
    try {
      const result = await generateProjectSnapshot();
      if (result.success) {
        setSnapshot(result.data!);
        toast({
          title: 'Snapshot Gerado!',
          description: 'O relatório do estado atual do projeto foi gerado com sucesso.',
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Erro ao Gerar Snapshot',
        description: error.message || 'Não foi possível gerar o relatório.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!snapshot) return;
    const blob = new Blob([snapshot], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const version = snapshot.match(/ID da Versão: ([\d.]+)/)?.[1] || '1.0';
    a.download = `snapshot-v${version}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
            <CardHeader>
                <CardTitle>Gerador de Snapshot</CardTitle>
                <CardDescription>
                Clique no botão abaixo para gerar um arquivo de texto (.txt) contendo
                a documentação viva e versionada do estado atual do sistema,
                registrando telas, componentes, fluxos e regras de negócio.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                <Button onClick={handleGenerate} disabled={isLoading} size="lg">
                    {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Analisando e Gerando...
                    </>
                    ) : (
                    <>
                        <FileText className="mr-2 h-5 w-5" />
                        Gerar Relatório de Snapshot (v1.0)
                    </>
                    )}
                </Button>
                {snapshot && (
                    <Button onClick={handleDownload} variant="outline" size="lg">
                        <Download className="mr-2 h-5 w-5" />
                        Baixar Arquivo .txt
                    </Button>
                )}
                <div className="flex items-start p-4 bg-muted/50 rounded-lg border border-dashed">
                    <AlertCircle className="h-5 w-5 text-muted-foreground mr-3 mt-1 flex-shrink-0" />
                    <div>
                        <h4 className="font-semibold">O que é este Snapshot?</h4>
                        <p className="text-sm text-muted-foreground">
                            Esta ferramenta cria uma documentação evolutiva e independente de tecnologia, que registra a história completa do produto, preserva decisões estratégicas e serve como um backup conceitual permanente do projeto.
                        </p>
                    </div>
                </div>
                </div>
            </CardContent>
        </Card>
      
        <Card className="lg:h-[75vh] flex flex-col">
            <CardHeader>
                <CardTitle>Visualização do Snapshot</CardTitle>
                <CardDescription>
                O conteúdo do arquivo gerado aparecerá aqui. Use o botão de download para salvá-lo.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col min-h-0">
                <ScrollArea className="flex-1 h-full rounded-md border bg-muted">
                    <pre className="text-xs whitespace-pre-wrap p-4 font-mono">
                        {isLoading ? 'Gerando snapshot...' : snapshot || 'Aguardando a geração do relatório...'}
                    </pre>
                </ScrollArea>
            </CardContent>
        </Card>
    </div>
  );
}
