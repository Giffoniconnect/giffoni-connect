'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Landmark } from 'lucide-react';
import Link from 'next/link';

export default function DireitoPrevidenciarioINSSPage() {
  const pageId = 'direito-previdenciario-inss';
  const firestore = useFirestore();
  const pageRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'content_pages', pageId) : null),
    [firestore, pageId]
  );
  const { data: pageData, isLoading } = useDoc(pageRef);

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <section className="text-center">
          <Landmark className="mx-auto h-12 w-12 text-primary mb-4" />
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-3/4 mx-auto" />
              <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
            </div>
          ) : (
            <>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                {pageData?.title || 'Direito Previdenciário do INSS'}
              </h1>
              <p className="mt-4 text-muted-foreground md:text-lg max-w-3xl mx-auto">
                {pageData?.subtitle || 'Assessoria completa para aposentadorias, pensões e benefícios do INSS.'}
              </p>
            </>
          )}
        </section>
        
        <Card>
          <CardHeader>
            <CardTitle>Nossa Atuação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>
            ) : (
                <p className="text-justify text-muted-foreground">
                    {pageData?.body || 'O conteúdo detalhado sobre esta área será adicionado em breve através do editor do site.'}
                </p>
            )}
            <Link href="/about/areas">
              <Button variant="outline">Voltar para Áreas de Atuação</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
