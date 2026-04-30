'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Scale,
  ShieldCheck,
  Users,
  MessageCircle,
  FileText,
  Handshake,
  Scroll,
  Home,
  Gavel,
  BadgePercent,
  Linkedin,
  Building2,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

const subAreas = [
  {
    title: 'Responsabilidade Civil',
    icon: Gavel,
    href: '/infoprodutos/direito-civil/responsabilidade-civil',
    description: 'Reparação de danos morais e materiais.',
  },
  {
    title: 'Contratos',
    icon: FileText,
    href: '/infoprodutos/direito-civil/contratos',
    description: 'Elaboração, análise e revisão de contratos.',
  },
  {
    title: 'Direito das Obrigações',
    icon: Handshake,
    href: '/infoprodutos/direito-civil/obrigacoes',
    description: 'Análise de vínculos jurídicos, credores e devedores.',
  },
  {
    title: 'Direito de Família',
    icon: Users,
    href: '/infoprodutos/direito-civil/familia',
    description: 'Casamento, divórcio, guarda e pensão alimentícia.',
  },
  {
    title: 'Direito das Sucessões',
    icon: Scroll,
    href: '/infoprodutos/direito-civil/sucessoes',
    description: 'Inventários, testamentos e partilha de bens.',
  },
  {
    title: 'Direitos Reais',
    icon: Home,
    href: '/infoprodutos/direito-civil/reais',
    description: 'Questões de posse, propriedade e condomínio.',
  },
  {
    title: 'Indenizações por Danos Morais e Materiais',
    icon: BadgePercent,
    href: '/infoprodutos/direito-civil/indenizacoes',
    description: 'Busca por compensação financeira por prejuízos.',
  },
];

const WHATSAPP_LINK = "https://wa.me/5531988639056?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os%20em%20Direito%20Civil.";


