'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Rocket, Gem, HeartHandshake } from 'lucide-react';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

type HistoryContent = {
    history_text: string;
    mission_text: string;
    vision_text: string;
    values_text: string;
};

// Component for a content section to avoid repetition
const ContentSection = ({ icon: Icon, title, content, isLoading }: { icon: React.ElementType, title: string, content?: string, isLoading: boolean }) => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Icon className="h-6 w-6" />
                {title}
            </CardTitle>
        </CardHeader>
        <CardContent>
            {isLoading ? (
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>
            ) : (
                <p className="text-justify text-muted-foreground">{content || 'O conteúdo será adicionado aqui em breve.'}</p>
            )}
        </CardContent>
    </Card>
);


export default function HistoryPage() {
    const firestore = useFirestore();
    const pageRef = useMemoFirebase(() => (firestore ? doc(firestore, 'content_pages', 'history') : null), [firestore]);
    const { data: pageData, isLoading } = useDoc<HistoryContent>(pageRef);

  return (
    <div className="container py-8">
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight">Nossa Identidade</h1>
                <p className="text-muted-foreground">
                Conheça a trajetória, o propósito e os princípios que guiam a Giffoni Advogados Associados.
                </p>
            </div>
            
            <ContentSection
                icon={Building2}
                title="Nossa História (Trajetória)"
                isLoading={isLoading}
                content={pageData?.history_text}
            />

            <ContentSection
                icon={Rocket}
                title="Nossa Missão"
                isLoading={isLoading}
                content={pageData?.mission_text}
            />

            <ContentSection
                icon={Gem}
                title="Nossa Visão"
                isLoading={isLoading}
                content={pageData?.vision_text}
            />

            <ContentSection
                icon={HeartHandshake}
                title="Nossos Valores"
                isLoading={isLoading}
                content={pageData?.values_text}
            />
        </div>
    </div>
  );
}
