'use client';

import { useParams, useRouter } from 'next/navigation';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

type ContentPage = {
    id: string;
    title: string;
    subtitle: string;
    body: string;
};

export default function EditPageContent() {
    const router = useRouter();
    const params = useParams();
    const pageId = params.pageId as string;
    const firestore = useFirestore();
    const { toast } = useToast();

    const pageRef = useMemoFirebase(() => (firestore && pageId ? doc(firestore, 'content_pages', pageId) : null), [firestore, pageId]);
    const { data: pageData, isLoading: isLoadingData } = useDoc<ContentPage>(pageRef);
    
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [body, setBody] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (pageData) {
            setTitle(pageData.title);
            setSubtitle(pageData.subtitle);
            setBody(pageData.body);
        } else if (!isLoadingData && pageId) {
            // Pre-populate with some default text if document doesn't exist
            setTitle(`Título para ${pageId.replace(/-/g, ' ')}`);
            setSubtitle(`Subtítulo para a página de ${pageId.replace(/-/g, ' ')}.`);
            setBody('O conteúdo detalhado sobre esta área será adicionado aqui em breve.');
        }
    }, [pageData, isLoadingData, pageId]);

    const handleSave = async () => {
        if (!pageRef) return;
        setIsSaving(true);
        try {
            await setDoc(pageRef, {
                id: pageId,
                title,
                subtitle,
                body,
                lastUpdated: serverTimestamp()
            }, { merge: true });

            toast({
                title: 'Sucesso!',
                description: 'O conteúdo da página foi salvo.',
            });
        } catch (error) {
            console.error("Error saving content: ", error);
            toast({
                variant: 'destructive',
                title: 'Erro ao Salvar',
                description: 'Não foi possível salvar o conteúdo da página.',
            });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Editar Conteúdo da Página</h1>
                    <p className="text-muted-foreground">
                        Modifique os textos para a página: <span className="font-semibold text-primary">{pageId}</span>
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Editor de Conteúdo</CardTitle>
                    <CardDescription>
                        Faça as alterações nos campos abaixo e clique em "Salvar" para publicar no site.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoadingData ? (
                        <div className="space-y-4">
                            <Skeleton className="h-8 w-1/4" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-8 w-1/4" />
                            <Skeleton className="h-10 w-full" />
                             <Skeleton className="h-8 w-1/4" />
                            <Skeleton className="h-24 w-full" />
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="page-title">Título Principal</Label>
                                <Input id="page-title" value={title} onChange={(e) => setTitle(e.target.value)} disabled={isSaving} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="page-subtitle">Subtítulo (Descrição Curta)</Label>
                                <Input id="page-subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} disabled={isSaving} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="page-body">Corpo do Texto</Label>
                                <Textarea id="page-body" value={body} onChange={(e) => setBody(e.target.value)} disabled={isSaving} className="min-h-[200px]" />
                            </div>
                            <div className="flex justify-end">
                                <Button onClick={handleSave} disabled={isSaving}>
                                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    <Save className="mr-2 h-4 w-4" />
                                    Salvar Conteúdo
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
