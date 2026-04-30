'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Logo } from '@/components/logo';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth, useFirestore } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp, collection } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const brazilianStates = [
    { value: 'AC', label: 'AC' }, { value: 'AL', label: 'AL' }, { value: 'AP', label: 'AP' }, 
    { value: 'AM', label: 'AM' }, { value: 'BA', label: 'BA' }, { value: 'CE', label: 'CE' }, 
    { value: 'DF', label: 'DF' }, { value: 'ES', label: 'ES' }, { value: 'GO', label: 'GO' }, 
    { value: 'MA', label: 'MA' }, { value: 'MT', label: 'MT' }, { value: 'MS', label: 'MS' }, 
    { value: 'MG', label: 'MG' }, { value: 'PA', label: 'PA' }, { value: 'PB', label: 'PB' }, 
    { value: 'PR', label: 'PR' }, { value: 'PE', label: 'PE' }, { value: 'PI', label: 'PI' }, 
    { value: 'RJ', label: 'RJ' }, { value: 'RN', label: 'RN' }, { value: 'RS', label: 'RS' }, 
    { value: 'RO', label: 'RO' }, { value: 'RR', label: 'RR' }, { value: 'SC', label: 'SC' }, 
    { value: 'SP', label: 'SP' }, { value: 'SE', label: 'SE' }, { value: 'TO', label: 'TO' }
];

const phoneValidation = z.string().optional().or(z.literal('')).refine(val => {
    if (!val || val.trim() === '') return true;
    const digits = val.replace(/[^\d]/g, '');
    if (digits.length !== 11) return false;
    if (digits.charAt(2) !== '9') return false;
    return true;
}, { message: "Celular inválido. Use (DD) 9XXXX-XXXX." });

const formSchema = z.object({
    companyName: z.string().min(3, "Razão Social é obrigatória."),
    nomeFantasia: z.string().optional(),
    cnpj: z.string().min(18, "CNPJ é obrigatório e deve ter 14 dígitos.").max(18, "CNPJ inválido."),
    'email-pj': z.string().email("E-mail da empresa é inválido."),
    phone: phoneValidation,
    site: z.string().optional(),
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    tiktok: z.string().optional(),
    'address-pj': z.object({
        street: z.string().min(3, "Rua é obrigatória."),
        number: z.string().min(1, "Número é obrigatório."),
        complement: z.string().optional(),
        neighborhood: z.string().min(3, "Bairro é obrigatório."),
        zipCode: z.string().min(9, "CEP é obrigatório e deve ter 8 dígitos."),
        city: z.string().min(3, "Cidade é obrigatória."),
        state: z.string().min(2, "Estado é obrigatório."),
    }),
    adminName: z.string().min(3, "Nome do sócio é obrigatório."),
    adminNationality: z.string().min(3, "Nacionalidade do sócio é obrigatória."),
    adminMaritalStatus: z.string().nonempty("Estado civil do sócio é obrigatório."),
    adminProfession: z.string().min(3, "Profissão do sócio é obrigatória."),
    adminEmail: z.string().email("E-mail do sócio é inválido."),
    adminRg: z.string().min(5, "RG do sócio é obrigatório."),
    adminCpf: z.string().min(14, "CPF do sócio é obrigatório e deve ter 11 dígitos.").max(14, "CPF inválido."),
    adminPhone: phoneValidation,
    adminWhatsapp: z.boolean().default(false),
    adminAddress: z.object({
        street: z.string().min(3, "Rua do sócio é obrigatória."),
        number: z.string().min(1, "Número do sócio é obrigatório."),
        complement: z.string().optional(),
        neighborhood: z.string().min(3, "Bairro do sócio é obrigatório."),
        zipCode: z.string().min(9, "CEP do sócio é obrigatório e deve ter 8 dígitos."),
        city: z.string().min(3, "Cidade do sócio é obrigatória."),
        state: z.string().min(2, "Estado do sócio é obrigatório."),
    }),
    adminInstagram: z.string().optional(),
    adminFacebook: z.string().optional(),
    adminTiktok: z.string().optional(),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
    addDadosBancarios: z.enum(['sim', 'nao']),
    tipoDadosBancarios: z.enum(['pix', 'conta']).optional(),
    bankDetails: z.object({
        pixKey: z.string().optional(),
        pixKeyType: z.string().optional(),
        bankName: z.string().optional(),
        agency: z.string().optional(),
        accountNumber: z.string().optional(),
        accountType: z.string().optional(),
        accountHolderName: z.string().optional(),
    }).optional(),
});

