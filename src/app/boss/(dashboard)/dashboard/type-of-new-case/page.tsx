'use client';

import { Suspense } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FileSignature, FolderPlus } from 'lucide-react';

function TypeOfNewCaseContent() {
    const searchParams = useSearchParams();
    const clientId = searchParams.get('clientId');

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Qual o Tipo de Caso que você deseja cadastrar?</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <FileSignature className="h-6 w-6 text-primary" />
                            Cadastrar novo processo
                        </CardTitle>
                        <CardDescription>
                            Para processos judiciais que terão um número, vara e comarca associados.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {clientId ? (
                            <Link href={`/boss/clients/${clientId}/new-process`}>
                                <Button className="w-full">
                                    Adicionar novo processo
                                </Button>
                            </Link>
                        ) : (
                            <Button className="w-full" disabled>
                                ID do Cliente não encontrado
                            </Button>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <FolderPlus className="h-6 w-6 text-primary" />
                            Adicionar novo caso
                        </CardTitle>
                        <CardDescription>
                            Para requerimentos administrativos, extrajudiciais e outras demandas que não são processos judiciais.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {clientId ? (
                             <Link href={`/boss/new-administrative-case?clientId=${clientId}`}>
                                <Button className="w-full">
                                    Adicionar novo caso
                                </Button>
                            </Link>
                        ) : (
                            <Button className="w-full" disabled>
                                ID do Cliente não encontrado
                            </Button>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default function TypeOfNewCasePage() {
    return (
        <Suspense fallback={null}>
            <TypeOfNewCaseContent />
        </Suspense>
    );
}
