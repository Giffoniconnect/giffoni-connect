'use client';
import { Scale } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function Logo({
  className,
}: {
  className?: string;
}) {

  return (
    <Link href="/" className={cn(
        'flex items-center gap-3',
        className
      )}>
      <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground flex-shrink-0">
        <Scale className="h-5 w-5" />
      </div>
      <div className={cn(
        "font-semibold text-lg overflow-hidden transition-opacity duration-300",
        "group-data-[state=collapsed]/sidebar-wrapper:hidden"
      )}>
        Giffoni Connect
      </div>
    </Link>
  );
}
