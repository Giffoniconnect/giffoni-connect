'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function BuscarClientePage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Buscar Cliente Existente</CardTitle>
                <CardDescription>
                    Pesquise pelo nome, CPF ou CNPJ para associar um novo caso a um cliente já cadastrado.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2">
                    <Input placeholder="Digite o nome, CPF ou CNPJ do cliente..." />
                    <Button>
                        <Search className="mr-2 h-4 w-4" />
                        Buscar
                    </Button>
                </div>
                <div className="mt-6 border-2 border-dashed rounded-lg h-48 flex items-center justify-center">
                    <p className="text-muted-foreground">Resultados da busca aparecerão aqui.</p>
                </div>
            </CardContent>
        </Card>
    );
}
