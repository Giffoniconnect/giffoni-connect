
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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Search, Loader2, Microscope, Calendar as CalendarIcon, ArrowLeft } from 'lucide-react';
import { cases, type Case } from '@/lib/data';
import { useFirestore } from '@/firebase';
import { collection } from 'firebase/firestore';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const periciaTypes = [
    'Perícia Médica',
    'Perícia Contábil',
    'Perícia Grafotécnica',
    'Perícia de Insalubridade',
    'Perícia de Periculosidade',
    'Outro'
];

type PericiaData = {
    clientId: string;
    caseId: string;
    caseNumber: string;
    court: string;
    district: string;
    type: string;
    date: string;
    time: string;
    location: string;
    expertName: string;
}


export default function MarcarPericiaPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Case[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  
  const [periciaDate, setPericiaDate] = useState<Date | undefined>();
  const [periciaTime, setPericiaTime] = useState('');
  const [periciaType, setPericiaType] = useState<string>('');
  const [customPericiaType, setCustomPericiaType] = useState('');
  const [periciaLocation, setPericiaLocation] = useState('');
  const [periciaExpertName, setPericiaExpertName] = useState('');

  const firestore = useFirestore();
  const { toast } = useToast();

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setHasSearched(true);
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const lowercasedFilter = searchTerm.toLowerCase();
      const filteredData = cases.filter(
        (c) =>
          c.clientName.toLowerCase().includes(lowercasedFilter) ||
          c.opposingParty.toLowerCase().includes(lowercasedFilter) ||
          c.caseNumber.toLowerCase().includes(lowercasedFilter)
      );
      setSearchResults(filteredData);
      setHasSearched(true);
      setIsLoading(false);
    }, 1000);
  };

  const handleOpenDialog = (caseItem: Case) => {
    setSelectedCase(caseItem);
    setPericiaDate(undefined);
    setPericiaTime('');
    setPericiaType('');
    setCustomPericiaType('');
    setPericiaLocation('');
    setPericiaExpertName('');
  };

  const handleSchedulePericia = () => {
    const finalPericiaType = periciaType === 'Outro' ? customPericiaType : periciaType;

    if (!selectedCase || !periciaDate || !periciaTime || !finalPericiaType || !periciaLocation || !periciaExpertName) {
        toast({
            variant: 'destructive',
            title: 'Campos Incompletos',
            description: 'Por favor, preencha todos os detalhes da perícia.',
        });
        return;
    }

    const periciaData: PericiaData = {
        clientId: selectedCase.id, // Assuming client ID is in case.id which might be wrong
        caseId: selectedCase.id,
        caseNumber: selectedCase.caseNumber,
        court: selectedCase.court,
        district: selectedCase.district,
        type: finalPericiaType,
        date: periciaDate.toISOString(),
        time: periciaTime,
        location: periciaLocation,
        expertName: periciaExpertName,
    };

    const periciasRef = collection(firestore, 'clients', periciaData.clientId, 'cases', periciaData.caseId, 'expert_witnesses');
    addDocumentNonBlocking(periciasRef, periciaData);

    toast({
        title: 'Perícia Agendada!',
        description: 'A perícia foi registrada e aparecerá no portal do cliente.',
    });
  };
  
  const formatWeekdayName = (day: Date) => {
    return format(day, 'EEEEEE', { locale: ptBR }).toUpperCase();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Marcar Perícia</h1>
            <p className="text-muted-foreground">
              Busque por um processo para agendar uma nova perícia.
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
            Use o nome do cliente, parte adversa ou nº do processo.
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
                                        <Microscope className="mr-2 h-4 w-4" />
                                        Marcar Perícia
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-xl">
                                    <DialogHeader>
                                        <DialogTitle>Agendar Nova Perícia</DialogTitle>
                                        <DialogDescription>
                                            Preencha os detalhes para a perícia do processo {selectedCase?.caseNumber}.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-6 py-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Nº do Processo</Label>
                                                <Input disabled value={selectedCase?.caseNumber || ''} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Vara e Comarca</Label>
                                                <Input disabled value={`${selectedCase?.court || ''} - ${selectedCase?.district || ''}`} />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="pericia-type">Tipo de Perícia</Label>
                                            <Select value={periciaType} onValueChange={setPericiaType}>
                                                <SelectTrigger id="pericia-type">
                                                    <SelectValue placeholder="Selecione o tipo..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {periciaTypes.map(type => (
                                                        <SelectItem key={type} value={type}>{type}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        {periciaType === 'Outro' && (
                                            <div className="space-y-2">
                                                <Label htmlFor="pericia-custom-type">Especifique o tipo de perícia</Label>
                                                <Input 
                                                    id="pericia-custom-type" 
                                                    value={customPericiaType}
                                                    onChange={(e) => setCustomPericiaType(e.target.value)}
                                                    placeholder="Digite o tipo personalizado..." 
                                                />
                                            </div>
                                        )}
                                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="date">Data</Label>
                                                <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button variant={'outline'} className={cn('w-full justify-start text-left font-normal', !periciaDate && 'text-muted-foreground')}>
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {periciaDate ? format(periciaDate, 'PPP', { locale: ptBR }) : <span>Escolha a data</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                    mode="single"
                                                    selected={periciaDate}
                                                    onSelect={setPericiaDate}
                                                    initialFocus
                                                    locale={ptBR}
                                                    formatters={{ formatWeekdayName }}
                                                    />
                                                </PopoverContent>
                                                </Popover>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="time">Horário</Label>
                                                <Input id="time" type="time" value={periciaTime} onChange={e => setPericiaTime(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="location">Local da Perícia</Label>
                                            <Input id="location" placeholder="Ex: Rua do Perito, 123, Sala 10..." value={periciaLocation} onChange={e => setPericiaLocation(e.target.value)} />
                                        </div>
                                         <div className="space-y-2">
                                            <Label htmlFor="expert-name">Nome do Perito Designado</Label>
                                            <Input id="expert-name" placeholder="Ex: Dr. Nome do Perito" value={periciaExpertName} onChange={e => setPericiaExpertName(e.target.value)} />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild><Button type="button" variant="outline">Cancelar</Button></DialogClose>
                                        <DialogClose asChild><Button type="button" onClick={handleSchedulePericia}>Salvar Agendamento</Button></DialogClose>
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
