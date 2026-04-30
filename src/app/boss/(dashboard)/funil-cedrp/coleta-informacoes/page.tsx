'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Save, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ColetaInformacoesPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const [areas, setAreas] = useState(['Direito Civil', 'Direito do Trabalho', 'Direito Empresarial', 'Direito do Consumidor']);
    const [selectedArea, setSelectedArea] = useState('');
    const [isNewAreaDialogOpen, setIsNewAreaDialogOpen] = useState(false);
    const [newArea, setNewArea] = useState('');

    const handleSelectChange = (value: string) => {
        if (value === 'outro') {
            setIsNewAreaDialogOpen(true);
        } else {
            setSelectedArea(value);
        }
    };

    const handleAddNewArea = () => {
        if (newArea.trim()) {
            setAreas(prev => [...prev, newArea.trim()]);
            setSelectedArea(newArea.trim());
            setNewArea('');
            setIsNewAreaDialogOpen(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        startTransition(() => {
            toast({
                title: 'Informações Salvas (Simulado)',
                description: 'Os dados do caso foram registrados com sucesso.',
            });
            router.push('/boss/funil-cedrp/coleta-provas');
        });
    };

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <CardContent className="pt-6 space-y-8">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="assunto">Assunto</Label>
                            <Input id="assunto" placeholder="Ex: Quebra de contrato de aluguel" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="area-direito">Ramo do Direito</Label>
                            <Select value={selectedArea} onValueChange={handleSelectChange}>
                                <SelectTrigger id="area-direito"><SelectValue placeholder="Selecione a área..." /></SelectTrigger>
                                <SelectContent>
                                    {areas.map(area => <SelectItem key={area} value={area}>{area}</SelectItem>)}
                                    <SelectItem value="outro">Outro...</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="detalhes">Detalhes do caso</Label>
                            <Textarea id="detalhes" placeholder="Descreva em detalhes a situação apresentada pelo cliente..." className="min-h-[150px]" />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit" disabled={isPending}>
                            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                            Salvar e Continuar
                        </Button>
                    </div>
                </CardContent>
            </form>

            <Dialog open={isNewAreaDialogOpen} onOpenChange={setIsNewAreaDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Adicionar Nova Área do Direito</DialogTitle>
                        <DialogDescription>Digite o nome da nova área para adicioná-la à lista.</DialogDescription>
                    </DialogHeader>
                    <Input value={newArea} onChange={(e) => setNewArea(e.target.value)} placeholder="Ex: Direito Digital" />
                    <DialogFooter>
                        <DialogClose asChild><Button variant="outline">Cancelar</Button></DialogClose>
                        <Button onClick={handleAddNewArea}>Adicionar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    );
}
