'use client';

import { useState, useTransition } from 'react';
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
import Link from 'next/link';
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
    fullName: z.string().min(3, "Nome é obrigatório.").optional(),
    nationality: z.string().min(3, "Nacionalidade é obrigatória.").optional(),
    profession: z.string().min(3, "Profissão é obrigatória.").optional(),
    birthDate: z.string().optional(),
    rg: z.string().optional(),
    isNewRg: z.boolean().default(false),
    cpf: z.string().min(14, "CPF é obrigatório e deve ter 11 dígitos.").max(14, "CPF inválido.").optional(),
    maritalStatus: z.string().nonempty("Estado civil é obrigatório.").optional(),

    address: z.object({
        street: z.string().min(3, "Rua é obrigatória.").optional(),
        number: z.string().min(1, "Número é obrigatório.").optional(),
        complement: z.string().optional(),
        neighborhood: z.string().min(3, "Bairro é obrigatório.").optional(),
        zipCode: z.string().min(9, "CEP é obrigatório e deve ter 8 dígitos.").optional(),
        city: z.string().min(3, "Cidade é obrigatória.").optional(),
        state: z.string().min(2, "Estado é obrigatório.").optional(),
    }).optional(),

    phone: phoneValidation,
    noPhone: z.boolean().optional(),
    hasWhatsapp: z.boolean().optional(),

    email: z.string().email("E-mail inválido.").optional().or(z.literal('')),
    noEmail: z.boolean().optional(),
    instagram: z.string().optional(),
    noInstagram: z.boolean().optional(),
    facebook: z.string().optional(),
    noFacebook: z.boolean().optional(),
    tiktok: z.string().optional(),
    noTiktok: z.boolean().optional(),
    password: z.string().optional(),

    wantsBankDetails: z.enum(['sim', 'nao']),
    bankDetails: z.object({
        type: z.enum(['pix', 'conta']).optional(),
        pixKeyType: z.string().optional(),
        pixKey: z.string().optional(),
        bankName: z.string().optional(),
        agency: z.string().optional(),
        accountNumber: z.string().optional(),
        accountType: z.string().optional(),
        accountHolderName: z.string().optional(),
    }).optional(),
}).refine(data => !data.noPhone ? !!data.phone : true, {
    message: "Telefone é obrigatório se 'Não possuo' não estiver marcado.",
    path: ["phone"],
}).refine(data => {
    if (data.isNewRg) return true; // if checkbox is checked, rg is not required
    return data.rg && data.rg.length >= 5; // if not checked, rg is required
}, {
    message: "RG é obrigatório.",
    path: ["rg"],
});

