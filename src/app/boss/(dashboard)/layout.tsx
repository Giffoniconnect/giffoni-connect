'use client';

import {
    SidebarProvider,
    Sidebar,
    SidebarInset,
    SidebarTrigger,
  } from '@/components/ui/sidebar';
import { UserNavWrapper } from '@/components/user-nav';
import { BossSidebar } from '@/components/boss-sidebar';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function BossLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    // AUTHENTICATION & AUTHORIZATION REMOVED
    // The layout now simply renders its children without any checks.
    // This grants access to all pages within the BOSS portal.
    return (
      <SidebarProvider>
          <Sidebar
            variant="sidebar"
            collapsible="icon"
            side="left"
            className="left-scrollbar"
          >
            <BossSidebar />
          </Sidebar>
          <SidebarInset>
            <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
              <div className='flex items-center gap-4'>
                <SidebarTrigger className="md:hidden" />
                <h1 className="font-semibold text-lg text-foreground whitespace-nowrap hidden md:block">
                    Portal do Boss
                </h1>
              </div>
              <div className="flex items-center gap-4">
                {pathname === '/boss/database' && (
                    <Link href="/boss/workspace">
                        <Button variant="outline" size="icon">
                            <Home className="h-4 w-4" />
                            <span className="sr-only">Voltar para a Área de Trabalho</span>
                        </Button>
                    </Link>
                )}
                <UserNavWrapper />
              </div>
            </header>
            <main className="min-h-[calc(100vh-4rem)] p-4 sm:p-6">
              {children}
            </main>
          </SidebarInset>
      </SidebarProvider>
    );
}
