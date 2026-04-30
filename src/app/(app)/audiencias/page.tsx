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
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { GoogleMeetIcon, MicrosoftTeamsIcon, ZoomIcon, CiscoWebexIcon } from "@/components/meeting-icons";
import { Button } from "@/components/ui/button";
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collectionGroup, query, where } from "firebase/firestore";
import { Loader2 } from "lucide-react";
import type { Audiencia } from "@/lib/data";

const getAudienceTypeVariant = (type: string): "default" | "secondary" | "outline" => {
    switch (type.toLowerCase()) {
      case 'conciliação': return 'default';
      case 'instrução e julgamento': return 'secondary';
      case 'una': return 'outline';
      default: return 'default';
    }
};

const LocationCell = ({ location, modality }: { location: string, modality: 'Presencial' | 'Virtual' | 'Híbrida' }) => {
    if (modality === 'Virtual' || modality === 'Híbrida') {
        const lowerCaseLocation = location.toLowerCase();
        
        if (lowerCaseLocation.includes('meet.google.com')) {
            return (
                <Button variant="outline" size="sm" asChild>
                    <a href={location} target="_blank" rel="noopener noreferrer">
                        <GoogleMeetIcon className="mr-2" />
                        Acessar Google Meet
                    </a>
                </Button>
            );
        }
        if (lowerCaseLocation.includes('teams.microsoft.com')) {
            return (
                <Button variant="outline" size="sm" asChild>
                    <a href={location} target="_blank" rel="noopener noreferrer">
                        <MicrosoftTeamsIcon className="mr-2" />
                        Acessar Teams
                    </a>
                </Button>
            );
        }
        if (lowerCaseLocation.includes('zoom.us')) {
            return (
                <Button variant="outline" size="sm" asChild>
                    <a href={location} target="_blank" rel="noopener noreferrer">
                        <ZoomIcon className="mr-2" />
                        Acessar Zoom
                    </a>
                </Button>
            );
        }
        if (lowerCaseLocation.includes('webex.com')) {
            return (
                <Button variant="outline" size="sm" asChild>
                    <a href={location} target="_blank" rel="noopener noreferrer">
                        <CiscoWebexIcon className="mr-2" />
                        Acessar Webex
                    </a>
                </Button>
            );
        }
      return (
        <Button variant="outline" size="sm" asChild>
            <a href={location} target="_blank" rel="noopener noreferrer">Acessar Link da Audiência</a>
        </Button>
      );
    }
    return <span className="font-mono text-xs">{location}</span>;
};

const getModalityVariant = (modality: string): "default" | "secondary" | "outline" => {
    switch (modality.toLowerCase()) {
      case 'presencial': return 'default';
      case 'virtual': return 'secondary';
      case 'híbrida': return 'outline';
      default: return 'secondary';
    }
};


export default function AudienciasPage() {
    const { user } = useUser();
    const firestore = useFirestore();

    const hearingsQuery = useMemoFirebase(() => 
        user && firestore ? query(collectionGroup(firestore, 'hearings'), where('clientId', '==', user.uid)) : null
    , [user, firestore]);

    const { data: audiencias, isLoading } = useCollection<Audiencia>(hearingsQuery);
    
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Audiências</h1>
                <p className="text-muted-foreground">
                    Consulte as datas, horários e detalhes de todas as suas audiências marcadas.
                </p>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Agenda de Audiências</CardTitle>
                    <CardDescription>
                        Esta tabela centraliza as informações essenciais sobre suas próximas audiências.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-lg overflow-hidden">
                        {isLoading ? (
                             <div className="flex items-center justify-center h-48 text-center">
                                <Loader2 className="h-6 w-6 animate-spin" />
                            </div>
                        ) : audiencias && audiencias.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nº do Processo</TableHead>
                                        <TableHead>Vara e Comarca</TableHead>
                                        <TableHead>Tipo de Audiência</TableHead>
                                        <TableHead className="font-bold text-foreground">Data</TableHead>
                                        <TableHead className="font-bold text-foreground">Horário</TableHead>
                                        <TableHead className="font-bold text-foreground">Local/Link</TableHead>
                                        <TableHead className="font-bold text-foreground">Modalidade</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                {audiencias.map(aud => (
                                    <TableRow key={aud.id}>
                                        <TableCell className="font-mono">{aud.caseNumber}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span>{aud.court}</span>
                                                <span className="text-xs text-muted-foreground">{aud.district}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={getAudienceTypeVariant(aud.type)}>{aud.type}</Badge>
                                        </TableCell>
                                        <TableCell className="font-bold text-lg">{new Date(aud.date).toLocaleDateString('pt-BR')}</TableCell>
                                        <TableCell className="font-bold text-lg">{aud.time}</TableCell>
                                        <TableCell>
                                            <LocationCell location={aud.location} modality={aud.modality} />
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={getModalityVariant(aud.modality)}>{aud.modality}</Badge>
                                        </TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                             <div className="flex items-center justify-center h-48 text-center">
                                <p className="text-muted-foreground">Nenhuma audiência marcada no momento.</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