export default function DireitoCivilPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const firestore = useFirestore();
  const pageRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'content_pages', 'direito-civil') : null),
    [firestore]
  );
  const { data: pageData, isLoading } = useDoc(pageRef);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate sending data to a server and saving it
    const newMessage = {
        id: `msg-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        receivedAt: new Date().toISOString(),
        source: 'LP Direito Civil',
        status: 'Não lido'
    };

    try {
        const existingMessages = JSON.parse(localStorage.getItem('receivedMessages') || '[]');
        const updatedMessages = [newMessage, ...existingMessages];
        localStorage.setItem('receivedMessages', JSON.stringify(updatedMessages));
    } catch (error) {
        console.error("Failed to save message to localStorage", error);
    }


    toast({
      title: "Mensagem enviada com sucesso!",
      description: "Agradecemos o seu contato. Retornaremos em breve.",
    });

    // Clear form
    setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
  };

  return (
    <div className="flex flex-col gap-12 md:gap-16">
      {/* 1. Seção de Abertura (Hero) */}
      <section className="text-center bg-card border rounded-lg p-8 md:p-12">
        <Scale className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          {isLoading ? <Loader2 className="mx-auto h-8 w-8 animate-spin" /> : pageData?.title || 'Direito Civil'}
        </h1>
        <p className="mt-4 text-muted-foreground md:text-lg max-w-3xl mx-auto">
          {isLoading ? 'Carregando...' : pageData?.subtitle || 'Carregando descrição...'}
        </p>
        <div className="mt-6 flex gap-4 justify-center">
            <a href="#contact">
                <Button size="lg">Fale Conosco</Button>
            </a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline">
                    <MessageCircle className="mr-2" />
                    WhatsApp
                </Button>
            </a>
        </div>
      </section>

      {/* 2. Seção - Dores do Público */}
      <section className="container mx-auto">
        <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold">Você se identifica com alguma destas situações?</h2>
            <p className="mt-2 text-muted-foreground">Problemas comuns que exigem uma orientação jurídica especializada.</p>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="text-center p-6">
                 <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    className="mx-auto h-16 w-16 text-destructive mb-0"
                    >
                    <defs>
                        <linearGradient id="personGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#AAB8C2' }} />
                        <stop offset="100%" style={{ stopColor: '#E1E8ED' }} />
                        </linearGradient>
                        <linearGradient id="docGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#6B7280' }} />
                        <stop offset="100%" style={{ stopColor: '#9CA3AF' }} />
                        </linearGradient>
                    </defs>
                    <circle cx="50" cy="38" r="12" fill="url(#personGradient)" stroke="#4A5568" strokeWidth="1.5" />
                    <path
                        d="M30 85 C 30 65, 70 65, 70 85 Z"
                        fill="url(#personGradient)"
                        stroke="#4A5568"
                        strokeWidth="1.5"
                    />
                    <path d="M42 45 Q50 48, 58 45" fill="none" stroke="#4A5568" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M42 32 Q45 28, 48 30" fill="none" stroke="#4A5568" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M58 32 Q55 28, 52 30" fill="none" stroke="#4A5568" strokeWidth="1.5" strokeLinecap="round" />
                    <g transform="translate(65, 45) rotate(15)">
                        <rect x="-15" y="-22" width="40" height="28" rx="3" fill="url(#docGradient)" stroke="#4A5568" strokeWidth="1.5" />
                        <path d="M-10 -15 H 20 M-10 -9 H 15 M-10 -3 H 20" stroke="#E1E8ED" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M5 2 L 15 -8" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M15 2 L 5 -8" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
                    </g>
                    <g fill="none" stroke="#6B7280" strokeWidth="1" strokeLinecap="round">
                        <path d="M28 30 L24 28" />
                        <path d="M25 40 L20 40" />
                        <path d="M28 50 L24 52" />
                    </g>
                </svg>
                <h3 className="font-semibold text-lg">Conflitos Contratuais</h3>
                <p className="text-muted-foreground text-sm mt-1">Cláusulas abusivas, quebra de contrato ou acordos que não foram cumpridos.</p>
            </Card>
            <Card className="text-center p-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    className="mx-auto h-16 w-16 text-destructive mb-0"
                    >
                    <defs>
                        <linearGradient id="personGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#AAB8C2' }} />
                        <stop offset="100%" style={{ stopColor: '#E1E8ED' }} />
                        </linearGradient>
                        <linearGradient id="docGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#6B7280' }} />
                        <stop offset="100%" style={{ stopColor: '#9CA3AF' }} />
                        </linearGradient>
                    </defs>

                    {/* Personagem */}
                    <circle cx="50" cy="38" r="12" fill="url(#personGradient)" stroke="#4A5568" strokeWidth="1.5" />
                    <path
                        d="M30 85 C 30 65, 70 65, 70 85 Z"
                        fill="url(#personGradient)"
                        stroke="#4A5568"
                        strokeWidth="1.5"
                    />

                    {/* Expressão de preocupação */}
                    <circle cx="45" cy="36" r="1.5" fill="#4A5568" />
                    <circle cx="55" cy="36" r="1.5" fill="#4A5568" />
                    <path d="M42 45 Q50 42, 58 45" fill="none" stroke="#4A5568" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M40 28 Q43 24, 48 26" fill="none" stroke="#4A5568" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M60 28 Q57 24, 52 26" fill="none" stroke="#4A5568" strokeWidth="1.5" strokeLinecap="round" />

                    {/* Cobrança flutuante */}
                    <g transform="translate(65, 45) rotate(15)">
                        <rect x="-15" y="-22" width="40" height="28" rx="3" fill="url(#docGradient)" stroke="#4A5568" strokeWidth="1.5" />
                        <path d="M-10 -15 H 20 M-10 -9 H 15 M-10 -3 H 20" stroke="#E1E8ED" strokeWidth="1.5" strokeLinecap="round"/>
                        <circle cx="5" cy="2" r="3" fill="#DC2626" />
                        <path d="M3.5 0.5 L 6.5 3.5 M6.5 0.5 L 3.5 3.5" stroke="white" strokeWidth="1" strokeLinecap="round" />
                        <text x="5" y="-12" textAnchor="middle" fontSize="5" fill="#E1E8ED" fontFamily="sans-serif" fontWeight="bold">$$</text>
                    </g>
                    
                    {/* Linhas de surpresa */}
                    <g fill="none" stroke="#6B7280" strokeWidth="1" strokeLinecap="round">
                        <path d="M28 30 L24 28" />
                        <path d="M25 40 L20 40" />
                        <path d="M28 50 L24 52" />
                    </g>
                </svg>
                <h3 className="font-semibold text-lg">Cobranças Indevidas</h3>
                <p className="text-muted-foreground text-sm mt-1">Dívidas inexistentes, valores incorretos ou assédio por empresas de cobrança.</p>
            </Card>
            <Card className="text-center p-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    className="mx-auto h-16 w-16 text-destructive mb-0">
                    <defs>
                        <linearGradient id="personGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#AAB8C2' }} />
                        <stop offset="100%" style={{ stopColor: '#E1E8ED' }} />
                        </linearGradient>
                    </defs>
                    
                    {/* Personagens */}
                    <g transform="translate(-10, 0)">
                        <circle cx="35" cy="30" r="8" fill="url(#personGradient2)" stroke="#4A5568" strokeWidth="1.5" />
                        <path d="M25 65 C 25 45, 45 45, 45 65 Z" fill="url(#personGradient2)" stroke="#4A5568" strokeWidth="1.5" />
                        <path d="M32 28 Q35 26, 38 28" fill="none" stroke="#4A5568" strokeWidth="1.5" strokeLinecap="round" />
                        <circle cx="32" cy="32" r="1" fill="#4A5568" />
                        <circle cx="38" cy="32" r="1" fill="#4A5568" />
                    </g>
                    <g transform="translate(10, 0)">
                        <circle cx="65" cy="30" r="8" fill="url(#personGradient2)" stroke="#4A5568" strokeWidth="1.5" />
                        <path d="M55 65 C 55 45, 75 45, 75 65 Z" fill="url(#personGradient2)" stroke="#4A5568" strokeWidth="1.5" />
                        <path d="M62 28 Q65 26, 68 28" fill="none" stroke="#4A5568" strokeWidth="1.5" strokeLinecap="round" />
                        <circle cx="62" cy="32" r="1" fill="#4A5568" />
                        <circle cx="68" cy="32" r="1" fill="#4A5568" />
                    </g>
                    
                    {/* Criança no meio */}
                    <g transform="translate(0, 15)">
                        <circle cx="50" cy="40" r="6" fill="url(#personGradient2)" stroke="#4A5568" strokeWidth="1.5" />
                        <path d="M44 65 C 44 55, 56 55, 56 65 Z" fill="url(#personGradient2)" stroke="#4A5568" strokeWidth="1.5" />
                        <path d="M48 42 Q50 44, 52 42" fill="none" stroke="#4A5568" strokeWidth="1" strokeLinecap="round" />
                    </g>

                    {/* Linha de separação */}
                    <path d="M50 5 L50 85" stroke="#DC2626" strokeWidth="2" strokeDasharray="4 2"/>

                    {/* Bens divididos */}
                    <g transform="translate(-25, 10)">
                        <path d="M30 80 L40 70 L50 80 L30 80 Z" fill="#AAB8C2" />
                        <rect x="35" y="80" width="5" height="10" fill="#6B7280" />
                    </g>
                     <g transform="translate(25, 10)">
                        <path d="M50 80 L60 70 L70 80 L50 80 Z" fill="#AAB8C2" />
                        <rect x="55" y="80" width="5" height="10" fill="#6B7280" />
                    </g>
                </svg>
                <h3 className="font-semibold text-lg">Disputas Familiares</h3>
                <p className="text-muted-foreground text-sm mt-1">Processos de divórcio, partilha de bens, guarda de filhos ou pensão alimentícia.</p>
            </Card>
            <Card className="text-center p-6">
                <Building2 className="mx-auto h-8 w-8 text-destructive mb-3" />
                <h3 className="font-semibold text-lg">Problemas com Imóveis</h3>
                <p className="text-muted-foreground text-sm mt-1">Questões de posse, propriedade, aluguel, condomínio ou usucapião.</p>
            </Card>
            <Card className="text-center p-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    className="mx-auto h-16 w-16 text-destructive mb-0">
                    <defs>
                        <linearGradient id="personGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#E1E8ED' }} />
                        <stop offset="100%" style={{ stopColor: '#AAB8C2' }} />
                        </linearGradient>
                        <linearGradient id="houseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#FBBF24' }} />
                        <stop offset="100%" style={{ stopColor: '#F59E0B' }} />
                        </linearGradient>
                    </defs>

                    {/* Personagem triste */}
                    <circle cx="30" cy="55" r="10" fill="url(#personGradient3)" stroke="#4A5568" strokeWidth="1.5" />
                    <path d="M20 90 C 20 70, 40 70, 40 90 Z" fill="url(#personGradient3)" stroke="#4A5568" strokeWidth="1.5" />
                    <circle cx="27" cy="54" r="1" fill="#4A5568" />
                    <circle cx="33" cy="54" r="1" fill="#4A5568" />
                    <path d="M28 60 Q30 63, 32 60" fill="none" stroke="#4A5568" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M20 50 Q18 45, 15 48" fill="none" stroke="#6B7280" strokeWidth="1" strokeLinecap="round" />

                    {/* Casa Rachada */}
                    <g transform="translate(15, 0)">
                        <path d="M50 30 L 90 50 L 90 80 L 50 80 Z" fill="url(#houseGradient)" stroke="#4A5568" strokeWidth="1.5" />
                        <path d="M50 30 L 70 20 L 90 30" fill="none" stroke="#4A5568" strokeWidth="1.5" />
                        <rect x="65" y="60" width="10" height="20" fill="#fff" stroke="#4A5568" strokeWidth="1.5" />
                        <path d="M55 40 L 85 70" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M75 25 L 60 55" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 2" />
                    </g>
                </svg>
                <h3 className="font-semibold text-lg">Danos Morais ou Materiais</h3>
                <p className="text-muted-foreground text-sm mt-1">Prejuízos causados por terceiros que precisam de reparação financeira.</p>
            </Card>
            <Card className="text-center p-6">
                 <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 100 100"
                    className="mx-auto h-16 w-16 text-destructive mb-0">
                    <defs>
                        <linearGradient id="personGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#AAB8C2' }} />
                        <stop offset="100%" style={{ stopColor: '#E1E8ED' }} />
                        </linearGradient>
                    </defs>
                    <circle cx="50" cy="35" r="10" fill="url(#personGradient4)" stroke="#4A5568" strokeWidth="1.5" />
                    <path d="M35 80 C 35 60, 65 60, 65 80 Z" fill="url(#personGradient4)" stroke="#4A5568" strokeWidth="1.5" />
                    <path d="M45 32 Q50 30, 55 32" fill="none" stroke="#4A5568" strokeWidth="1.5" strokeLinecap="round" />
                    
                    <text x="50" y="55" fontSize="20" textAnchor="middle" fill="#DC2626" fontWeight="bold">?</text>
                    <text x="30" y="30" fontSize="15" textAnchor="middle" fill="#6B7280" fontWeight="bold" transform="rotate(-15 30 30)">?</text>
                    <text x="70" y="35" fontSize="18" textAnchor="middle" fill="#6B7280" fontWeight="bold" transform="rotate(15 70 35)">?</text>
                    <text x="40" y="65" fontSize="12" textAnchor="middle" fill="#6B7280" fontWeight="bold">?</text>
                    <text x="65" y="60" fontSize="16" textAnchor="middle" fill="#6B7280" fontWeight="bold">?</text>
                </svg>
                <h3 className="font-semibold text-lg">Insegurança Jurídica</h3>
                <p className="text-muted-foreground text-sm mt-1">Medo de tomar decisões importantes sem o respaldo de um advogado.</p>
            </Card>
        </div>
      </section>

      {/* 3. Seção - Como Atuamos */}
      <section className="bg-card border-y">
        <div className="container mx-auto py-12 md:py-16 grid md:grid-cols-2 gap-8 items-center">
            <div>
                <ShieldCheck className="h-10 w-10 text-primary mb-4" />
                <h2 className="text-2xl md:text-3xl font-bold">{pageData?.body ? 'Nossa Atuação em Direito Civil' : 'Carregando...'}</h2>
                <div className="mt-4 text-muted-foreground space-y-4">
                    {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : <p className="text-justify">{pageData?.body || 'Conteúdo em breve...'}</p>}
                </div>
            </div>
             <div className="bg-muted p-6 rounded-lg border">
                <h3 className="font-bold text-xl mb-4">Nossos Diferenciais:</h3>
                <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span><strong>Atendimento Personalizado:</strong> Cada caso é único e tratado com a máxima atenção por nossa equipe.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <MessageCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span><strong>Comunicação Clara:</strong> Traduzimos o "juridiquês" para que você entenda cada passo do processo.</span>
                    </li>
                     <li className="flex items-start gap-3">
                        <Linkedin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span><strong>Visão Estratégica:</strong> Analisamos o cenário completo para oferecer a melhor estratégia para o seu caso.</span>
                    </li>
                </ul>
            </div>
        </div>
      </section>

       {/* 4. Seção - Benefícios */}
       <section className="container mx-auto">
            <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold">Os Benefícios de Ter uma Assessoria Especializada</h2>
                <p className="mt-2 text-muted-foreground">Mais do que resolver problemas, trazemos tranquilidade e segurança.</p>
            </div>
            <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
                 {[
                    { title: "Segurança Jurídica", description: "Tome decisões com a certeza de estar amparado pela lei." },
                    { title: "Redução de Riscos", description: "Evite prejuízos financeiros e dores de cabeça no futuro." },
                    { title: "Economia de Tempo", description: "Deixe a burocracia conosco e foque no que realmente importa." },
                    { title: "Orientação Estratégica", description: "Receba conselhos que vão além do óbvio para proteger seu patrimônio." },
                ].map(item => (
                    <div key={item.title} className="text-center">
                         <div className="mx-auto bg-primary text-primary-foreground rounded-full h-12 w-12 flex items-center justify-center mb-3">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
                    </div>
                ))}
            </div>
       </section>

      {/* 5. Seção - Subáreas */}
      <section className="container mx-auto">
         <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold">Explore Nossas Subáreas de Atuação em Direito Civil</h2>
            <p className="mt-2 text-muted-foreground">Clique para saber mais sobre cada especialidade.</p>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {subAreas.map((area) => (
            <Link href={area.href} key={area.title} className="block hover:shadow-lg transition-shadow rounded-lg">
              <Card className="h-full flex flex-col justify-between cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <area.icon className="h-6 w-6 text-primary" />
                    <span>{area.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{area.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Seção - CTA e Contato */}
      <section id="contact" className="bg-muted border-y">
        <div className="container mx-auto py-12 md:py-16 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                 <div>
                    <h2 className="text-2xl md:text-3xl font-bold">Pronto para dar o próximo passo?</h2>
                    <p className="mt-4 text-muted-foreground">
                        Entre em contato conosco para uma análise inicial do seu caso. Nossa equipe está pronta para ouvir você e oferecer a melhor orientação jurídica. Preencha o formulário ao lado ou, se preferir, clique no botão para falar conosco diretamente pelo WhatsApp.
                    </p>
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block">
                        <Button size="lg" variant="outline">
                            <MessageCircle className="mr-2" />
                            Fale conosco no WhatsApp
                        </Button>
                    </a>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Envie sua mensagem</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nome</Label>
                                <Input id="name" placeholder="Seu nome completo" value={formData.name} onChange={handleInputChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">E-mail</Label>
                                <Input id="email" type="email" placeholder="seu.email@exemplo.com" value={formData.email} onChange={handleInputChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Telefone de Contato</Label>
                                <Input id="phone" type="tel" placeholder="(00) 90000-0000" value={formData.phone} onChange={handleInputChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Mensagem</Label>
                                <Textarea id="message" placeholder="Descreva sua situação ou dúvida." value={formData.message} onChange={handleInputChange} required />
                            </div>
                            <Button type="submit" className="w-full">Enviar Contato</Button>
                        </form>
                    </CardContent>
                </Card>
        </div>
      </section>

    </div>
  );
}