export default function SignupPfPage() {
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        fullName: '',
        nationality: 'Brasileiro(a)',
        profession: '',
        birthDate: '',
        rg: '',
        isNewRg: false,
        cpf: '',
        maritalStatus: '',
        address: {
            street: '',
            number: '',
            complement: '',
            neighborhood: '',
            zipCode: '',
            city: '',
            state: '',
        },
        phone: '',
        noPhone: false,
        hasWhatsapp: false,
        email: '',
        noEmail: false,
        instagram: '',
        noInstagram: false,
        facebook: '',
        noFacebook: false,
        tiktok: '',
        noTiktok: false,
        wantsBankDetails: 'nao',
        bankDetails: {
            type: 'pix',
            pixKey: '',
            pixKeyType: '',
            bankName: '',
            agency: '',
            accountNumber: '',
            accountType: 'Corrente',
            accountHolderName: '',
        },
    },
  });

  const wantsBankDetails = form.watch('wantsBankDetails');
  const bankDetailsType = form.watch('bankDetails.type');
  const isNewRg = form.watch('isNewRg');
  
  const formatCPF = (value: string) => {
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 3) return onlyNums;
    if (onlyNums.length <= 6) return `${onlyNums.slice(0, 3)}.${onlyNums.slice(3)}`;
    if (onlyNums.length <= 9) return `${onlyNums.slice(0, 3)}.${onlyNums.slice(3, 6)}.${onlyNums.slice(6)}`;
    return `${onlyNums.slice(0, 3)}.${onlyNums.slice(3, 6)}.${onlyNums.slice(6, 9)}-${onlyNums.slice(9, 11)}`;
  };

  const formatBirthDate = (value: string) => {
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 2) return onlyNums;
    if (onlyNums.length <= 4) return `${onlyNums.slice(0, 2)}/${onlyNums.slice(2)}`;
    return `${onlyNums.slice(0, 2)}/${onlyNums.slice(2, 4)}/${onlyNums.slice(4, 8)}`;
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
        const { email, password, fullName, ...profileData } = values;
  
        if (!fullName) {
          toast({
            variant: 'destructive',
            title: 'Erro de Validação',
            description: 'Nome completo é obrigatório.',
          });
          return;
        }
      
        try {
          let user;
          if (email && password) {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            user = userCredential.user;
          }
      
          const newClientId = user ? user.uid : doc(collection(firestore, 'clients')).id;
          const clientRef = doc(firestore, 'clients', newClientId);
      
          const clientData = {
            ...profileData,
            fullName,
            email: email || '',
            _searchableName: fullName.toLowerCase(),
            id: newClientId,
            type: 'Pessoa Física',
            createdAt: serverTimestamp(),
          };
      
          await setDoc(clientRef, clientData);
      
          toast({
            title: 'Cadastro Realizado com Sucesso!',
            description: `${clientData.fullName} foi cadastrado.`,
          });
      
          router.push(`/boss/clients/${newClientId}`);
      
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
                <h1 className="text-3xl font-bold">Cadastro de Pessoa Física</h1>
                <p className="text-balance text-muted-foreground">
                    Forneça os dados para criar um novo registro de cliente.
                </p>
            </div>

            <Card>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="pt-6">
                <div className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg">Dados da Pessoa Física</h3>
                        <div className="grid grid-cols-1 gap-y-4 gap-x-4 md:grid-cols-2">
                            <FormField control={form.control} name="fullName" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Nome Completo da Pessoa Física</FormLabel><FormControl><Input {...field} required /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="nationality" render={({ field }) => (<FormItem><FormLabel>Nacionalidade da Pessoa Física</FormLabel><FormControl><Input {...field} required /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="maritalStatus" render={({ field }) => (<FormItem><FormLabel>Estado Civil da Pessoa Física</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger></FormControl><SelectContent><SelectItem value="solteiro">Solteiro(a)</SelectItem><SelectItem value="casado">Casado(a)</SelectItem><SelectItem value="divorciado">Divorciado(a)</SelectItem><SelectItem value="viuvo">Viuvo(a)</SelectItem><SelectItem value="uniao_estavel">União Estável</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="profession" render={({ field }) => (<FormItem><FormLabel>Profissão</FormLabel><FormControl><Input {...field} required /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="birthDate" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Data de Nascimento</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="DD/MM/AAAA"
                                            onChange={(e) => field.onChange(formatBirthDate(e.target.value))}
                                            maxLength={10}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="rg" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>RG da Pessoa Física</FormLabel>
                                    <div className="flex items-center gap-4">
                                    <FormControl><Input {...field} disabled={isNewRg} required={!isNewRg} /></FormControl>
                                        <FormField control={form.control} name="isNewRg" render={({ field: checkField }) => (
                                            <FormItem className="flex items-center gap-2 space-y-0">
                                                <FormControl>
                                                    <Checkbox checked={checkField.value} onCheckedChange={(checked) => {
                                                        const isChecked = !!checked;
                                                        checkField.onChange(isChecked);
                                                        if (isChecked) form.setValue('rg', '');
                                                    }} />
                                                </FormControl>
                                                <FormLabel className="whitespace-nowrap">RG Novo</FormLabel>
                                            </FormItem>
                                        )} />
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="cpf" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CPF da Pessoa Física</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="000.000.000-00" required onChange={(e) => field.onChange(formatCPF(e.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                    </div>

                    <div className="space-y-4 rounded-md border p-4">
                        <Label className="font-medium">Endereço Completo</Label>
                        <div className="grid grid-cols-1 gap-y-4 gap-x-4 md:grid-cols-6">
                            <FormField control={form.control} name="address.street" render={({ field }) => (<FormItem className="md:col-span-4"><FormLabel>Rua</FormLabel><FormControl><Input {...field} required /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="address.number" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>nº (s/n)</FormLabel><FormControl><Input {...field} required /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="address.complement" render={({ field }) => (<FormItem className="md:col-span-3"><FormLabel>Complemento</FormLabel><FormControl><Input placeholder="Apto, Bloco, etc." {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="address.neighborhood" render={({ field }) => (<FormItem className="md:col-span-3"><FormLabel>Bairro</FormLabel><FormControl><Input {...field} required /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="address.city" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Cidade</FormLabel><FormControl><Input {...field} required /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="address.state" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Estado</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="UF" /></SelectTrigger></FormControl><SelectContent>{brazilianStates.map(state => (<SelectItem key={state.value} value={state.value}>{state.label}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="address.zipCode" render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel>CEP</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            required
                                            onChange={(e) => field.onChange(formatCEP(e.target.value))}
                                            maxLength={9}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg">Contato e Redes Sociais</h3>
                        <div className="grid grid-cols-1 gap-y-4 gap-x-4 md:grid-cols-2">
                             <FormField control={form.control} name="phone" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Telefone de contato (possui What’s app)</FormLabel>
                                    <div className="flex items-center gap-4">
                                        <FormControl><Input {...field} placeholder="(00) 90000-0000" disabled={form.watch('noPhone')} onChange={(e) => field.onChange(formatPhone(e.target.value))} /></FormControl>
                                        <FormField control={form.control} name="noPhone" render={({ field: checkField }) => (<FormItem className="flex items-center gap-2 space-y-0"><FormControl><Checkbox checked={checkField.value} onCheckedChange={checkField.onChange} /></FormControl><FormLabel>Não possuo</FormLabel></FormItem>)} />
                                        <FormField control={form.control} name="hasWhatsapp" render={({ field: checkField }) => (<FormItem className="flex items-center gap-2 space-y-0"><FormControl><Checkbox checked={checkField.value} onCheckedChange={checkField.onChange} /></FormControl><FormLabel>Sim</FormLabel></FormItem>)} />
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="email" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <div className="flex items-center gap-4">
                                        <FormControl><Input type="email" {...field} disabled={form.watch('noEmail')} /></FormControl>
                                        <FormField control={form.control} name="noEmail" render={({ field: checkField }) => (<FormItem className="flex items-center gap-2 space-y-0"><FormControl><Checkbox checked={checkField.value} onCheckedChange={checkField.onChange} /></FormControl><FormLabel>Não possuo</FormLabel></FormItem>)} />
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="instagram" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Instagram</FormLabel>
                                    <div className="flex items-center gap-4">
                                        <FormControl><Input placeholder="@seuusuario" {...field} disabled={form.watch('noInstagram')} /></FormControl>
                                        <FormField control={form.control} name="noInstagram" render={({ field: checkField }) => (<FormItem className="flex items-center gap-2 space-y-0"><FormControl><Checkbox checked={checkField.value} onCheckedChange={checkField.onChange} /></FormControl><FormLabel>Não possuo</FormLabel></FormItem>)} />
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="tiktok" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>TikTok</FormLabel>
                                    <div className="flex items-center gap-4">
                                        <FormControl><Input placeholder="@seuusuario" {...field} disabled={form.watch('noTiktok')} /></FormControl>
                                        <FormField control={form.control} name="noTiktok" render={({ field: checkField }) => (<FormItem className="flex items-center gap-2 space-y-0"><FormControl><Checkbox checked={checkField.value} onCheckedChange={checkField.onChange} /></FormControl><FormLabel>Não possuo</FormLabel></FormItem>)} />
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="facebook" render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel>Facebook</FormLabel>
                                    <div className="flex items-center gap-4">
                                        <FormControl><Input placeholder="facebook.com/seu.usuario" {...field} disabled={form.watch('noFacebook')} /></FormControl>
                                        <FormField control={form.control} name="noFacebook" render={({ field: checkField }) => (<FormItem className="flex items-center gap-2 space-y-0"><FormControl><Checkbox checked={checkField.value} onCheckedChange={checkField.onChange} /></FormControl><FormLabel>Não possuo</FormLabel></FormItem>)} />
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <FormField control={form.control} name="wantsBankDetails" render={({ field }) => (
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

                        {wantsBankDetails === 'sim' && (
                            <div className="space-y-4 p-4 border rounded-md">
                                <h3 className="font-medium">Dados Bancários</h3>
                                <FormField control={form.control} name="bankDetails.type" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tipo de Informação</FormLabel>
                                        <FormControl>
                                            <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-4">
                                                <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="pix" /></FormControl><FormLabel>Pix</FormLabel></FormItem>
                                                <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="conta" /></FormControl><FormLabel>Conta Bancária</FormLabel></FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                    </FormItem>
                                )} />
                                {bankDetailsType === 'pix' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField control={form.control} name="bankDetails.pixKeyType" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Tipo de Chave</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl><SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger></FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="cpf">CPF</SelectItem>
                                                        <SelectItem value="email">E-mail</SelectItem>
                                                        <SelectItem value="celular">Celular</SelectItem>
                                                        <SelectItem value="aleatoria">Aleatória</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="bankDetails.pixKey" render={({ field }) => (<FormItem><FormLabel>Chave Pix</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    </div>
                                )}
                                {bankDetailsType === 'conta' && (
                                    <div className="space-y-4">
                                        <FormField control={form.control} name="bankDetails.bankName" render={({ field }) => (<FormItem><FormLabel>Banco</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <FormField control={form.control} name="bankDetails.agency" render={({ field }) => (<FormItem><FormLabel>Agência</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                            <FormField control={form.control} name="bankDetails.accountNumber" render={({ field }) => (<FormItem><FormLabel>Conta</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        </div>
                                        <FormField control={form.control} name="bankDetails.accountType" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Tipo de Conta</FormLabel>
                                                <FormControl>
                                                    <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-4">
                                                        <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="corrente" /></FormControl><FormLabel>Corrente</FormLabel></FormItem>
                                                        <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="poupanca" /></FormControl><FormLabel>Poupança</FormLabel></FormItem>
                                                        <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="salario" /></FormControl><FormLabel>Salário</FormLabel></FormItem>
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </div>
                                )}
                                 <FormField control={form.control} name="bankDetails.accountHolderName" render={({ field }) => (<FormItem><FormLabel>Nome do Titular</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            </div>
                        )}
                    </div>
                    
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg">Dados de Acesso (Opcional)</h3>
                        <p className="text-sm text-muted-foreground">Preencha apenas se desejar criar um acesso ao Portal do Cliente agora.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={form.control} name="password" render={({ field }) => (<FormItem><FormLabel>Senha de Acesso</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        </div>
                    </div>


                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Salvar Cadastro'}
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
