'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function NewAdministrativeCasePage() {
    const router = useRouter();

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Novo Caso Administrativo/Extrajudicial</h1>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Em Construção</CardTitle>
                    <CardDescription>
                        O formulário para cadastrar requerimentos administrativos, extrajudiciais e outras demandas será implementado aqui.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center h-48 border-2 border-dashed rounded-lg">
                        <p className="text-muted-foreground">Funcionalidade em desenvolvimento.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
