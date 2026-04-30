// This component is no longer used on the home page.
// It is preserved in case it's needed elsewhere.
'use client';

import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Building2, Users, Library, BookMarked } from 'lucide-react';

const institutionalItems = [
  { href: '/about/areas', icon: Library, label: 'Áreas de Atuação' },
  { href: '/about/infoproducts', icon: BookMarked, label: 'Infoprodutos' },
  { href: '/about/history', icon: Building2, label: 'Nossa História' },
  { href: '/about/team', icon: Users, label: 'Nossa Equipe' },
];

export function HomeNav() {
  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        {institutionalItems.map((item) => (
          <NavigationMenuItem key={item.label}>
             <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
