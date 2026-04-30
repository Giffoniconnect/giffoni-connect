'use client';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search, UserPlus, Trash2, Handshake } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";


const mockPartnershipCases = [
    {
        id: 'pc1',
        clientName: 'Empresa de Inovação Ltda.',
        opposingParty: 'Concorrente S.A.',
        subject: 'Disputa de Patente de Software',
        caseNumber: '001122-33.2024.8.26.0100',
        court: '2ª Vara Empresarial',
        district: 'São Paulo',
        partnerName: 'Dr. Carlos Andrade',
    },
    {
        id: 'pc2',
        clientName: 'Startup Tech ABC',
        opposingParty: 'Grande Varejista Ltda.',
        subject: 'Revisão de Contrato de Fornecimento',
        caseNumber: '009988-77.2024.8.13.0024',
        court: '15ª Vara Cível',
        district: 'Belo Horizonte',
        partnerName: 'Dra. Beatriz Costa',
    }
];

export default function EditCollaboratorPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => router.push('/boss/workspace')}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Editor do Portal do Colaborador
                    </h1>
                    <p className="text-muted-foreground">
                        Gerencie os dados cadastrais e funcionalidades relacionadas aos colaboradores.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
                <Card>
                    <CardHeader>
                        <CardTitle>Dados Cadastrais dos Colaboradores</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col sm:flex-row gap-4">
                        <Link href="/boss/collaborators">
                            <Button>
                                <Search className="mr-2 h-4 w-4" />
                                Buscar Colaborador
                            </Button>
                        </Link>
                        <Link href="/collaborator/signup">
                            <Button variant="outline">
                                <UserPlus className="mr-2 h-4 w-4" />
                                Adicionar Colaborador
                            </Button>
                        </Link>
                        <Link href="/boss/team">
                            <Button variant="destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Editar/Excluir Colaborador
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Handshake className="h-5 w-5" />
                            Relação de Casos em Parceria - Colaboradores
                        </CardTitle>
                        <CardDescription>Casos que envolvem colaboração com parceiros externos.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="border rounded-lg overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Cliente</TableHead>
                                        <TableHead>Parte Adversa</TableHead>
                                        <TableHead>Assunto</TableHead>
                                        <TableHead>Nº Processo</TableHead>
                                        <TableHead>Vara/Comarca</TableHead>
                                        <TableHead>Parceiro</TableHead>
                                        <TableHead className="text-right">Ações</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockPartnershipCases.map((caseItem) => (
                                        <TableRow key={caseItem.id}>
                                            <TableCell className="font-medium whitespace-nowrap">{caseItem.clientName}</TableCell>
                                            <TableCell className="whitespace-nowrap">{caseItem.opposingParty}</TableCell>
                                            <TableCell>{caseItem.subject}</TableCell>
                                            <TableCell className="font-mono text-xs">{caseItem.caseNumber}</TableCell>
                                            <TableCell className="whitespace-nowrap">{caseItem.court}, {caseItem.district}</TableCell>
                                            <TableCell className="whitespace-nowrap">{caseItem.partnerName}</TableCell>
                                            <TableCell className="text-right whitespace-nowrap space-x-2">
                                                <Button variant="outline" size="sm">Ver casos em Parceria</Button>
                                                <Button variant="outline" size="sm">Ver Detalhes</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}