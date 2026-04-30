
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
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Loader2 } from "lucide-react"
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';

export type Collaborator = {
  id: string;
  name: string;
  email: string;
  collaboratorType: 'Advogado' | 'Estagiário' | 'Secretaria' | 'Perito';
}
  
export default function BossCollaboratorsPage() {
    const firestore = useFirestore();
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchedCollaborators, setSearchedCollaborators] = useState<Collaborator[] | null>(null);

    const collaboratorsRef = useMemoFirebase(() => firestore ? collection(firestore, 'collaborators') : null, [firestore]);
    const { data: allCollaborators, isLoading: isLoadingAll } = useCollection<Collaborator>(collaboratorsRef);

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            setSearchedCollaborators(null);
            return;
        }
        setIsSearching(true);
        try {
            const lowercasedFilter = searchTerm.toLowerCase();
            const nameQuery = query(collection(firestore, 'collaborators'), where('name', '>=', lowercasedFilter), where('name', '<=', lowercasedFilter + '\uf8ff'));
            const emailQuery = query(collection(firestore, 'collaborators'), where('email', '==', searchTerm));
            
            const [nameSnapshot, emailSnapshot] = await Promise.all([
                getDocs(nameQuery),
                getDocs(emailQuery)
            ]);
            
            const resultsMap = new Map<string, Collaborator>();
            nameSnapshot.forEach(doc => {
                resultsMap.set(doc.id, { id: doc.id, ...doc.data() } as Collaborator);
            });
            emailSnapshot.forEach(doc => {
                 if (!resultsMap.has(doc.id)) {
                    resultsMap.set(doc.id, { id: doc.id, ...doc.data() } as Collaborator);
                }
            });

            setSearchedCollaborators(Array.from(resultsMap.values()));

        } catch (error) {
            console.error("Error searching collaborators: ", error);
            setSearchedCollaborators([]);
        } finally {
            setIsSearching(false);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const collaboratorsToDisplay = searchTerm.trim() ? searchedCollaborators : allCollaborators;
    const isLoading = isSearching || isLoadingAll;

    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Painel de Colaboradores</h1>
            <p className="text-muted-foreground">Consulte e gerencie os colaboradores cadastrados no sistema.</p>
        </div>
        <div className="flex items-center gap-4">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                    placeholder="Buscar por nome ou e-mail..." 
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
                <TableHead>Nome do Colaborador</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                  </TableCell>
                </TableRow>
              ) : collaboratorsToDisplay && collaboratorsToDisplay.length > 0 ? (
                collaboratorsToDisplay.map((collaborator) => (
                <TableRow key={collaborator.id}>
                  <TableCell className="font-medium">{collaborator.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{collaborator.collaboratorType}</Badge>
                  </TableCell>
                  <TableCell>{collaborator.email}</TableCell>
                  <TableCell className="text-right">
                      <Link href={`/boss/collaborators/${collaborator.id}`}>
                        <Button variant="outline" size="sm">Ver Detalhes</Button>
                      </Link>
                  </TableCell>
                </TableRow>
              ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    Nenhum colaborador encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }

