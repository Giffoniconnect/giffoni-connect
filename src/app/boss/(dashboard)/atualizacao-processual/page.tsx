
'use client';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
    DialogTrigger,
  } from '@/components/ui/dialog';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Search, Loader2, FileUp, Calendar as CalendarIcon, ArrowLeft } from 'lucide-react';
import { cases, type Case } from '@/lib/data'; // Using mock data for now
import { useRouter } from 'next/navigation';

const andamentoTypes = [
    'Despacho',
    'Juntada de Petição',
    'Ato Ordinatório',
    'Conclusão',
    'Audiência',
    'Sentença',
    'Recurso',
    'Trânsito em Julgado',
    'Outro'
];


export default function AtualizacaoProcessualPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Case[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [andamentoDate, setAndamentoDate] = useState<Date | undefined>();
  const [andamentoType, setAndamentoType] = useState<string>('');
  const [customAndamentoType, setCustomAndamentoType] = useState('');

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setHasSearched(true);
      return;
    }
    setIsLoading(true);
    // Simulate API search
    setTimeout(() => {
      const lowercasedFilter = searchTerm.toLowerCase();
      const filteredData = cases.filter(
        (c) =>
          c.clientName.toLowerCase().includes(lowercasedFilter) ||
          c.opposingParty.toLowerCase().includes(lowercasedFilter) ||
          c.caseNumber.toLowerCase().includes(lowercasedFilter) ||
          (c.id && c.id.toLowerCase().includes(lowercasedFilter)) // Assuming client ID or CPF/CNPJ might be in 'id'
      );
      setSearchResults(filteredData);
      setHasSearched(true);
      setIsLoading(false);
    }, 1000);
  };
  
  const handleOpenDialog = (caseItem: Case) => {
    setSelectedCase(caseItem);
    setAndamentoDate(undefined);
    setAndamentoType('');
    setCustomAndamentoType('');
  }

  const formatWeekdayName = (day: Date) => {
    return format(day, 'EEEEEE', { locale: ptBR }).toUpperCase();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">
            Atualização Processual
            </h1>
            <p className="text-muted-foreground">
            Busque por um processo para adicionar uma nova movimentação.
            </p>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Buscar Processo</CardTitle>
          <CardDescription>
            Use o nome do cliente, parte adversa, nº do processo ou CPF/CNPJ.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Digite para buscar..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Search className="mr-2 h-4 w-4" />
              )}
              Buscar
            </Button>
          </div>
        </CardContent>
      </Card>

      {hasSearched && (
        <Card>
          <CardHeader>
            <CardTitle>Resultados da Busca</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nº do Processo</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Parte Adversa</TableHead>
                    <TableHead className="text-right">Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                      </TableCell>
                    </TableRow>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((caseItem) => (
                      <TableRow key={caseItem.id}>
                        <TableCell className="font-mono">
                          {caseItem.caseNumber}
                        </TableCell>
                        <TableCell>{caseItem.clientName}</TableCell>
                        <TableCell>{caseItem.opposingParty}</TableCell>
                        <TableCell className="text-right">
                            <Dialog onOpenChange={() => handleOpenDialog(caseItem)}>
                                <DialogTrigger asChild>
                                    <Button variant="outline">
                                        <FileUp className="mr-2 h-4 w-4" />
                                        Lançar Andamento
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-xl">
                                    <DialogHeader>
                                        <DialogTitle>Lançar Andamento Processual</DialogTitle>
                                        <DialogDescription>
                                        Registre uma nova movimentação para o processo {selectedCase?.caseNumber}.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-6 py-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="andamento-tipo">Tipo de Andamento</Label>
                                                <Select value={andamentoType} onValueChange={setAndamentoType}>
                                                    <SelectTrigger id="andamento-tipo">
                                                        <SelectValue placeholder="Selecione o tipo..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {andamentoTypes.map(type => (
                                                            <SelectItem key={type} value={type}>{type}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="andamento-data">Data do Andamento</Label>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            id="andamento-data"
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full justify-start text-left font-normal",
                                                                !andamentoDate && "text-muted-foreground"
                                                            )}
                                                            >
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {andamentoDate ? format(andamentoDate, "PPP", { locale: ptBR }) : <span>Escolha a data</span>}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0">
                                                        <Calendar
                                                            mode="single"
                                                            selected={andamentoDate}
                                                            onSelect={setAndamentoDate}
                                                            initialFocus
                                                            locale={ptBR}
                                                            formatters={{ formatWeekdayName }}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                        </div>
                                        {andamentoType === 'Outro' && (
                                            <div className="space-y-2">
                                                <Label htmlFor="andamento-custom-type">Especifique o tipo de andamento</Label>
                                                <Input 
                                                    id="andamento-custom-type" 
                                                    value={customAndamentoType}
                                                    onChange={(e) => setCustomAndamentoType(e.target.value)}
                                                    placeholder="Digite o tipo personalizado..." 
                                                />
                                            </div>
                                        )}
                                        <div className="space-y-2">
                                            <Label htmlFor="andamento-descricao">O que isso significa? (Descrição para o Cliente)</Label>
                                            <Textarea id="andamento-descricao" placeholder="Escreva uma explicação simples e clara sobre o que esta movimentação significa para o cliente..." className="min-h-[120px]" />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild><Button type="button" variant="outline">Cancelar</Button></DialogClose>
                                        <DialogClose asChild><Button type="button">Salvar Andamento</Button></DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        Nenhum processo encontrado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
