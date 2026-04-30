'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  MessagesSquare,
  Receipt,
  Sparkles,
  User,
  Gavel,
  Microscope,
  Calendar,
} from 'lucide-react';

const accountItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Manual do Usuário' },
  { href: '/cases', icon: FileText, label: 'Andamento Processual' },
  { href: '/audiencias', icon: Gavel, label: 'Agenda de Audiências' },
  { href: '/pericias', icon: Microscope, label: 'Agenda de Perícias' },
  { href: '/reunioes', icon: Calendar, label: 'Agenda de Reuniões' },
  { href: '/documents', icon: FolderOpen, label: 'Documentos e Arquivos' },
  { href: '/invoices', icon: Receipt, label: 'Faturas e Honorários' },
  { href: '/messages', icon: MessagesSquare, label: 'Mensagens Seguras' },
  { href: '/meus-dados', icon: User, label: 'Meus Dados Cadastrais' },
  { href: '/recommendations', icon: Sparkles, label: 'Assistente Jurídico com IA' },
];

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <SidebarContent>
      <SidebarMenu>
        {accountItems.map((item) => (
          <SidebarMenuItem key={item.label}>
            <Link href={item.href} prefetch={false}>
              <SidebarMenuButton isActive={isActive(item.href)} tooltip={item.label}>
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarContent>
  );
}