type FormValues = z.infer<typeof formSchema>;


export default function SignupPjPage() {
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, startTransition] = useTransition();
  const [isAdminNewRg, setIsAdminNewRg] = useState(false);
  const [showBankDetails, setShowBankDetails] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        addDadosBancarios: 'nao',
    },
  });

  const addDadosBancarios = form.watch('addDadosBancarios');
  const tipoDadosBancarios = form.watch('tipoDadosBancarios');

  const formatCPF = (value: string) => {
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 3) return onlyNums;
    if (onlyNums.length <= 6) return `${onlyNums.slice(0, 3)}.${onlyNums.slice(3)}`;
    if (onlyNums.length <= 9) return `${onlyNums.slice(0, 3)}.${onlyNums.slice(3, 6)}.${onlyNums.slice(6)}`;
    return `${onlyNums.slice(0, 3)}.${onlyNums.slice(3, 6)}.${onlyNums.slice(6, 9)}-${onlyNums.slice(9, 11)}`;
  };
  
  const formatCNPJ = (value: string) => {
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 2) return onlyNums;
    if (onlyNums.length <= 5) return `${onlyNums.slice(0, 2)}.${onlyNums.slice(2)}`;
    if (onlyNums.length <= 8) return `${onlyNums.slice(0, 2)}.${onlyNums.slice(2, 5)}.${onlyNums.slice(5)}`;
    if (onlyNums.length <= 12) return `${onlyNums.slice(0, 2)}.${onlyNums.slice(2, 5)}.${onlyNums.slice(5, 8)}/${onlyNums.slice(8)}`;
    return `${onlyNums.slice(0, 2)}.${onlyNums.slice(2, 5)}.${onlyNums.slice(5, 8)}/${onlyNums.slice(8, 12)}-${onlyNums.slice(12, 14)}`;
  };
  
  const formatCEP = (value: string) => {
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 5) return onlyNums;
    return `${onlyNums.slice(0, 5)}-${onlyNums.slice(5, 8)}`;
  };

  const formatPhone = (value: string) => {
    const onlyNums = value.replace(/[^\d]/g, '').slice(0, 11);
    if (onlyNums.length <= 2) return `(${onlyNums}`;
    if (onlyNums.length <= 7) return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2)}`;
    return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 7)}-${onlyNums.slice(7)}`;
  };

  const onSubmit = async (values: FormValues) => {
    startTransition(async () => {
        const { password, companyName, adminName, ...profileData } = values;
        const email = profileData['email-pj'];
    
        if (!email || !password || !companyName || !adminName) {
            toast({
                variant: 'destructive',
                title: 'Erro de Validação',
                description: 'Email da empresa, senha, razão social e nome do sócio são obrigatórios.',
            });
            return;
        }
    
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
    
          const clientRef = doc(firestore, 'clients', user.uid);
          
          const clientData = {
            ...profileData,
            companyName,
            adminName,
            'email-pj': email,
            _searchableName: companyName.toLowerCase(),
            _searchableAdminName: adminName.toLowerCase(),
            id: user.uid,
            type: 'Pessoa Jurídica',
            createdAt: serverTimestamp(),
          };
          
          await setDoc(clientRef, clientData);
          
          toast({
            title: 'Cadastro Realizado com Sucesso!',
            description: 'Sua empresa foi cadastrada. Você será redirecionado.',
          });
    
          router.push(`/boss/clients/${user.uid}`);
    
        } catch (error: any) {
          console.error("Erro no cadastro:", error);
          let description = 'Ocorreu um erro inesperado. Tente novamente.';
          if (error.code === 'auth/email-already-in-use') {
            description = 'Este endereço de e-mail já está em uso.';
          } else if (error.code === 'auth/weak-password') {
            description = 'A senha é muito fraca. Use pelo menos 6 caracteres.';
          }
          toast({
            variant: 'destructive',
            title: 'Falha no Cadastro',
            description,
          });
        }
    });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-muted/40 p-4 py-12">
        <Link href="/boss/service-desk">
            <Button className="absolute top-4 right-4">
                Voltar
            </Button>
        </Link>
        <div className="mx-auto w-full max-w-3xl space-y-6 px-4">
            <div className="grid gap-2 text-center">
                <div className="flex justify-center">
                    <Logo />
                </div>
                <h1 className="text-3xl font-bold">Cadastro de Pessoa Jurídica</h1>
                <p className="text-balance text-muted-foreground">
                    Forneça os dados da sua empresa para criar uma conta.
                </p>
            </div>

            <Card>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="pt-6">
                    <div className="space-y-6">
                        {/* DADOS DA EMPRESA */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-lg">Dados da Empresa</h3>
                            <div className="grid grid-cols-1 gap-y-4 gap-x-4 md:grid-cols-2">
                                <FormField control={form.control} name="companyName" render={({ field }) => (<FormItem className="md:col-span-1"><FormLabel>Nome Completo da Empresa</FormLabel><FormControl><Input placeholder="Razão Social" {...field} required /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="nomeFantasia" render={({ field }) => (<FormItem className="md:col-span-1"><FormLabel>Nome Fantasia</FormLabel><FormControl><Input placeholder="Nome Fantasia" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="cnpj" render={({ field }) => (<FormItem><FormLabel>CNPJ</FormLabel><FormControl><Input placeholder="00.000.000/0001-00" {...field} required onChange={(e) => field.onChange(formatCNPJ(e.target.value))}/></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="email-pj" render={({ field }) => (<FormItem><FormLabel>E-mail da Empresa</FormLabel><FormControl><Input type="email" placeholder="contato@empresa.com" {...field} required /></FormControl><FormMessage /></FormItem>)} />
                                
                                <div className="space-y-4 rounded-md border p-4 md:col-span-2">
                                    <Label className="font-medium">Endereço Sede da Empresa</Label>
                                    <div className="grid grid-cols-1 gap-y-4 gap-x-4 md:grid-cols-6">
                                        <FormField control={form.control} name="address-pj.street" render={({ field }) => (<FormItem className="md:col-span-4"><FormLabel>Rua</FormLabel><FormControl><Input {...field} required /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="address-pj.number" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Número</FormLabel><FormControl><Input {...field} required /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="address-pj.complement" render={({ field }) => (<FormItem className="md:col-span-3"><FormLabel>Complemento</FormLabel><FormControl><Input placeholder="Sala, Andar, etc." {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="address-pj.neighborhood" render={({ field }) => (<FormItem className="md:col-span-3"><FormLabel>Bairro</FormLabel><FormControl><Input {...field} required /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="address-pj.city" render={({ field }) => (<FormItem className="md:col-span-3"><FormLabel>Cidade</FormLabel><FormControl><Input {...field} required /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="address-pj.state" render={({ field }) => (<FormItem className="md:col-span-1"><FormLabel>Estado</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="UF" /></SelectTrigger></FormControl><SelectContent>{brazilianStates.map(state => (<SelectItem key={state.value} value={state.value}>{state.label}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="address-pj.zipCode" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>CEP</FormLabel><FormControl><Input {...field} required onChange={(e) => field.onChange(formatCEP(e.target.value))} maxLength={9}/></FormControl><FormMessage /></FormItem>)} />
                                    </div>
                                </div>
                                <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormLabel>Telefone da Empresa</FormLabel><FormControl><Input placeholder="(00) 0000-0000" {...field} onChange={(e) => field.onChange(formatPhone(e.target.value))} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="site" render={({ field }) => (<FormItem><FormLabel>Site</FormLabel><FormControl><Input placeholder="www.empresa.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="instagram" render={({ field }) => (<FormItem><FormLabel>Instagram</FormLabel><FormControl><Input placeholder="@empresa" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="tiktok" render={({ field }) => (<FormItem><FormLabel>TikTok</FormLabel><FormControl><Input placeholder="@empresa" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="facebook" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Facebook</FormLabel><FormControl><Input placeholder="facebook.com/empresa" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            </div>
                        </div>

                        {/* DADOS DO SÓCIO ADMINISTRADOR */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-lg">Dados do Sócio Administrador</h3>
                            <div className="grid grid-cols-1 gap-y-4 gap-x-4 md:grid-cols-2">
                                <FormField control={form.control} name="adminName" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Nome Completo do Sócio Administrador</FormLabel><FormControl><Input {...field} required /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="adminNationality" render={({ field }) => (<FormItem><FormLabel>Nacionalidade</FormLabel><FormControl><Input {...field} required /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="adminMaritalStatus" render={({ field }) => (<FormItem><FormLabel>Estado Civil</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger></FormControl><SelectContent><SelectItem value="solteiro">Solteiro(a)</SelectItem><SelectItem value="casado">Casado(a)</SelectItem><SelectItem value="divorciado">Divorciado(a)</SelectItem><SelectItem value="viuvo">Viuvo(a)</SelectItem><SelectItem value="uniao_estavel">União Estável</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="adminProfession" render={({ field }) => (<FormItem><FormLabel>Profissão</FormLabel><FormControl><Input {...field} required /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="adminEmail" render={({ field }) => (<FormItem><FormLabel>E-mail do Sócio</FormLabel><FormControl><Input type="email" {...field} required /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="adminRg" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>RG do Sócio</FormLabel>
                                        <div className="flex items-center gap-2">
                                        <FormControl><Input disabled={isAdminNewRg} {...field} required={!isAdminNewRg} /></FormControl>
                                        <div className="flex items-center space-x-2"><Checkbox checked={isAdminNewRg} onCheckedChange={setIsAdminNewRg} id="admin-rg-novo" /><Label htmlFor="admin-rg-novo" className="whitespace-nowrap">RG Novo</Label></div>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                               <FormField control={form.control} name="adminCpf" render={({ field }) => (<FormItem><FormLabel>CPF do Sócio</FormLabel><FormControl><Input {...field} placeholder="000.000.000-00" required onChange={(e) => field.onChange(formatCPF(e.target.value))} /></FormControl><FormMessage /></FormItem>)} />
                                <div className="space-y-4 rounded-md border p-4 md:col-span-2">
                                    <Label className="font-medium">Endereço Completo do Sócio Administrador</Label>
                                    <div className="grid grid-cols-1 gap-y-4 gap-x-4 md:grid-cols-6">
                                        <FormField control={form.control} name="adminAddress.street" render={({ field }) => (<FormItem className="md:col-span-4"><FormLabel>Rua</FormLabel><FormControl><Input {...field} required /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="adminAddress.number" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Número</FormLabel><FormControl><Input {...field} required /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="adminAddress.complement" render={({ field }) => (<FormItem className="md:col-span-3"><FormLabel>Complemento</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="adminAddress.neighborhood" render={({ field }) => (<FormItem className="md:col-span-3"><FormLabel>Bairro</FormLabel><FormControl><Input {...field} required /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="adminAddress.city" render={({ field }) => (<FormItem className="md:col-span-3"><FormLabel>Cidade</FormLabel><FormControl><Input {...field} required /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="adminAddress.state" render={({ field }) => (<FormItem className="md:col-span-1"><FormLabel>Estado</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="UF" /></SelectTrigger></FormControl><SelectContent>{brazilianStates.map(state => (<SelectItem key={state.value} value={state.value}>{state.label}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="adminAddress.zipCode" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>CEP</FormLabel><FormControl><Input {...field} required onChange={(e) => field.onChange(formatCEP(e.target.value))} maxLength={9} /></FormControl><FormMessage /></FormItem>)} />
                                    </div>
                                </div>
                               <FormField control={form.control} name="adminPhone" render={({ field }) => (<FormItem><FormLabel>Telefone de Contato (Sócio)</FormLabel><div className="flex items-center gap-2"><FormControl><Input {...field} placeholder="(00) 9 0000-0000" onChange={(e) => field.onChange(formatPhone(e.target.value))} /></FormControl><FormField control={form.control} name="adminWhatsapp" render={({ field: checkField }) => (<FormItem className="flex items-center space-x-2 space-y-0"><FormControl><Checkbox checked={checkField.value} onCheckedChange={checkField.onChange} /></FormControl><Label htmlFor="adminWhatsapp">WhatsApp</Label></FormItem>)} /></div><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="adminInstagram" render={({ field }) => (<FormItem><FormLabel>Instagram (Sócio)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="adminTiktok" render={({ field }) => (<FormItem><FormLabel>TikTok (Sócio)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="adminFacebook" render={({ field }) => (<FormItem><FormLabel>Facebook (Sócio)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="password" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Senha de Acesso</FormLabel><FormControl><Input type="password" {...field} required /></FormControl><FormMessage /></FormItem>)} />
                            </div>
                        </div>

                        {/* DADOS BANCÁRIOS */}
                        <div className="space-y-4">
                            <FormField control={form.control} name="addDadosBancarios" render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold text-lg">Deseja adicionar dados bancários do cliente?</FormLabel>
                                    <FormControl>
                                        <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-4">
                                            <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="sim" /></FormControl><FormLabel>Sim</FormLabel></FormItem>
                                            <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="nao" /></FormControl><FormLabel>Não</FormLabel></FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                </FormItem>
                            )} />

                            {addDadosBancarios === 'sim' && (
                                <div className="mt-6 space-y-6">
                                    <FormField control={form.control} name="tipoDadosBancarios" render={({ field }) => (
                                        <FormItem><FormLabel>Qual tipo de dado bancário deseja adicionar?</FormLabel>
                                            <FormControl>
                                                <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-4">
                                                    <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="pix" /></FormControl><FormLabel>Pix</FormLabel></FormItem>
                                                    <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="conta" /></FormControl><FormLabel>Conta Bancária</FormLabel></FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )} />

                                    {tipoDadosBancarios === 'pix' && (
                                        <div className="border rounded-md p-4 space-y-4">
                                            <FormField control={form.control} name="bankDetails.pixKey" render={({ field }) => (<FormItem><FormLabel>Chave PIX</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                            <FormField control={form.control} name="bankDetails.pixKeyType" render={({ field }) => (<FormItem><FormLabel>Tipo de Chave</FormLabel><Select onValueChange={field.onChange}><FormControl><SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger></FormControl><SelectContent><SelectItem value="cpf_cnpj">CPF/CNPJ</SelectItem><SelectItem value="email">E-mail</SelectItem><SelectItem value="celular">Celular</SelectItem><SelectItem value="aleatoria">Aleatória</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                                            <FormField control={form.control} name="bankDetails.bankName" render={({ field }) => (<FormItem><FormLabel>Banco</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                            <FormField control={form.control} name="bankDetails.accountHolderName" render={({ field }) => (<FormItem><FormLabel>Titular</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        </div>
                                    )}
                                    {tipoDadosBancarios === 'conta' && (
                                         <div className="border rounded-md p-4 space-y-4">
                                            <FormField control={form.control} name="bankDetails.bankName" render={({ field }) => (<FormItem><FormLabel>Banco</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                            <FormField control={form.control} name="bankDetails.agency" render={({ field }) => (<FormItem><FormLabel>Agência</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                            <FormField control={form.control} name="bankDetails.accountNumber" render={({ field }) => (<FormItem><FormLabel>Conta</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                            <FormField control={form.control} name="bankDetails.accountHolderName" render={({ field }) => (<FormItem><FormLabel>Titular</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                            <FormField control={form.control} name="bankDetails.accountType" render={({ field }) => (<FormItem><FormLabel>Tipo de Conta</FormLabel><Select onValueChange={field.onChange}><FormControl><SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger></FormControl><SelectContent><SelectItem value="corrente">Corrente</SelectItem><SelectItem value="poupanca">Poupança</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Criar Conta'}
                        </Button>
                    </div>
                </CardContent>
            </form>
            </Form>
            </Card>
        </div>
    </div>
  );
}
