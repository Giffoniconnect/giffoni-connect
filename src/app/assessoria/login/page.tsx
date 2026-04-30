'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function AssessoriaLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement actual login logic
    console.log('Logging in for Giffoni Assessoria...');
    router.push('/assessoria/dashboard');
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-muted/40 p-4">
        <Link href="/" className="absolute top-4 right-4">
            <Button>Voltar</Button>
        </Link>
        <div className="mx-auto grid w-[380px] gap-6">
          <div className="grid gap-2 text-center">
            <Logo className="mx-auto mb-4" />
            <h1 className="text-3xl font-bold">Giffoni Assessoria Jurídica</h1>
            <p className="text-balance text-muted-foreground">
              Acesso para clientes de assessoria jurídica.
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="cliente.assessoria@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} required/>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Entrar'}
                </Button>
              </form>
            </CardContent>
          </Card>
           <div className="mt-4 text-center text-sm">
            &copy; {new Date().getFullYear()} Giffoni Advogados Associados
          </div>
        </div>
      </div>
  );
}
