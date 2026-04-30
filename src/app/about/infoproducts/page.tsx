'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { iconMap, IconName } from '@/lib/icon-map';
import { useMemo } from 'react';

type Infoproduct = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: IconName;
};

export default function InfoproductsPage() {
  const firestore = useFirestore();

  const infoproductsRef = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'infoproducts'), orderBy('title', 'asc')) : null),
    [firestore]
  );
  const { data: infoproducts, isLoading } = useCollection<Infoproduct>(infoproductsRef);

  const IconComponent = ({ iconName }: { iconName: IconName }) => {
    const Icon = useMemo(() => iconMap[iconName] || null, [iconName]);
    if (!Icon) return null;
    return <Icon className="h-6 w-6 text-primary" />;
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Infoprodutos Jurídicos</h1>
          <p className="text-muted-foreground">
            Soluções jurídicas digitais, práticas e acessíveis.
          </p>
        </div>
        
        {isLoading ? (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        ) : infoproducts && infoproducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {infoproducts.filter(p => p.id !== '--metadata--').map((product) => (
                <Link href={product.href} key={product.id} className="block hover:shadow-lg transition-shadow rounded-lg">
                <Card className="h-full flex flex-col justify-between cursor-pointer">
                    <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <IconComponent iconName={product.icon} />
                        <span>{product.title}</span>
                    </CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                    </CardContent>
                </Card>
                </Link>
            ))}
            </div>
        ) : (
            <Card>
                <CardContent className="p-8">
                    <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center rounded-lg border-2 border-dashed">
                        <p className="text-muted-foreground">
                            Nossos infoprodutos serão lançados aqui em breve.
                        </p>
                    </div>
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}
