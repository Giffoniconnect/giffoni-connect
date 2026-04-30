'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cybersecurityRules } from '@/lib/data';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
  
  export default function SecurityRulesPage() {

    const getStatusVariant = (status: string): "default" | "secondary" | "destructive" => {
        switch (status) {
          case 'Ativa':
            return 'default';
          case 'Experimental':
            return 'secondary';
          case 'Desativada':
            return 'destructive';
          default:
            return 'default';
        }
    };
    
    const getImpactVariant = (impact: string): "destructive" | "secondary" | "default" => {
        switch (impact) {
          case 'Alto':
            return 'destructive';
          case 'Médio':
            return 'secondary';
          case 'Baixo':
            return 'default';
          default:
            return 'default';
        }
      };

    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Regras de CyberSegurança</h1>
            <p className="text-muted-foreground">Repositório vivo de regras de segurança, acesso e dados do sistema.</p>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle>Repositório de Regras</CardTitle>
                <CardDescription>
                Esta seção documenta as regras de segurança implementadas. A IA do sistema deve manter esta lista atualizada.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Nome da Regra</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Impacto</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Escopo</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {cybersecurityRules.map((rule) => (
                        <TableRow key={rule.id}>
                            <TableCell className="font-medium">{rule.name}</TableCell>
                            <TableCell className="text-sm text-muted-foreground max-w-xs">{rule.description}</TableCell>
                            <TableCell>
                                <Badge variant={getStatusVariant(rule.status)}>{rule.status}</Badge>
                            </TableCell>
                            <TableCell>
                                <Badge variant={getImpactVariant(rule.impact)}>{rule.impact}</Badge>
                            </TableCell>
                            <TableCell>{rule.category}</TableCell>
                            <TableCell>{rule.scope}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </div>
            </CardContent>
        </Card>
      </div>
    )
  }
