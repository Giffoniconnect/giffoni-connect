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
  Users,
  BookCopy,
  Library,
  Puzzle,
  FileQuestion,
} from 'lucide-react';
import { Card } from './ui/card';

const schoolItems = [
  { href: '/boss/school/students', icon: Users, label: 'Área do Aluno' },
  { href: '/boss/school/courses', icon: BookCopy, label: 'Cursos' },
  { href: '/boss/school/library', icon: Library, label: 'Biblioteca de Conteúdo' },
  { href: '/boss/school/exercises', icon: FileQuestion, label: 'Banco de Exercícios' },
  { href: '/boss/school/modules', icon: Puzzle, label: 'Módulos Interativos' },
];

export function SchoolSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    // Treat the main /boss/school route as the students page for active state
    if (href === '/boss/school/students' && pathname === '/boss/school') {
        return true;
    }
    return pathname.startsWith(href);
  };

  return (
    <Card>
        <SidebarContent className="p-2">
        <SidebarMenu>
            {schoolItems.map((item) => (
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
    </Card>
  );
}
