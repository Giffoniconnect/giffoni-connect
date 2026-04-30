'use client';

import React, { useRef, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  useCollection,
  useFirestore,
  useMemoFirebase,
} from '@/firebase';
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
  writeBatch,
  getDoc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import {
  ArrowLeft,
  Loader2,
  PlusCircle,
  Pencil,
  Trash2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { iconList, IconName } from '@/lib/icon-map';
import { infoproductsInitialData } from '@/lib/data';
import Link from 'next/link';

type Infoproduct = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: IconName;
  createdAt?: any;
};

const emptyProduct: Partial<Infoproduct> = {
  title: '',
  description: '',
  href: '',
  icon: 'BookMarked',
};

export default function InfoproductsEditorPage() {
  const router = useRouter();
  const { toast } = useToast();
  const firestore = useFirestore();

  const productsRef = useMemoFirebase(
    () =>
      firestore
        ? query(collection(firestore, 'infoproducts'), orderBy('title', 'asc'))
        : null,
    [firestore]
  );
  const { data: products, isLoading } = useCollection<Infoproduct>(productsRef);
  const didSeedCheck = React.useRef(false);

  React.useEffect(() => {
    const seedData = async () => {
        if (!firestore) return;
        
        const seedMetaRef = doc(firestore, 'infoproducts', '--metadata--');
        
        try {
            const seedMetaSnap = await getDoc(seedMetaRef);

            if (seedMetaSnap.exists()) {
                return;
            }
            
            toast({
                title: 'Inicializando infoprodutos...',
                description: `Adicionando ${infoproductsInitialData.length} produto(s) padrão.`,
            });

            const batch = writeBatch(firestore);
            
            infoproductsInitialData.forEach((product) => {
                const docRef = doc(firestore, 'infoproducts', product.id);
                batch.set(docRef, { ...product, createdAt: serverTimestamp() });
            });
            
            batch.set(seedMetaRef, { seeded: true, seededAt: serverTimestamp() });
            
            await batch.commit();
            
        } catch (e) {
            console.error("Error during seeding process: ", e);
            toast({
                variant: "destructive",
                title: "Erro de Inicialização",
                description: "Não foi possível inicializar os dados dos infoprodutos."
            });
        }
    };

    if (firestore && !didSeedCheck.current) {
        didSeedCheck.current = true;
        seedData();
    }
  }, [firestore, toast]);


  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [currentProduct, setCurrentProduct] = React.useState<Partial<Infoproduct>>(emptyProduct);
  const [productToDelete, setProductToDelete] = React.useState<Infoproduct | null>(null);


  const handleAddNew = () => {
    setCurrentProduct(emptyProduct);
    setIsDialogOpen(true);
  };

  const handleEdit = (product: Infoproduct) => {
    setCurrentProduct(product);
    setIsDialogOpen(true);
  };

  const handleDelete = (product: Infoproduct) => {
    setProductToDelete(product);
    setIsAlertOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete || !firestore) return;
  
    const productId = productToDelete.id;
    const productTitle = productToDelete.title;
    
    setIsAlertOpen(false);
  
    const productRef = doc(firestore, 'infoproducts', productId);
  
    try {
      await deleteDoc(productRef);
      toast({
        title: 'Exclusão Concluída',
        description: `O infoproduto "${productTitle}" foi removido com sucesso.`,
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        variant: 'destructive',
        title: 'Erro na Exclusão',
        description: 'Não foi possível remover o infoproduto.',
      });
    } finally {
      setProductToDelete(null);
    }
  };

  const handleSave = async () => {
    if (
      !currentProduct.title ||
      !currentProduct.description ||
      !currentProduct.href ||
      !currentProduct.icon
    ) {
      toast({
        variant: 'destructive',
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha todos os campos.',
      });
      return;
    }
    if (!firestore) return;

    setIsSaving(true);

    try {
        if ('id' in currentProduct && currentProduct.id) {
            const docRef = doc(firestore, 'infoproducts', currentProduct.id);
            const { id, ...dataToUpdate } = currentProduct;
            await updateDoc(docRef, dataToUpdate);
            toast({ title: 'Sucesso', description: 'Infoproduto atualizado.' });
        } else {
            const collectionRef = collection(firestore, 'infoproducts');
            const newDocRef = doc(collectionRef); 
            await setDoc(newDocRef, {
                ...currentProduct,
                id: newDocRef.id,
                createdAt: serverTimestamp(),
            });
            toast({
                title: 'Sucesso',
                description: 'Novo infoproduto adicionado.',
            });
        }
        setIsDialogOpen(false);
        setCurrentProduct(emptyProduct);
    } catch (error) {
        console.error('Error saving product: ', error);
        toast({
            variant: 'destructive',
            title: 'Erro',
            description: 'Não foi possível salvar o infoproduto.',
        });
    } finally {
        setIsSaving(false);
    }
};

  const IconComponent = ({ iconName }: { iconName: IconName }) => {
    const Icon = React.useMemo(() => {
      const found = iconList.find((i) => i.name === iconName);
      return found ? found.component : null;
    }, [iconName]);

    if (!Icon) return null;
    return <Icon className="h-5 w-5" />;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push('/boss/site-editor')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Editar Infoprodutos Jurídicos
          </h1>
          <p className="text-muted-foreground">
            Adicione, edite ou remova os infoprodutos exibidos no site.
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleAddNew}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Novo Infoproduto
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.filter(prod => prod.id !== '--metadata--').map((product) => (
            <Card key={product.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <IconComponent iconName={product.icon} />
                  {product.title}
                </CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto flex flex-col gap-2">
                <Button variant="outline" onClick={() => handleEdit(product)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(product)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Excluir
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentProduct.id ? 'Editar Infoproduto' : 'Adicionar Novo Infoproduto'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={currentProduct.title}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={currentProduct.description}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="href">Link (href)</Label>
              <Input
                id="href"
                value={currentProduct.href}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, href: e.target.value })
                }
                placeholder="/infoprodutos/..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="icon">Ícone</Label>
              <Select
                value={currentProduct.icon}
                onValueChange={(value: IconName) =>
                  setCurrentProduct({ ...currentProduct, icon: value })
                }
              >
                <SelectTrigger id="icon">
                  <SelectValue placeholder="Selecione um ícone" />
                </SelectTrigger>
                <SelectContent>
                  {iconList.map((iconItem) => (
                    <SelectItem key={iconItem.name} value={iconItem.name}>
                      <div className="flex items-center gap-2">
                        <iconItem.component className="h-4 w-4" />
                        {iconItem.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={isSaving}
            >
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso irá remover permanentemente o infoproduto "{productToDelete?.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}
