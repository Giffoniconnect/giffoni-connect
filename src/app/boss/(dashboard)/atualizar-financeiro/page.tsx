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
import { Search, Loader2, DollarSign } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cases } from '@/lib/data'; // Using mock data for now

export default function AtualizarFinanceiroPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof cases>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setHasSearched(true);
      return;
    }
    setIsLoading(true);
    // Simulate API search
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

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Atualizar Financeiro
        </h1>
        <p className="text-muted-foreground">
          Busque por um processo para registrar ou atualizar informações financeiras.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Buscar Processo</CardTitle>
          <CardDescription>
            Use o nome do cliente, parte adversa, nº do processo ou CPF/CNPJ.
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
                          <Button variant="outline">
                            <DollarSign className="mr-2 h-4 w-4" />
                            Atualizar Financeiro
                          </Button>
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
