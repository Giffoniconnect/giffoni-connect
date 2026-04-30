'use client';

import { useParams, useRouter } from 'next/navigation';
import { useDoc, useFirestore, useMemoFirebase, useCollection } from '@/firebase';
import {
  collection,
  doc,
} from 'firebase/firestore';
import type { Case } from '@/lib/data';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Pencil,
  PlusCircle,
  Loader2,
  MessageSquare,
  Instagram,
  User,
  Building,
  Landmark,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateClientField } from './actions';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Expanded Client type to match forms
type Client = {
    id: string;
    type: 'Pessoa Física' | 'Pessoa Jurídica';
    // Common for search
    name?: string; 
    // PF
    fullName?: string;
    nationality?: string;
    maritalStatus?: 'solteiro' | 'casado' | 'divorciado' | 'viuvo' | 'uniao_estavel';
    profession?: string;
    rg?: string;
    cpf?: string;
    address?: {
        street?: string; number?: string; complement?: string; neighborhood?: string; zipCode?: string; city?: string; state?: string;
    };
    phone?: string;
    hasWhatsapp?: boolean;
    email?: string;
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    // PJ
    companyName?: string;
    nomeFantasia?: string;
    cnpj?: string;
    ['email-pj']?: string;
    site?: string;
    ['address-pj']?: {
        street?: string; number?: string; complement?: string; neighborhood?: string; zipCode?: string; city?: string; state?: string;
    };
    // Admin PJ
    adminName?: string;
    adminNationality?: string;
    adminMaritalStatus?: string;
    adminProfession?: string;
    adminEmail?: string;
    adminRg?: string;
    adminCpf?: string;
    adminPhone?: string;
    adminWhatsapp?: boolean;
    adminAddress?: {
        street?: string; number?: string; complement?: string; neighborhood?: string; zipCode?: string; city?: string; state?: string;
    };
    adminInstagram?: string;
    adminFacebook?: string;
    adminTiktok?: string;
    // Bank
    bankDetails?: {
      type?: 'pix' | 'conta';
      pixKeyType?: string;
      pixKey?: string;
      bankName?: string;
      agency?: string;
      accountNumber?: string;
      accountType?: string;
      accountHolderName?: string;
    };
};

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.75 13.96c.25.13.43.2.5.33.07.13.07.75-.18 1.48-.24.72-1.55 1.44-2.83 1.6-1.28.15-2.92-.1-4.73-1.05-1.8-.95-3.3-2.4-4.38-4.2-.95-1.63-1.05-3.3-.8-4.5.25-1.23.9-2.3 1.48-2.83.13-.08.28-.13.43-.13.15 0 .3.03.43.07.25.1.58.28.83.5.25.2.42.48.5.75.07.28.07.68-.18 1.1-.25.42-.58.8-1 1.15l-.2.13c-.15.1-0.2,0.25-0.13,0.43.33,0.75,1.05,1.72,2.1,2.78 1.05,1.05,2.03,1.78,2.78,2.1.18.07.33,0,.43-.13l.2-.2c.34-.43.72-.75 1.12-1 .42-.25.82-.25 1.1-.18.28.08.55.25.75.5.25.25.43.58.5.83.13.25.13.43.07.58z"/>
    </svg>
);


const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.1 4.74a4.13 4.13 0 1 1-5.46 3.09V15.5a5.5 5.5 0 1 0 5.5-5.5h-3.09" />
    </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
);

const formatAddress = (address: any) => {
    if (!address || typeof address !== 'object' || !address.street) return 'Informação não preenchida';
    const parts = [
        address.street,
        address.number,
        address.complement,
        address.neighborhood,
        address.city,
        address.state,
        address.zipCode
    ].filter(Boolean);
    return parts.join(', ') || 'Informação não preenchida';
};

const DetailItem = ({ label, value, onEdit }: { label: string, value?: string | boolean | null, onEdit?: () => void }) => {
    const hasValue = value !== undefined && value !== null && value !== '';
    return (
        <div className="flex items-center justify-between rounded-md border p-3 min-h-[74px]">
            <div className="flex flex-col">
                <p className="text-sm font-medium text-muted-foreground">{label}</p>
                {hasValue ? (
                    <p className="text-base font-semibold">{typeof value === 'boolean' ? (value ? 'Sim' : 'Não') : value}</p>
                ) : (
                    <p className="text-sm font-semibold text-destructive italic">Informação não preenchida</p>
                )}
            </div>
            {onEdit && (
                <Button variant="ghost" size="icon" onClick={onEdit}>
                    <Pencil className="h-4 w-4 text-muted-foreground" />
                    <span className="sr-only">Editar {label}</span>
                </Button>
            )}
        </div>
    );
};

