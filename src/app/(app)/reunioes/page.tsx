'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { Reuniao } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { GoogleMeetIcon } from "@/components/meeting-icons";
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, where } from "firebase/firestore";
import { Loader2 } from "lucide-react";


const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'Confirmada':
      case 'Realizada':
        return 'default';
      case 'Agendada':
        return 'secondary';
       case 'Reagendar':
        return 'outline';
      case 'Cancelada':
        return 'destructive';
      default:
        return 'default';
    }
};

const LocationCell = ({ location, format }: { location: string, format: 'Online' | 'Presencial' }) => {
    if (format === 'Online') {
      if (location.includes('meet.google.com')) {
        return (
          <Button variant="outline" size="sm" asChild>
            <a href={location} target="_blank" rel="noopener noreferrer">
              <GoogleMeetIcon className="mr-2 h-4 w-4" />
              Entrar na Reunião (Meet)
            </a>
          </Button>
        );
      }
      return (
        <Button variant="outline" size="sm" asChild>
            <a href={location} target="_blank" rel="noopener noreferrer">Acessar Link</a>
        </Button>
      );
    }
    return <span className="text-sm">{location}</span>;
  };


export default function ReunioesPage() {
    const { user } = useUser();
    const firestore = useFirestore();

    const meetingsQuery = useMemoFirebase(() => 
        user && firestore ? query(collection(firestore, 'meetings'), where('clientId', '==', user.uid)) : null
    , [user, firestore]);

    const { data: reunioes, isLoading } = useCollection<Reuniao>(meetingsQuery);


    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Reuniões</h1>
                <p className="text-muted-foreground">
                    Consulte o histórico e os próximos encontros agendados com nossa equipe.
                </p>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Agenda de Reuniões</CardTitle>
                    <CardDescription>
                        Esta tabela centraliza as informações sobre suas reuniões. Clique em "Ver Detalhes" para acessar a pauta.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-lg overflow-hidden">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-48 text-center">
                                <Loader2 className="h-6 w-6 animate-spin" />
                            </div>
                        ) : reunioes && reunioes.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Pauta da Reunião</TableHead>
                                        <TableHead>Detalhes da Pauta</TableHead>
                                        <TableHead>Data</TableHead>
                                        <TableHead>Horário</TableHead>
                                        <TableHead>Local/Formato</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                {reunioes.map(reuniao => (
                                    <TableRow key={reuniao.id}>
                                        <TableCell className="font-medium max-w-sm">{reuniao.pauta}</TableCell>
                                        <TableCell>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline" size="sm">Ver Detalhes</Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Detalhes da Pauta</DialogTitle>
                                                        <DialogDescription>{reuniao.pauta}</DialogDescription>
                                                    </DialogHeader>
                                                    <div className="space-y-4">
                                                        {reuniao.pautaDetalhada?.topicos && (
                                                            <div>
                                                                <h4 className="font-semibold mb-2">Tópicos da Reunião:</h4>
                                                                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                                                    {reuniao.pautaDetalhada.topicos.map((topico, i) => <li key={i}>{topico}</li>)}
                                                                </ul>
                                                            </div>
                                                        )}
                                                        {reuniao.pautaDetalhada?.decisoes && reuniao.pautaDetalhada.decisoes.length > 0 && (
                                                             <div>
                                                                <h4 className="font-semibold mb-2 mt-4">Decisões Tomadas:</h4>
                                                                <ul className="list-disc list-inside space-y-1 text-sm">
                                                                    {reuniao.pautaDetalhada.decisoes.map((decisao, i) => <li key={i}>{decisao}</li>)}
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <DialogFooter>
                                                        <DialogClose asChild>
                                                            <Button type="button">Fechar</Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                        <TableCell className="font-semibold">{new Date(reuniao.date).toLocaleDateString('pt-BR')}</TableCell>
                                        <TableCell className="font-semibold">{reuniao.time}</TableCell>
                                        <TableCell>
                                            <LocationCell location={reuniao.location} format={reuniao.format} />
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={getStatusVariant(reuniao.status)}>{reuniao.status}</Badge>
                                        </TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                             <div className="flex items-center justify-center h-48 text-center">
                                <p className="text-muted-foreground">Nenhuma reunião marcada no momento.</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
