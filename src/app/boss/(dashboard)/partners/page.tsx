'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Loader2 } from "lucide-react"
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useFirestore } from '@/firebase';

export type Partner = {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
}
  
export default function BossPartnersPage() {
    const firestore = useFirestore();
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [partners, setPartners] = useState<Partner[] | null>(null);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            setPartners([]);
            setHasSearched(true);
            return;
        }
        setIsSearching(true);
        setHasSearched(true);
        try {
            const lowercasedFilter = searchTerm.toLowerCase();
            const resultsMap = new Map<string, Partner>();

            const queries = [
                query(collection(firestore, 'partners'), where('name', '>=', lowercasedFilter), where('name', '<=', lowercasedFilter + '\uf8ff')),
                query(collection(firestore, 'partners'), where('company', '>=', lowercasedFilter), where('company', '<=', lowercasedFilter + '\uf8ff')),
                query(collection(firestore, 'partners'), where('email', '==', searchTerm)),
                query(collection(firestore, 'partners'), where('cpf', '==', searchTerm))
            ];

            const snapshots = await Promise.all(queries.map(q => getDocs(q)));
            
            snapshots.forEach(snapshot => {
                snapshot.forEach(doc => {
                    if (!resultsMap.has(doc.id)) {
                        resultsMap.set(doc.id, { id: doc.id, ...doc.data() } as Partner);
                    }
                });
            });

            setPartners(Array.from(resultsMap.values()));

        } catch (error) {
            console.error("Error searching partners: ", error);
            setPartners([]);
        } finally {
            setIsSearching(false);
        }
    };
    
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    }


    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Painel de Parceiros</h1>
            <p className="text-muted-foreground">Consulte e gerencie os parceiros cadastrados no sistema.</p>
        </div>
        <div className="flex items-center gap-4">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                    placeholder="Buscar por nome, empresa, e-mail ou CPF..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
            </div>
            <Button onClick={handleSearch} disabled={isSearching}>
                {isSearching ? <Loader2 className="h-4 w-4 animate-spin"/> : "Buscar"}
            </Button>
        </div>
        <div className="border rounded-lg overflow-hidden bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome do Parceiro</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isSearching ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                  </TableCell>
                </TableRow>
              ) : hasSearched && partners && partners.length > 0 ? (
                partners.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell className="font-medium">{partner.name}</TableCell>
                  <TableCell>{partner.company}</TableCell>
                  <TableCell>{partner.email}</TableCell>
                  <TableCell className="text-right">
                      <Link href={`/boss/partners/${partner.id}`}>
                        <Button variant="outline" size="sm">Ver Detalhes</Button>
                      </Link>
                  </TableCell>
                </TableRow>
              ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    {hasSearched ? "Nenhum parceiro encontrado." : "Faça uma busca para ver os parceiros."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }
