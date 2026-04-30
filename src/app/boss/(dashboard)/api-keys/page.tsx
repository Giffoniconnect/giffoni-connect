
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
import { Button } from "@/components/ui/button";
import { Copy, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const mockApiKeys = [
    {
        appName: "Firebase Project",
        keyId: "AIzaSy...Cp4",
        service: "Google Cloud / Firebase",
    },
    {
        appName: "Genkit (Google AI)",
        keyId: "AIzaSy...nE8",
        service: "Google AI Studio",
    },
    // Adicione outras chaves conforme necessário
];

export default function ApiKeysPage() {
    const [visibleKey, setVisibleKey] = useState<string | null>(null);
    const { toast } = useToast();

    const toggleVisibility = (keyId: string) => {
        if (visibleKey === keyId) {
            setVisibleKey(null);
        } else {
            setVisibleKey(keyId);
        }
    };

    const copyToClipboard = (key: string) => {
        navigator.clipboard.writeText(key);
        toast({
            title: "Chave Copiada!",
            description: "A chave de API foi copiada para a área de transferência.",
        });
    };


    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Chaves de API</h1>
                <p className="text-muted-foreground">
                    Banco de dados central para todas as chaves de API utilizadas no ecossistema.
                </p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Repositório de Chaves</CardTitle>
                    <CardDescription>
                        As chaves são mascaradas por padrão. Clique no ícone de olho para revelar.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-lg overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nome do Aplicativo/Serviço</TableHead>
                                    <TableHead>Chave de API</TableHead>
                                    <TableHead className="text-right">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockApiKeys.map((item) => (
                                    <TableRow key={item.appName}>
                                        <TableCell className="font-medium">{item.appName} <span className="text-muted-foreground text-xs">({item.service})</span></TableCell>
                                        <TableCell className="font-mono text-sm">
                                            {visibleKey === item.keyId ? item.keyId : '******************'}
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button variant="ghost" size="icon" onClick={() => toggleVisibility(item.keyId)}>
                                                {visibleKey === item.keyId ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                <span className="sr-only">Mostrar/Ocultar Chave</span>
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => copyToClipboard(item.keyId)}>
                                                <Copy className="h-4 w-4" />
                                                <span className="sr-only">Copiar Chave</span>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
