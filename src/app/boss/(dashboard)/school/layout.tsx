'use client';
import { SchoolSidebar } from '@/components/school-sidebar';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SchoolLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    return (
      <div className="grid md:grid-cols-[250px_1fr] gap-8">
        <div>
            <div className="flex items-center gap-4 mb-4">
                <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-2xl font-bold tracking-tight">Modo Editor</h2>
            </div>
            <div className="sticky top-20">
             <SchoolSidebar />
            </div>
        </div>
        <div className="min-w-0">
          {children}
        </div>
      </div>
    );
}
