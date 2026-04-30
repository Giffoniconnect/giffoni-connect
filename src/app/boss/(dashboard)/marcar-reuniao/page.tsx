
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar as CalendarIcon, Search, Loader2, CalendarPlus, ArrowLeft } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cases } from '@/lib/data';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { Case } from '@/lib/data';
import { useFirestore } from '@/firebase';
import { collection } from 'firebase/firestore';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

type MeetingData = {
    clientId: string;
    pauta: string;
    date: string;
    time: string;
    location: string;
    format: string;
    status: string;
};

export default function MarcarReuniaoPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof cases>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState('');
  const [pauta, setPauta] = useState('');
  const [formatRadio, setFormatRadio] = useState('Online');
  const [location, setLocation] = useState('');

  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();

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
    setDate(undefined);
    setTime('');
    setPauta('');
    setFormatRadio('Online');
    setLocation('');
  };

  const handleScheduleMeeting = () => {
    if (!selectedCase || !date || !time || !pauta || !location) {
        toast({
            variant: 'destructive',
            title: 'Campos Incompletos',
            description: 'Por favor, preencha todos os detalhes da reunião.',
        });
        return;
    }
    
    const meetingData: MeetingData = {
        clientId: selectedCase.id, // This assumes the case ID is the client ID. Needs review.
        pauta: pauta,
        date: date.toISOString(),
        time: time,
        location: location,
        format: formatRadio,
        status: 'Agendada'
    };

    const meetingsRef = collection(firestore, 'meetings');
    addDocumentNonBlocking(meetingsRef, meetingData);

    toast({
        title: 'Reunião Agendada!',
        description: 'A reunião foi registrada e aparecerá no portal do cliente.',
    });
  }

  const formatWeekdayName = (day: Date) => {
    return format(day, 'EEEEEE', { locale: ptBR }).toUpperCase();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Marcar Reunião</h1>
            <p className="text-muted-foreground">
            Busque por um processo ou cliente para agendar uma nova reunião.
            </p>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Buscar Cliente/Processo</CardTitle>
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
                                <CalendarPlus className="mr-2 h-4 w-4" />
                                Marcar Reunião
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-xl">
                              <DialogHeader>
                                <DialogTitle>Agendar Nova Reunião</DialogTitle>
                                <DialogDescription>
                                  Preencha os detalhes para a reunião do processo {selectedCase?.caseNumber}.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-6 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="pauta">Pauta da Reunião</Label>
                                  <Textarea id="pauta" placeholder="Ex: Alinhamento estratégico sobre o caso..." className="min-h-[100px]" value={pauta} onChange={(e) => setPauta(e.target.value)} />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="date">Data</Label>
                                       <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={'outline'}
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal",
                                                        !date && "text-muted-foreground"
                                                    )}
                                                    >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {date ? format(date, "PPP", { locale: ptBR }) : <span>Escolha a data</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    onSelect={setDate}
                                                    initialFocus
                                                    locale={ptBR}
                                                    formatters={{ formatWeekdayName }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="time">Horário</Label>
                                      <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                  <Label>Formato</Label>
                                  <RadioGroup value={formatRadio} onValueChange={(value) => setFormatRadio(value)} className="flex gap-4">
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="Online" id="online" /><Label htmlFor="online">Online</Label></div>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="Presencial" id="presencial" /><Label htmlFor="presencial">Presencial</Label></div>
                                  </RadioGroup>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="location">Local / Link da Reunião</Label>
                                  <Input id="location" placeholder="Ex: Escritório Giffoni ou https://meet.google.com/..." value={location} onChange={(e) => setLocation(e.target.value)} />
                                </div>
                              </div>
                              <DialogFooter>
                                <DialogClose asChild><Button type="button" variant="outline">Cancelar</Button></DialogClose>
                                <DialogClose asChild><Button type="button" onClick={handleScheduleMeeting}>Salvar Agendamento</Button></DialogClose>
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
