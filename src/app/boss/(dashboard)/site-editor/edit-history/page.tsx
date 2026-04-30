'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

type HistoryContent = {
    history_text: string;
    mission_text: string;
    vision_text: string;
    values_text: string;
};

const defaultContent = {
    history_text: `Fundada em 2010 por Rodrigo Giffoni Rodrigues, a Giffoni Advogados Associados nasceu com o propósito de oferecer uma advocacia que une técnica, ética e um compromisso inabalável com os resultados de seus clientes.
Com uma formação multidisciplinar, Rodrigo Giffoni é graduado em Direito pela UNIVIÇOSA e em Administração de Empresas pela Universidade Federal de Viçosa (UFV), além de possuir especialização em Direito Civil Aplicado pela Pontifícia Universidade Católica (PUC). Essa dupla visão, jurídica e administrativa, é um dos pilares do nosso escritório.
Sua trajetória profissional foi marcada por relevantes funções públicas e institucionais, tendo atuado como Procurador do Município de Teixeiras, membro da Comissão de Prerrogativas da OAB e Conselheiro da OAB – Subseção Viçosa. Essas experiências consolidaram um profundo compromisso com a defesa das garantias legais, da ética profissional e do amplo acesso à Justiça.
Desde sua fundação, o escritório se destaca por aliar sólido conhecimento jurídico, visão estratégica, organização e um atendimento humanizado. Acreditamos que a advocacia vai além da resolução de conflitos: é um instrumento de transformação social, segurança jurídica e desenvolvimento, pautando cada ação na verdade, transparência, compromisso e eficiência.`,
    mission_text: 'A missão da Giffoni Advogados Associados é utilizar o Direito para promoção de um mundo melhor e mais Justo.',
    vision_text: 'Ser referência nacional em advocacia estratégica, reconhecida pela excelência técnica, ética profissional e impacto positivo na vida das pessoas.',
    values_text: 'O conteúdo sobre os princípios que nos guiam será adicionado aqui em breve.',
};

export default function EditHistoryPage() {
    const router = useRouter();
    const { toast } = useToast();
    const firestore = useFirestore();
    const pageRef = useMemoFirebase(() => (firestore ? doc(firestore, 'content_pages', 'history') : null), [firestore]);
    const { data: pageData, isLoading: isLoadingData } = useDoc<HistoryContent>(pageRef);

    const [content, setContent] = useState<HistoryContent>(defaultContent);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (pageData) {
            setContent(pageData);
        } else if (!isLoadingData) {
            // If doc doesn't exist, pre-fill with default values from the original page
            setContent(defaultContent);
        }
    }, [pageData, isLoadingData]);
    
    const handleSave = async () => {
        if (!pageRef) return;
        setIsSaving(true);
        try {
            await setDoc(pageRef, { ...content, lastUpdated: serverTimestamp() }, { merge: true });
            toast({ title: 'Sucesso!', description: 'O conteúdo da página foi salvo.' });
        } catch (error) {
            console.error("Error saving content: ", error);
            toast({ variant: 'destructive', title: 'Erro ao Salvar', description: 'Não foi possível salvar o conteúdo.' });
        } finally {
            setIsSaving(false);
        }
    };

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setContent(prev => ({ ...prev, [id]: value }));
    };

    const ContentEditor = ({ id, label, value }: { id: keyof HistoryContent, label: string, value: string }) => (
        <div className="space-y-2">
            <Label htmlFor={id} className="text-lg font-semibold">{label}</Label>
            <Textarea id={id} value={value} onChange={handleTextAreaChange} disabled={isSaving} className="min-h-[150px]" />
        </div>
    );

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => router.push('/boss/site-editor')}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Editar Trajetória e Valores</h1>
                    <p className="text-muted-foreground">
                        Altere os textos da página "Nossa Identidade".
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Editor de Conteúdo</CardTitle>
                    <CardDescription>
                        Faça as alterações e clique em salvar. As mudanças serão refletidas na página pública.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoadingData ? (
                        <div className="space-y-6">
                            <Skeleton className="h-8 w-1/4" />
                            <Skeleton className="h-24 w-full" />
                            <Skeleton className="h-8 w-1/4" />
                            <Skeleton className="h-24 w-full" />
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <ContentEditor id="history_text" label="Nossa História (Trajetória)" value={content.history_text} />
                            <ContentEditor id="mission_text" label="Nossa Missão" value={content.mission_text} />
                            <ContentEditor id="vision_text" label="Nossa Visão" value={content.vision_text} />
                            <ContentEditor id="values_text" label="Nossos Valores" value={content.values_text} />
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button onClick={handleSave} disabled={isSaving || isLoadingData}>
                    {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Salvar Alterações
                </Button>
            </div>
        </div>
    );
}
