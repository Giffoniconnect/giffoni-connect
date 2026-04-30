'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { PlusCircle, Loader2, ArrowLeft, MessageSquare, Instagram, Facebook } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { addDoc, collection, serverTimestamp, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.1 4.74a4.13 4.13 0 1 1-5.46 3.09V15.5a5.5 5.5 0 1 0 5.5-5.5h-3.09" />
    </svg>
);
  
type PrivateLead = {
    id: string;
    fullName: string;
    phone?: string;
    hasWhatsapp?: boolean;
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    createdAt: any;
    status?: 'Novo' | 'Contatado' | 'Qualificado' | 'Não Qualificado' | 'Cliente Ativo' | 'Descartado';
};

export default function PrivateLeadsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const firestore = useFirestore();
  const [isLoading, setIsLoading] = useState(false);

  // States for form fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneNotInformed, setPhoneNotInformed] = useState(false);
  const [hasWhatsapp, setHasWhatsapp] = useState(false);
  const [instagram, setInstagram] = useState('');
  const [instagramNotInformed, setInstagramNotInformed] = useState(false);
  const [facebook, setFacebook] = useState('');
  const [facebookNotInformed, setFacebookNotInformed] = useState(false);
  const [tiktok, setTiktok] = useState('');
  const [tiktokNotInformed, setTiktokNotInformed] = useState(false);

  const leadsQuery = useMemoFirebase(
    () => firestore ? query(collection(firestore, 'private_leads'), orderBy('createdAt', 'desc')) : null,
    [firestore]
  );
  const { data: leads, isLoading: isLoadingLeads } = useCollection<PrivateLead>(leadsQuery);

  const handleStatusChange = async (leadId: string, newStatus: PrivateLead['status']) => {
    if (!firestore) return;
    const leadRef = doc(firestore, 'private_leads', leadId);
    try {
        await updateDoc(leadRef, { status: newStatus });
        toast({
            title: 'Status Atualizado',
            description: `O status do lead foi alterado para ${newStatus}.`,
        });
    } catch (error) {
        console.error("Error updating status: ", error);
        toast({
            variant: 'destructive',
            title: 'Erro',
            description: 'Não foi possível atualizar o status do lead.',
        });
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const leadData = {
      fullName,
      phone: phoneNotInformed ? 'Não informado' : phone,
      hasWhatsapp,
      instagram: instagramNotInformed ? 'Não informado' : instagram,
      facebook: facebookNotInformed ? 'Não informado' : facebook,
      tiktok: tiktokNotInformed ? 'Não informado' : tiktok,
      status: 'Novo',
      createdAt: serverTimestamp(),
    };

    try {
      const leadsCollectionRef = collection(firestore, 'private_leads');
      await addDoc(leadsCollectionRef, leadData);

      toast({
        title: 'Lead Salvo com Sucesso!',
        description: `${fullName} foi salvo na coleção 'private_leads'.`,
      });

      // Reset form
      setFullName('');
      setPhone('');
      setPhoneNotInformed(false);
      setHasWhatsapp(false);
      setInstagram('');
      setInstagramNotInformed(false);
      setFacebook('');
      setFacebookNotInformed(false);
      setTiktok('');
      setTiktokNotInformed(false);
    } catch (error) {
      console.error('Error adding document: ', error);
      toast({
        variant: 'destructive',
        title: 'Erro ao Salvar',
        description: 'Não foi possível salvar o lead no banco de dados.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            LEADS Particulares em Potencial
          </h1>
          <p className="text-muted-foreground">
            Cadastre novos leads particulares para futuro contato e
            qualificação.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Formulário de Cadastrar LEADS Particulares em Potencial
          </CardTitle>
          <CardDescription>
            Preencha os dados abaixo para registrar um novo lead. Após salvar, você poderá cadastrá-lo como cliente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nome Completo do Cliente</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone de Contato</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={phoneNotInformed}
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="phoneNotInformed"
                    checked={phoneNotInformed}
                    onCheckedChange={(checked) => {
                      const isChecked = checked === true;
                      setPhoneNotInformed(isChecked);
                      if (isChecked) setPhone('');
                    }}
                  />
                  <Label htmlFor="phoneNotInformed">não informado</Label>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasWhatsapp"
                checked={hasWhatsapp}
                onCheckedChange={(checked) => setHasWhatsapp(checked === true)}
              />
              <Label htmlFor="hasWhatsapp">Possui WhatsApp?</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="instagram"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  disabled={instagramNotInformed}
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="instagramNotInformed"
                    checked={instagramNotInformed}
                    onCheckedChange={(checked) => {
                      const isChecked = checked === true;
                      setInstagramNotInformed(isChecked);
                      if (isChecked) setInstagram('');
                    }}
                  />
                  <Label htmlFor="instagramNotInformed">não informado</Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="facebook"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  disabled={facebookNotInformed}
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="facebookNotInformed"
                    checked={facebookNotInformed}
                    onCheckedChange={(checked) => {
                      const isChecked = checked === true;
                      setFacebookNotInformed(isChecked);
                      if (isChecked) setFacebook('');
                    }}
                  />
                  <Label htmlFor="facebookNotInformed">não informado</Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tiktok">TikTok</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="tiktok"
                  value={tiktok}
                  onChange={(e) => setTiktok(e.target.value)}
                  disabled={tiktokNotInformed}
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="tiktokNotInformed"
                    checked={tiktokNotInformed}
                    onCheckedChange={(checked) => {
                      const isChecked = checked === true;
                      setTiktokNotInformed(isChecked);
                      if (isChecked) setTiktok('');
                    }}
                  />
                  <Label htmlFor="tiktokNotInformed">não informado</Label>
                </div>
              </div>
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <PlusCircle className="mr-2 h-4 w-4" />
              )}
              Salvar Cadastro de LEAD Particular na coleção Formulário de Leads em Potencial do Firebase
            </Button>
          </form>
          <div className="mt-6 border-t pt-6">
            <CardDescription className="text-center mb-4">
                Após salvar o lead, você pode convertê-lo em um cliente para iniciar o fluxo de atendimento.
            </CardDescription>
            <Link href="/boss/service-desk">
              <Button variant="secondary" className="w-full">
                Cadastrar Cliente Lead Particular
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Relatório Geral de LEADS cadastrados</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="border rounded-lg overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome Completo</TableHead>
                            <TableHead>Telefone</TableHead>
                            <TableHead>WhatsApp</TableHead>
                            <TableHead>Instagram</TableHead>
                            <TableHead>TikTok</TableHead>
                            <TableHead>Facebook</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoadingLeads ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                    <Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" />
                                </TableCell>
                            </TableRow>
                        ) : !leads || leads.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                    Nenhum lead cadastrado.
                                </TableCell>
                            </TableRow>
                        ) : (
                            leads.map(lead => (
                                <TableRow key={lead.id}>
                                    <TableCell className="font-medium">{lead.fullName}</TableCell>
                                    <TableCell>{lead.phone}</TableCell>
                                    <TableCell>
                                        {lead.phone && lead.phone !== 'Não informado' && (
                                            <Button variant="outline" size="sm" asChild>
                                                <a href={`https://wa.me/55${lead.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                                                    <MessageSquare className="mr-2 h-4 w-4"/> Enviar
                                                </a>
                                            </Button>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <span>{lead.instagram}</span>
                                            {lead.instagram && lead.instagram !== 'Não informado' && (
                                                <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                                                    <a href={`https://ig.me/m/${lead.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                                                        <Instagram className="h-4 w-4"/>
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                         <div className="flex items-center gap-2">
                                            <span>{lead.tiktok}</span>
                                            {lead.tiktok && lead.tiktok !== 'Não informado' && (
                                                <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                                                     <a href={`https://www.tiktok.com/@${lead.tiktok.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                                                        <TikTokIcon className="h-4 w-4"/>
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                         <div className="flex items-center gap-2">
                                            <span>{lead.facebook && lead.facebook.length > 25 ? `${lead.facebook.substring(0, 25)}...` : lead.facebook}</span>
                                            {lead.facebook && lead.facebook !== 'Não informado' && (
                                                <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                                                    <a href={lead.facebook} target="_blank" rel="noopener noreferrer">
                                                        <MessageSquare className="h-4 w-4"/>
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Select value={lead.status || 'Novo'} onValueChange={(value: PrivateLead['status']) => handleStatusChange(lead.id, value)}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Novo">Novo</SelectItem>
                                                <SelectItem value="Contatado">Contatado</SelectItem>
                                                <SelectItem value="Qualificado">Qualificado</SelectItem>
                                                <SelectItem value="Não Qualificado">Não Qualificado</SelectItem>
                                                <SelectItem value="Cliente Ativo">Cliente Ativo</SelectItem>
                                                <SelectItem value="Descartado">Descartado</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
