'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Save, Loader2, X, Pencil } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const initialDocs = [
    { id: "procuracao", name: "Procuração", status: "pendente" },
    { id: "declaracao", name: "Declaração de Pobreza", status: "pendente" },
    { id: "contrato", name: "Contrato de Honorários", status: "pendente" },
];

export default function ColetaProvasPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const [docs, setDocs] = useState(initialDocs);
    const [provas, setProvas] = useState<string[]>(['Contrato de aluguel', 'Comprovantes de pagamento']);
    const [newProva, setNewProva] = useState('');
    const [editingProva, setEditingProva] = useState<{ index: number; text: string } | null>(null);
    const [isContractDialogOpen, setIsContractDialogOpen] = useState(false);

    const handleUpdateDocStatus = (id: string, status: string) => {
        setDocs(docs.map(doc => (doc.id === id ? { ...doc, status } : doc)));
    };

    const handleAddProva = () => {
        if (newProva.trim()) {
            setProvas([...provas, newProva.trim()]);
            setNewProva('');
        }
    };
    
    const handleRemoveProva = (index: number) => {
        setProvas(provas.filter((_, i) => i !== index));
    };

    const handleUpdateProva = () => {
        if (editingProva) {
            const updatedProvas = [...provas];
            updatedProvas[editingProva.index] = editingProva.text;
            setProvas(updatedProvas);
            setEditingProva(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        startTransition(() => {
            toast({
                title: 'Provas Salvas (Simulado)',
                description: 'As informações de provas foram registradas.',
            });
            router.push('/boss/funil-cedrp/tipos-de-estruturacao');
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <Card>
                <CardHeader><CardTitle>Coleta de Documentos Jurídicos</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    {docs.map(doc => (
                        <div key={doc.id} className="flex items-center justify-between p-2 border rounded-md">
                            <Label>{doc.name}</Label>
                            <div className="flex items-center gap-2">
                                <Button type="button" variant="outline" size="sm" onClick={() => (doc.id === 'contrato' ? setIsContractDialogOpen(true) : {})} disabled={doc.id !== 'contrato'}>
                                    Gerar {doc.name}
                                </Button>
                                <Select value={doc.status} onValueChange={(value) => handleUpdateDocStatus(doc.id, value)}>
                                    <SelectTrigger className="w-[150px]"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pendente">Pendente</SelectItem>
                                        <SelectItem value="gerada">Gerada</SelectItem>
                                        <SelectItem value="enviado">Enviado</SelectItem>
                                        <SelectItem value="assinado">Assinado</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Quais outras provas documentais precisam ser coletadas?</CardTitle></CardHeader>
                <CardContent>
                    <div className="space-y-2 p-4 border rounded-md">
                        <div className="flex flex-wrap gap-2">
                            {provas.map((prova, index) => (
                                editingProva?.index === index ? (
                                    <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-md">
                                        <Input value={editingProva.text} onChange={(e) => setEditingProva({ ...editingProva, text: e.target.value })} className="h-8" />
                                        <Button type="button" size="sm" onClick={handleUpdateProva}>Salvar</Button>
                                        <Button type="button" size="sm" variant="ghost" onClick={() => setEditingProva(null)}>Cancelar</Button>
                                    </div>
                                ) : (
                                    <Badge key={index} variant="secondary" className="text-base py-1 px-3">
                                        {prova}
                                        <Button type="button" variant="ghost" size="icon" className="h-5 w-5 ml-2" onClick={() => setEditingProva({ index, text: prova })}><Pencil className="h-3 w-3" /></Button>
                                        <Button type="button" variant="ghost" size="icon" className="h-5 w-5" onClick={() => handleRemoveProva(index)}><X className="h-3 w-3" /></Button>
                                    </Badge>
                                )
                            ))}
                        </div>
                        <div className="flex items-center gap-2 pt-4">
                            <Input value={newProva} onChange={(e) => setNewProva(e.target.value)} placeholder="Adicionar nova prova..." />
                            <Button type="button" onClick={handleAddProva}>Inserir Prova</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
                {['testemunhal', 'audiovisual', 'depoimento pessoal'].map(type => (
                    <Card key={type}>
                        <CardHeader><CardTitle className="text-base">Deseja coletar prova {type}?</CardTitle></CardHeader>
                        <CardContent>
                            <RadioGroup defaultValue="nao" className="flex gap-4">
                                <div className="flex items-center space-x-2"><RadioGroupItem value="sim" id={`${type}-sim`} /><Label htmlFor={`${type}-sim`}>Sim</Label></div>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="nao" id={`${type}-nao`} /><Label htmlFor={`${type}-nao`}>Não</Label></div>
                            </RadioGroup>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="flex justify-end">
                <Button type="submit" disabled={isPending}>
                    {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Salvar e Iniciar Estruturação
                </Button>
            </div>
            
            <Dialog open={isContractDialogOpen} onOpenChange={setIsContractDialogOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader><DialogTitle>Gerar Contrato de Honorários</DialogTitle></DialogHeader>
                    <div className="space-y-4 py-4">
                        {/* Complex form for contract details */}
                        <div className="space-y-2"><Label htmlFor="valor">Valor dos Honorários</Label><Input id="valor" type="number" /></div>
                        <div className="space-y-2"><Label htmlFor="parcelas">Nº de Parcelas</Label><Input id="parcelas" type="number" /></div>
                        <div className="space-y-2"><Label htmlFor="vencimento">Data do 1º Vencimento</Label><Input id="vencimento" type="date" /></div>
                    </div>
                    <DialogFooter><Button onClick={() => setIsContractDialogOpen(false)}>Salvar Contrato</Button></DialogFooter>
                </DialogContent>
            </Dialog>
        </form>
    );
}
