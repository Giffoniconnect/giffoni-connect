'use client';

import {
    SidebarProvider,
    Sidebar,
    SidebarHeader,
    SidebarInset,
    SidebarTrigger,
  } from '@/components/ui/sidebar';
import { UserNavWrapper } from '@/components/user-nav';
import { PartnerSidebar } from '@/components/partner-sidebar';
import { Logo } from '@/components/logo';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
  
  export default function PartnerDashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, isUserLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isUserLoading && !user) {
            router.replace('/partner/login');
        }
    }, [user, isUserLoading, router]);

    if (isUserLoading || !user) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }
    
    return (
      <SidebarProvider>
          <Sidebar
            variant="sidebar"
            collapsible="icon"
            className="group-data-[collapsible=icon]:border-r-0"
          >
            <SidebarHeader className="p-4">
              <Logo />
            </SidebarHeader>
            <PartnerSidebar />
          </Sidebar>
          <SidebarInset>
            <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
              <div className='flex items-center gap-4'>
                <SidebarTrigger className="md:hidden" />
                <h1 className="font-semibold text-lg text-foreground whitespace-nowrap hidden md:block">
                    Painel do Parceiro
                </h1>
              </div>
              <div className="flex items-center gap-4">
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
