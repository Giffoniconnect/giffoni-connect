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
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collectionGroup, query, where } from "firebase/firestore";
import type { Pericia } from "@/lib/data";
import { Loader2 } from "lucide-react";


export default function PericiasPage() {
    const { user } = useUser();
    const firestore = useFirestore();

    const expertWitnessQuery = useMemoFirebase(() => 
        user && firestore ? query(collectionGroup(firestore, 'expert_witnesses'), where('clientId', '==', user.uid)) : null
    , [user, firestore]);

    const { data: pericias, isLoading } = useCollection<Pericia>(expertWitnessQuery);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Perícias</h1>
                <p className="text-muted-foreground">
                    Acompanhe o agendamento de perícias técnicas para seus processos.
                </p>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Agenda de Perícias</CardTitle>
                    <CardDescription>
                        Esta tabela centraliza as informações sobre as perícias agendadas.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-lg overflow-hidden">
                        {isLoading ? (
                             <div className="flex items-center justify-center h-48 text-center">
                                <Loader2 className="h-6 w-6 animate-spin" />
                            </div>
                        ) : pericias && pericias.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nº do Processo</TableHead>
                                        <TableHead>Vara e Comarca</TableHead>
                                        <TableHead>Tipo de Perícia</TableHead>
                                        <TableHead className="font-bold text-foreground">Data</TableHead>
                                        <TableHead className="font-bold text-foreground">Horário</TableHead>
                                        <TableHead className="font-bold text-foreground">Local</TableHead>
                                        <TableHead>Perito Designado</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                {pericias.map(pericia => (
                                    <TableRow key={pericia.id}>
                                        <TableCell className="font-mono">{pericia.caseNumber}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span>{pericia.court}</span>
                                                <span className="text-xs text-muted-foreground">{pericia.district}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">{pericia.type}</Badge>
                                        </TableCell>
                                        <TableCell className="font-bold text-lg">{new Date(pericia.date).toLocaleDateString('pt-BR')}</TableCell>
                                        <TableCell className="font-bold text-lg">{pericia.time}</TableCell>
                                        <TableCell className="text-sm">{pericia.location}</TableCell>
                                        <TableCell>{pericia.expertName}</TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                             <div className="flex items-center justify-center h-48 text-center">
                                <p className="text-muted-foreground">Nenhuma perícia marcada no momento.</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
