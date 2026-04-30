
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
import {
  ArrowLeft,
  Search,
  User,
  Building,
  Loader2,
  Handshake,
  AlertCircle,
  PlusCircle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFirestore } from '@/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import type { Client } from '@/lib/data';
import type { Partner } from '@/app/partner/signup/page';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';

export default function NewContractPage() {
  const router = useRouter();
  const firestore = useFirestore();

  const [clientSearchTerm, setClientSearchTerm] = useState('');
  const [clientSearchResults, setClientSearchResults] = useState<Client[]>([]);
  const [isSearchingClient, setIsSearchingClient] = useState(false);
  const [hasSearchedClient, setHasSearchedClient] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const [contractType, setContractType] = useState<'particular' | 'parceria'>(
    'particular'
  );

  const [partnerSearchTerm, setPartnerSearchTerm] = useState('');
  const [partnerSearchResults, setPartnerSearchResults] = useState<Partner[]>(
    []
  );
  const [isSearchingPartner, setIsSearchingPartner] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const handleClientSearch = async () => {
    if (!clientSearchTerm.trim()) return;
    setIsSearchingClient(true);
    setHasSearchedClient(true);
    setClientSearchResults([]);

    try {
      const lowercasedFilter = clientSearchTerm.toLowerCase();
      const resultsMap = new Map<string, Client>();

      const queries = [
        query(
          collection(firestore, 'clients'),
          where('fullName', '>=', lowercasedFilter),
          where('fullName', '<=', lowercasedFilter + '\uf8ff')
        ),
        query(
          collection(firestore, 'clients'),
          where('companyName', '>=', lowercasedFilter),
          where('companyName', '<=', lowercasedFilter + '\uf8ff')
        ),
        query(collection(firestore, 'clients'), where('cpf', '==', clientSearchTerm)),
        query(collection(firestore, 'clients'), where('cnpj', '==', clientSearchTerm)),
      ];

      const snapshots = await Promise.all(queries.map(q => getDocs(q)));

      snapshots.forEach(snapshot => {
        snapshot.forEach(doc => {
            if (!resultsMap.has(doc.id)) {
                resultsMap.set(doc.id, { id: doc.id, ...doc.data() } as Client);
            }
        });
      });

      setClientSearchResults(Array.from(resultsMap.values()));
    } catch (error) {
      console.error('Error searching clients:', error);
    } finally {
      setIsSearchingClient(false);
    }
  };

  const handlePartnerSearch = async () => {
    if (!partnerSearchTerm.trim()) return;
    setIsSearchingPartner(true);
    setPartnerSearchResults([]);

    try {
      const lowercasedFilter = partnerSearchTerm.toLowerCase();
      const q = query(
        collection(firestore, 'partners'),
        where('name', '>=', lowercasedFilter),
        where('name', '<=', lowercasedFilter + '\uf8ff')
      );
      const querySnapshot = await getDocs(q);
      const results: Partner[] = [];
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() } as Partner);
      });
      setPartnerSearchResults(results);
    } catch (error) {
      console.error('Error searching partners:', error);
    } finally {
      setIsSearchingPartner(false);
    }
  };

  const selectClient = (client: Client) => {
    setSelectedClient(client);
    setClientSearchTerm('');
    setClientSearchResults([]);
    setHasSearchedClient(false);
  };

  const selectPartner = (partner: Partner) => {
    setSelectedPartner(partner);
    setPartnerSearchTerm('');
    setPartnerSearchResults([]);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push('/boss/financial')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Adicionar Novo Contrato de Honorários
          </h1>
          <p className="text-muted-foreground">
            Vincule um contrato a um cliente e parceiro (se aplicável).
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>1. Selecionar Cliente</CardTitle>
          <CardDescription>
            Busque e selecione o cliente para este contrato.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!selectedClient ? (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar cliente por nome, CPF ou CNPJ..."
                    className="pl-10"
                    value={clientSearchTerm}
                    onChange={(e) => setClientSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleClientSearch()}
                  />
                </div>
                <Button
                  onClick={handleClientSearch}
                  disabled={isSearchingClient}
                  className="w-full sm:w-auto"
                >
                  {isSearchingClient ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Buscar Cliente'
                  )}
                </Button>
              </div>

              {!isSearchingClient && hasSearchedClient && clientSearchResults.length === 0 && (
                <Alert variant="destructive" className="flex-col sm:flex-row items-center gap-4">
                    <div className="flex items-center">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle className="ml-2">Nenhum resultado</AlertTitle>
                    </div>
                    <div className="flex-1 sm:text-left text-center mt-2 sm:mt-0">
                      <AlertDescription>
                        Cliente não encontrado. Verifique se você já realizou o
                        cadastro deste cliente no sistema.
                      </AlertDescription>
                    </div>
                    <Link href="/signup" className="w-full sm:w-auto">
                        <Button variant="outline" className="w-full">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Adicionar Novo Cliente
                        </Button>
                    </Link>
                </Alert>
              )}
              
              {clientSearchResults.length > 0 && (
                <div className="border rounded-md max-h-60 overflow-y-auto">
                  {clientSearchResults.map((client) => (
                    <button
                      key={client.id}
                      onClick={() => selectClient(client)}
                      className="flex w-full items-center gap-3 p-3 text-left hover:bg-accent"
                    >
                      {client.type === 'Pessoa Física' ? (
                        <User className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <Building className="h-5 w-5 text-muted-foreground" />
                      )}
                      <div>
                        <p className="font-semibold">
                          {client.fullName || client.companyName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {client.cpf || client.cnpj}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-4">
                {selectedClient.type === 'Pessoa Física' ? (
                  <User className="h-8 w-8 text-muted-foreground" />
                ) : (
                  <Building className="h-8 w-8 text-muted-foreground" />
                )}
                <div>
                  <p className="font-bold text-lg">
                    {selectedClient.fullName || selectedClient.companyName}
                  </p>
                  <p className="text-muted-foreground">
                    {selectedClient.cpf || selectedClient.cnpj}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedClient(null);
                  setHasSearchedClient(false);
                }}
              >
                Alterar Cliente
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedClient && (
        <Card>
          <CardHeader>
            <CardTitle>2. Definir Tipo de Contrato</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={contractType}
              onValueChange={(v: 'particular' | 'parceria') => {
                setContractType(v);
                setSelectedPartner(null); // Reset partner if type changes
              }}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="particular" id="particular" />
                <Label htmlFor="particular">
                  Registro Financeiro Particular
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="parceria" id="parceria" />
                <Label htmlFor="parceria">
                  Registro Financeiro de Parceria
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      )}

      {contractType === 'parceria' && selectedClient && (
        <Card>
          <CardHeader>
            <CardTitle>3. Selecionar Parceiro</CardTitle>
            <CardDescription>
              Busque e vincule um parceiro a este contrato.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!selectedPartner ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar parceiro por nome..."
                      className="pl-10"
                      value={partnerSearchTerm}
                      onChange={(e) => setPartnerSearchTerm(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === 'Enter' && handlePartnerSearch()
                      }
                    />
                  </div>
                  <Button
                    onClick={handlePartnerSearch}
                    disabled={isSearchingPartner}
                  >
                    {isSearchingPartner ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Buscar Parceiro'
                    )}
                  </Button>
                </div>
                {isSearchingPartner && (
                  <Loader2 className="mx-auto my-4 h-6 w-6 animate-spin" />
                )}
                {partnerSearchResults.length > 0 && (
                  <div className="border rounded-md max-h-60 overflow-y-auto">
                    {partnerSearchResults.map((partner) => (
                      <button
                        key={partner.id}
                        onClick={() => selectPartner(partner)}
                        className="flex w-full items-center gap-3 p-3 text-left hover:bg-accent"
                      >
                        <Handshake className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-semibold">{partner.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {partner.company}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  <Handshake className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="font-bold text-lg">{selectedPartner.name}</p>
                    <p className="text-muted-foreground">
                      {selectedPartner.company}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setSelectedPartner(null)}
                >
                  Alterar Parceiro
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {selectedClient && (
        <Card>
          <CardHeader>
            <CardTitle>
              {contractType === 'parceria' ? '4' : '3'}. Detalhes Financeiros
              do Contrato
            </CardTitle>
            <CardDescription>
              Preencha as informações sobre valores, pagamentos e parcelas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Formulário para detalhes financeiros será implementado aqui.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
