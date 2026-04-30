'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/firebase';
import { sendPasswordResetEmail, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2, ArrowLeft, Phone, MessageSquare, Eye, EyeOff } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
        <path d="M16.75 13.96c.25.13.43.2.5.33.07.13.07.75-.18 1.48-.24.72-1.55 1.44-2.83 1.6-1.28.15-2.92-.1-4.73-1.05-1.8-.95-3.3-2.4-4.38-4.2-.95-1.63-1.05-3.3-.8-4.5.25-1.23.9-2.3 1.48-2.83.13-.08.28-.13.43-.13.15 0 .3.03.43.07.25.1.58.28.83.5.25.2.42.48.5.75.07.28.07.68-.18 1.1-.25.42-.58.8-1 1.15l-.2.13c-.15.1-0.2,0.25-0.13,0.43.33,0.75,1.05,1.72,2.1,2.78 1.05,1.05,2.03,1.78,2.78,2.1.18.07.33,0,.43-.13l.2-.2c.34-.43.72-.75 1.12-1 .42-.25.82-.25 1.1-.18.28.08.55.25.75.5.25.25.43.58.5.83.13.25.13.43.07.58z" />
    </svg>
);


export default function ClientLoginPage() {
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('clienteteste@gmail.com');
  const [password, setPassword] = useState('123456');
  const [isLoading, setIsLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [contactForm, setContactForm] = useState({ name: '', phone: '', message: ''});
  const [isSending, setIsSending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const heroImage = PlaceHolderImages.find(p => p.id === 'login-hero');
  const whatsappMessage = encodeURIComponent('Desejo me tornar cliente da Giffoni Advogados Associados, e ainda não possuo cadastro no Portal do cliente, gostaria de agendar o meu primeiro atendimento.');
  const whatsappLink = `https://wa.me/5531988639056?text=${whatsappMessage}`;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error: any) {
      if (
        error.code === 'auth/invalid-credential' &&
        email === 'clienteteste@gmail.com'
      ) {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          router.push('/dashboard');
        } catch (creationError: any) {
          console.error('Test user creation failed:', creationError);
          toast({
            variant: 'destructive',
            title: 'Falha na Criação do Usuário de Teste',
            description: 'Não foi possível criar o usuário de teste para desenvolvimento.',
          });
          setIsLoading(false);
        }
      } else {
        console.error('Login failed:', error);
        toast({
          variant: 'destructive',
          title: 'Falha no Login',
          description: 'Credenciais inválidas. Verifique o e-mail/CPF e a senha.',
        });
        setIsLoading(false);
      }
    }
  };
  
  const handlePasswordReset = async () => {
    if (!resetEmail) {
      toast({
        variant: 'destructive',
        title: 'Campo obrigatório',
        description: 'Por favor, insira seu e-mail para redefinir a senha.',
      });
      return;
    }
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast({
        title: 'E-mail enviado!',
        description: `Um e-mail de recuperação foi enviado para ${resetEmail}. Verifique sua caixa de entrada.`,
      });
    } catch (error: any) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Falha ao enviar e-mail',
        description: 'Não foi possível enviar o e-mail de redefinição. Verifique o endereço e tente novamente.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone || !contactForm.message) {
        toast({ variant: 'destructive', title: 'Campos Obrigatórios', description: 'Por favor, preencha todos os campos do formulário.' });
        return;
    }
    setIsSending(true);

    const newMessage = {
        id: `msg-${Date.now()}`,
        name: contactForm.name,
        email: 'N/A (Formulário de Contato)',
        phone: contactForm.phone,
        message: contactForm.message,
        receivedAt: new Date().toISOString(),
        source: 'LP Giffoni Connect',
        status: 'Não lido'
    };

    setTimeout(() => {
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
        setContactForm({ name: '', phone: '', message: '' });
        setIsSending(false);
    }, 1000);
  }


  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
       <Button onClick={() => router.back()} className="absolute top-4 right-4 z-10">
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
       </Button>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[380px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Portal do Cliente da Giffoni Advogados Associados</h1>
            <p className="text-balance text-muted-foreground text-justify">
              A Giffoni Advogados Associados, visando manter seu padrão de excelência, qualidade e eficiência no atendimento de seus clientes, disponibiliza um portal personalizado para que você possa acompanhar seus casos de forma transparente e segura.
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email-cpf">Email/CPF</Label>
                  <Input
                    id="email-cpf"
                    type="text"
                    placeholder="Digite seu email ou CPF"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground hover:bg-transparent"
                        onClick={() => setShowPassword((prev) => !prev)}
                        disabled={isLoading}
                    >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">{showPassword ? 'Ocultar senha' : 'Mostrar senha'}</span>
                    </Button>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <button type="button" className="inline-block text-sm underline text-right" disabled={isLoading}>
                            Esqueci minha senha
                        </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Redefinir senha</AlertDialogTitle>
                        <AlertDialogDescription className='text-justify'>
                          Para recuperar seu acesso, por favor, informe o e-mail que você utilizou durante o cadastro em nossa plataforma. Um link para redefinição de senha será enviado para este endereço.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="grid gap-2">
                        <Label htmlFor="reset-email">E-mail de cadastro</Label>
                        <Input
                          id="reset-email"
                          type="email"
                          placeholder="seu.email.cadastrado@exemplo.com"
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                        />
                      </div>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handlePasswordReset}>Enviar E-mail de Recuperação</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Login'}
                </Button>
              </form>
            </CardContent>
          </Card>
           <div className="mt-4 text-center text-sm border-t pt-6">
            <h3 className="font-semibold text-base mb-2">Ainda não é nosso cliente?</h3>
            <p className="text-muted-foreground mb-4 text-justify">A Giffoni Advogados Associados terá imenso prazer em tê-lo como cliente. Agende uma reunião conosco ou nos envie uma mensagem.</p>
            <div className='flex flex-col gap-2'>
                <Button asChild className="bg-[#25D366] hover:bg-[#25D366]/90 text-white">
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                        <WhatsAppIcon className="h-5 w-5 mr-2" />
                        Agendar via WhatsApp
                    </a>
                </Button>
                <Button variant="outline" asChild>
                    <a href="tel:+5531988639056">
                        <Phone className="mr-2 h-4 w-4" />
                        Ligar para: (31) 98863-9056
                    </a>
                </Button>
                <Card className="mt-2 text-left">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Envie-nos 1 Mensagem
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="contact-name">Nome Completo</Label>
                            <Input id="contact-name" value={contactForm.name} onChange={(e) => setContactForm({...contactForm, name: e.target.value})} required disabled={isSending}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contact-phone">Telefone de Contato</Label>
                            <Input id="contact-phone" value={contactForm.phone} onChange={(e) => setContactForm({...contactForm, phone: e.target.value})} required disabled={isSending}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contact-message">Breve descritivo da mensagem</Label>
                            <Textarea id="contact-message" value={contactForm.message} onChange={(e) => setContactForm({...contactForm, message: e.target.value})} required disabled={isSending}/>
                        </div>
                        <Button type="submit" className="w-full" disabled={isSending}>
                            {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Enviar Mensagem'}
                        </Button>
                    </form>
                  </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        {heroImage && 
            <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            data-ai-hint={heroImage.imageHint}
            />
        }
      </div>
    </div>
  );
}
