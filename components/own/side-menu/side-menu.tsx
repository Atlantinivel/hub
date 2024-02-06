'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SideMenu({ className, items, ...props }: SidebarProps) {
  const pathname = usePathname();

  return (
    <nav className={cn('flex flex-col gap-2 p-3 ', className)} {...props}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            pathname === item.href
              ? 'bg-muted hover:bg-muted'
              : 'hover:bg-transparent hover:underline',
            'justify-start',
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