const SocialDetailItem = ({ label, value, url, IconComponent, onEdit }: { label: string, value?: string | null, url: string, IconComponent: React.ElementType, onEdit?: () => void }) => {
    return (
        <div className="flex items-center justify-between rounded-md border p-3 min-h-[74px]">
            <div className="flex flex-col overflow-hidden">
                <p className="text-sm font-medium text-muted-foreground">{label}</p>
                 {(value === undefined || value === '' || value === null) ? (
                    <p className="text-sm font-semibold text-destructive italic">Informação não preenchida</p>
                ) : (
                    <p className="text-base font-semibold truncate">{value}</p>
                )}
            </div>
            <div className="flex items-center gap-1">
                {value && url && (
                    <Button variant="outline" size="icon" asChild>
                        <a href={url} target="_blank" rel="noopener noreferrer" aria-label={label}>
                            <IconComponent className="h-4 w-4" />
                        </a>
                    </Button>
                )}
                {onEdit && (
                     <Button variant="ghost" size="icon" onClick={onEdit}>
                        <Pencil className="h-4 w-4 text-muted-foreground" />
                        <span className="sr-only">Editar {label}</span>
                    </Button>
                )}
            </div>
        </div>
    );
};

export default function ClientDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const clientId = params.clientId as string;
  const firestore = useFirestore();
  const { toast } = useToast();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingField, setEditingField] = useState<{
    field: string;
    label: string;
    subfield?: string;
    isAddress?: boolean;
    inputType?: 'text' | 'boolean' | 'select';
    selectOptions?: { value: string; label: string }[];
  } | null>(null);
  const [currentValue, setCurrentValue] = useState<any>('');

  const clientRef = useMemoFirebase(
    () => (firestore && clientId ? doc(firestore, 'clients', clientId) : null),
    [firestore, clientId]
  );
  const { data: client, isLoading } = useDoc<Client>(clientRef);

  const casesRef = useMemoFirebase(
    () => (firestore && clientId ? collection(firestore, 'clients', clientId, 'cases') : null),
    [firestore, clientId]
  );
  const { data: cases, isLoading: isLoadingCases } = useCollection<Case>(casesRef);
  
  const defaultAddress = { street: '', number: '', complement: '', neighborhood: '', zipCode: '', city: '', state: '' };

  const handleEdit = (
    field: string,
    label: string,
    options: {
      subfield?: string;
      isAddress?: boolean;
      inputType?: 'text' | 'boolean' | 'select';
      selectOptions?: { value: string; label: string }[];
    } = {}
  ) => {
    const { subfield, isAddress, inputType = 'text', selectOptions } = options;
    setEditingField({ field, label, subfield, isAddress, inputType, selectOptions });

    let initialValue: any = '';
    if (isAddress) {
      initialValue = { ...defaultAddress, ...((client as any)?.[field] || {}) };
    } else if (subfield && client && (client as any)[field]) {
      initialValue = (client as any)[field][subfield] || '';
    } else {
      initialValue = (client as any)?.[field as keyof Client] ?? '';
    }
    
    if (inputType === 'boolean') {
      initialValue = !!initialValue;
    }

    setCurrentValue(initialValue);
    setIsEditModalOpen(true);
  };
  
  const handleSave = async () => {
    if (!editingField || !clientId) return;

    let dataToUpdate: Record<string, any>;

    if (editingField.isAddress) {
      dataToUpdate = { [editingField.field]: currentValue };
    } else if (editingField.subfield) {
      dataToUpdate = {
        [editingField.field]: {
          ...((client as any)[editingField.field] || {}),
          [editingField.subfield]: currentValue,
        },
      };
    } else {
      dataToUpdate = { [editingField.field]: currentValue };
    }

    const result = await updateClientField(clientId, dataToUpdate);

    if (result.success) {
      toast({ title: 'Sucesso!', description: `${editingField.label} foi atualizado.` });
      setIsEditModalOpen(false);
      setEditingField(null);
    } else {
      toast({ variant: 'destructive', title: 'Erro', description: result.error });
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" => {
    switch (status) {
      case 'Ativo':
        return 'default';
      case 'Pendente':
        return 'secondary';
      case 'Arquivado':
        return 'destructive';
      default:
        return 'default';
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 text-center h-full">
        <h1 className="text-2xl font-bold">Cliente não encontrado</h1>
        <p className="text-muted-foreground">
          O cliente que você está procurando não existe.
        </p>
        <Button onClick={() => router.push('/boss/dashboard')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar ao Painel de Clientes
        </Button>
      </div>
    );
  }

  const isPF = client.type === 'Pessoa Física';
  const isPJ = client.type === 'Pessoa Jurídica';

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.push('/boss/dashboard')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Painel do Cliente
          </h1>
          <p className="text-muted-foreground">
            Informações cadastrais e processos de{' '}
            {client.fullName || client.companyName}.
          </p>
        </div>
      </div>

      {isPF && (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><User className="h-5 w-5"/> Qualificação - Pessoa Física</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DetailItem label="Nome Completo" value={client.fullName} onEdit={() => handleEdit('fullName', 'Nome Completo')} />
                    <DetailItem label="Tipo de Pessoa" value={client.type} />
                    <DetailItem label="E-mail Principal" value={client.email} onEdit={() => handleEdit('email', 'E-mail Principal')} />
                    <DetailItem label="CPF" value={client.cpf} onEdit={() => handleEdit('cpf', 'CPF')} />
                    <DetailItem label="Nacionalidade" value={client.nationality} onEdit={() => handleEdit('nationality', 'Nacionalidade')} />
                    <DetailItem label="Estado Civil" value={client.maritalStatus} onEdit={() => handleEdit('maritalStatus', 'Estado Civil', { inputType: 'select', selectOptions: [
                        { value: 'solteiro', label: 'Solteiro(a)' },
                        { value: 'casado', label: 'Casado(a)' },
                        { value: 'divorciado', label: 'Divorciado(a)' },
                        { value: 'viuvo', label: 'Viuvo(a)' },
                        { value: 'uniao_estavel', label: 'União Estável' },
                    ]})} />
                    <DetailItem label="Profissão" value={client.profession} onEdit={() => handleEdit('profession', 'Profissão')} />
                    <DetailItem label="RG" value={client.rg} onEdit={() => handleEdit('rg', 'RG')} />
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Contato e Endereço - Pessoa Física</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DetailItem label="Telefone" value={client.phone} onEdit={() => handleEdit('phone', 'Telefone')} />
                    <div className="flex items-center justify-between rounded-md border p-3 min-h-[74px]">
                        <div className="flex flex-col">
                            <p className="text-sm font-medium text-muted-foreground">Possui WhatsApp?</p>
                            <p className="text-base font-semibold">{client.hasWhatsapp ? 'Sim' : 'Não'}</p>
                        </div>
                        <div className="flex items-center gap-1">
                            {client.hasWhatsapp && client.phone && (
                                <Button variant="outline" size="icon" asChild>
                                    <a href={`https://wa.me/55${client.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                                        <WhatsAppIcon className="h-5 w-5 text-green-500" />
                                    </a>
                                </Button>
                            )}
                            <Button variant="ghost" size="icon" onClick={() => handleEdit('hasWhatsapp', 'Possui WhatsApp?', { inputType: 'boolean' })}>
                                <Pencil className="h-4 w-4 text-muted-foreground" />
                                <span className="sr-only">Editar Possui WhatsApp?</span>
                            </Button>
                        </div>
                    </div>
                    <DetailItem label="Endereço Completo" value={formatAddress(client.address)} onEdit={() => handleEdit('address', 'Endereço Completo', { isAddress: true })} />
                    <SocialDetailItem label="Instagram" value={client.instagram} url={`https://instagram.com/${client.instagram?.replace('@', '')}`} IconComponent={Instagram} onEdit={() => handleEdit('instagram', 'Instagram')} />
                    <SocialDetailItem label="TikTok" value={client.tiktok} url={`https://tiktok.com/@${client.tiktok?.replace('@', '')}`} IconComponent={TikTokIcon} onEdit={() => handleEdit('tiktok', 'TikTok')} />
                    <SocialDetailItem label="Facebook" value={client.facebook} url={client.facebook || '#'} IconComponent={FacebookIcon} onEdit={() => handleEdit('facebook', 'Facebook')} />
                </CardContent>
            </Card>
        </>
      )}

      {isPJ && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><User className="h-5 w-5"/> Informações Gerais</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <DetailItem label="Razão Social" value={client.companyName} onEdit={() => handleEdit('companyName', 'Razão Social')} />
              <DetailItem label="Nome Fantasia" value={client.nomeFantasia} onEdit={() => handleEdit('nomeFantasia', 'Nome Fantasia')} />
              <DetailItem label="Tipo de Pessoa" value={client.type} />
              <DetailItem label="E-mail Principal" value={client['email-pj']} onEdit={() => handleEdit('email-pj', 'E-mail Principal')} />
              <DetailItem label="CNPJ" value={client.cnpj} onEdit={() => handleEdit('cnpj', 'CNPJ')} />
              <DetailItem label="Site da Empresa" value={client.site} onEdit={() => handleEdit('site', 'Site da Empresa')} />
              <DetailItem label="Telefone da Empresa" value={client.phone} onEdit={() => handleEdit('phone', 'Telefone da Empresa')} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Building className="h-5 w-5"/> Dados da Empresa</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <DetailItem label="Endereço da Sede" value={formatAddress(client['address-pj'])} onEdit={() => handleEdit('address-pj', 'Endereço da Sede', { isAddress: true })} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><User className="h-5 w-5"/>Qualificação - Sócio Administrador</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <DetailItem label="Nome do Sócio" value={client.adminName} onEdit={() => handleEdit('adminName', 'Nome do Sócio')} />
              <DetailItem label="CPF do Sócio" value={client.adminCpf} onEdit={() => handleEdit('adminCpf', 'CPF do Sócio')} />
              <DetailItem label="RG do Sócio" value={client.adminRg} onEdit={() => handleEdit('adminRg', 'RG do Sócio')} />
              <DetailItem label="E-mail do Sócio" value={client.adminEmail} onEdit={() => handleEdit('adminEmail', 'E-mail do Sócio')} />
              <DetailItem label="Nacionalidade do Sócio" value={client.adminNationality} onEdit={() => handleEdit('adminNationality', 'Nacionalidade do Sócio')} />
              <DetailItem label="Estado Civil do Sócio" value={client.adminMaritalStatus} onEdit={() => handleEdit('adminMaritalStatus', 'Estado Civil do Sócio', { inputType: 'select', selectOptions: [
                  { value: 'solteiro', label: 'Solteiro(a)' },
                  { value: 'casado', label: 'Casado(a)' },
                  { value: 'divorciado', label: 'Divorciado(a)' },
                  { value: 'viuvo', label: 'Viuvo(a)' },
                  { value: 'uniao_estavel', label: 'União Estável' },
              ]})} />
              <DetailItem label="Profissão do Sócio" value={client.adminProfession} onEdit={() => handleEdit('adminProfession', 'Profissão do Sócio')} />
              <DetailItem label="Telefone do Sócio" value={client.adminPhone} onEdit={() => handleEdit('adminPhone', 'Telefone do Sócio')} />
              <div className="flex items-center justify-between rounded-md border p-3 min-h-[74px]">
                <div className="flex flex-col">
                    <p className="text-sm font-medium text-muted-foreground">WhatsApp do Sócio?</p>
                    <p className="text-base font-semibold">{client.adminWhatsapp ? 'Sim' : 'Não'}</p>
                </div>
                <div className="flex items-center gap-1">
                    {client.adminWhatsapp && client.adminPhone && (
                        <Button variant="outline" size="icon" asChild>
                            <a href={`https://wa.me/55${client.adminPhone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp do Sócio">
                                <WhatsAppIcon className="h-5 w-5 text-green-500" />
                            </a>
                        </Button>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => handleEdit('adminWhatsapp', 'WhatsApp do Sócio?', { inputType: 'boolean' })}>
                        <Pencil className="h-4 w-4 text-muted-foreground" />
                        <span className="sr-only">Editar WhatsApp do Sócio?</span>
                    </Button>
                </div>
              </div>
              <DetailItem label="Endereço do Sócio" value={formatAddress(client.adminAddress)} onEdit={() => handleEdit('adminAddress', 'Endereço do Sócio', { isAddress: true })} />
              <SocialDetailItem label="Instagram do Sócio" value={client.adminInstagram} url={`https://instagram.com/${client.adminInstagram?.replace('@', '')}`} IconComponent={Instagram} onEdit={() => handleEdit('adminInstagram', 'Instagram do Sócio')} />
              <SocialDetailItem label="TikTok do Sócio" value={client.adminTiktok} url={`https://tiktok.com/@${client.adminTiktok?.replace('@', '')}`} IconComponent={TikTokIcon} onEdit={() => handleEdit('adminTiktok', 'TikTok do Sócio')} />
              <SocialDetailItem label="Facebook do Sócio" value={client.adminFacebook} url={client.adminFacebook || '#'} IconComponent={FacebookIcon} onEdit={() => handleEdit('adminFacebook', 'Facebook do Sócio')} />
            </CardContent>
          </Card>
        </>
      )}

      
      <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Landmark /> Dados Bancários</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <DetailItem label="Titular da Conta" value={client.bankDetails?.accountHolderName} onEdit={() => handleEdit('bankDetails', 'Titular da Conta', { subfield: 'accountHolderName' })} />
              <DetailItem label="Tipo de Chave Pix" value={client.bankDetails?.pixKeyType} onEdit={() => handleEdit('bankDetails', 'Tipo de Chave Pix', { subfield: 'pixKeyType', inputType: 'select', selectOptions: [
                  {value: 'cpf', label: 'CPF'},
                  {value: 'email', label: 'E-mail'},
                  {value: 'celular', label: 'Celular'},
                  {value: 'aleatoria', label: 'Aleatória'},
              ]})} />
              <DetailItem label="Chave Pix" value={client.bankDetails?.pixKey} onEdit={() => handleEdit('bankDetails', 'Chave Pix', { subfield: 'pixKey' })} />
              <DetailItem label="Banco" value={client.bankDetails?.bankName} onEdit={() => handleEdit('bankDetails', 'Banco', { subfield: 'bankName' })} />
              <DetailItem label="Agência" value={client.bankDetails?.agency} onEdit={() => handleEdit('bankDetails', 'Agência', { subfield: 'agency' })} />
              <DetailItem label="Conta" value={client.bankDetails?.accountNumber} onEdit={() => handleEdit('bankDetails', 'Conta', { subfield: 'accountNumber' })} />
              <DetailItem label="Tipo de Conta" value={client.bankDetails?.accountType} onEdit={() => handleEdit('bankDetails', 'Tipo de Conta', { subfield: 'accountType', inputType: 'select', selectOptions: [{value: 'corrente', label: 'Corrente'}, {value: 'poupanca', label: 'Poupança'}] })} />
          </CardContent>
      </Card>


      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Processos Associados</CardTitle>
            <CardDescription>
              Processos vinculados a este cliente. Clique em "Adicionar" para
              iniciar um novo processo.
            </CardDescription>
          </div>
          <Link href={`/boss/dashboard/type-of-new-case?clientId=${clientId}`} passHref>
             <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Cadastrar novo caso
             </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nº do Processo</TableHead>
                  <TableHead>Tipo de Ação</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Última Atualização</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoadingCases ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                    </TableCell>
                  </TableRow>
                ) : cases && cases.length > 0 ? (
                  cases.map((caseItem) => (
                    <TableRow key={caseItem.id}>
                      <TableCell className="font-mono">
                        {caseItem.caseNumber || 'Não definido'}
                      </TableCell>
                      <TableCell>{caseItem.actionType || 'Não definido'}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(caseItem.status)}>
                          {caseItem.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {caseItem.lastUpdate ? format(parseISO(caseItem.lastUpdate), 'dd/MM/yyyy') : 'N/A'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/boss/clients/${clientId}/cases/${caseItem.id}`}>
                           <Button variant="outline" size="sm">
                            Gerenciar Processo
                           </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      Nenhum processo encontrado para este cliente.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar {editingField?.label}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {editingField?.isAddress ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="street">Rua</Label>
                    <Input id="street" name="street" value={currentValue.street} onChange={handleAddressChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="number">Número</Label>
                    <Input id="number" name="number" value={currentValue.number} onChange={handleAddressChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="complement">Complemento</Label>
                    <Input id="complement" name="complement" value={currentValue.complement} onChange={handleAddressChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="neighborhood">Bairro</Label>
                    <Input id="neighborhood" name="neighborhood" value={currentValue.neighborhood} onChange={handleAddressChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade</Label>
                    <Input id="city" name="city" value={currentValue.city} onChange={handleAddressChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">Estado (UF)</Label>
                    <Input id="state" name="state" value={currentValue.state} onChange={handleAddressChange} />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="zipCode">CEP</Label>
                    <Input id="zipCode" name="zipCode" value={currentValue.zipCode} onChange={handleAddressChange} />
                  </div>
                </div>
              </div>
            ) : editingField?.inputType === 'boolean' ? (
                <div className="flex items-center space-x-2">
                    <Switch
                        id="edit-value"
                        checked={currentValue}
                        onCheckedChange={(checked) => setCurrentValue(checked)}
                    />
                    <Label htmlFor="edit-value">{currentValue ? 'Sim' : 'Não'}</Label>
                </div>
            ) : editingField?.inputType === 'select' ? (
                <Select value={currentValue} onValueChange={setCurrentValue}>
                    <SelectTrigger>
                        <SelectValue placeholder={`Selecione um(a) ${editingField.label}`} />
                    </SelectTrigger>
                    <SelectContent>
                        {editingField.selectOptions?.map(opt => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="edit-value">{editingField?.label}</Label>
                <Input
                  id="edit-value"
                  value={currentValue}
                  onChange={(e) => setCurrentValue(e.target.value)}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button onClick={handleSave}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
