
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
  Briefcase,
  PlusCircle,
  User,
  Handshake,
  DollarSign,
  HelpCircle,
  LayoutDashboard,
  Home,
} from 'lucide-react';

const partnerItems = [
  { href: '/partner/home', icon: Home, label: 'Página Institucional' },
  { href: '/partner/dashboard', icon: LayoutDashboard, label: 'Manual do Parceiro' },
  { href: '/partner/strategic-alliances', icon: Handshake, label: 'Alianças Estratégicas' },
  { href: '/partner/cases', icon: Briefcase, label: 'Casos da Parceria' },
  { href: '/partner/financials', icon: DollarSign, label: 'Controle Financeiro' },
  { href: '/partner/propose', icon: PlusCircle, label: 'Propor nova parceria' },
  { href: '/partner/profile', icon: User, label: 'Meus Dados' },
  { href: '/partner/faq', icon: HelpCircle, label: 'Perguntas Frequentes' },
];

export function PartnerSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname.startsWith(href);
  };

  return (
    <SidebarContent>
      <SidebarMenu>
        {partnerItems.map((item) => (
          <SidebarMenuItem key={item.label}>
            <Link href={item.href}>
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
