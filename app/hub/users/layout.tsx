import React from 'react';

import { SideMenu } from '@/components/own/side-menu/side-menu';
import { Separator } from '@/components/ui/separator';

const sidebarNavItems = [
  {
    title: 'Lista',
    href: '/hub/users',
  },
  {
    title: 'Adicionar',
    href: '/hub/users/user',
  },
  // {
  //   title: "Renovações",
  //   href: "/hub/users",
  // },
  // {
  //   title: "Contratos",
  //   href: "/hub/users",
  // },
];

export default async function HubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" max-h-screen h-full">
      <section className="flex flex-row h-full">
        <SideMenu items={sidebarNavItems} />
        <Separator orientation="vertical" />
        <div className="w-full h-[calc(100vh_-_65px)]">{children}</div>
      </section>
    </div>
  );
}
