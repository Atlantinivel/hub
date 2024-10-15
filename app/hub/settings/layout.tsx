import React from 'react';

import { SideMenu } from '@/components/own/side-menu/side-menu';
import { Separator } from '@/components/ui/separator';


export default async function HubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" max-h-screen h-full">
      <section className="flex flex-row h-full">
        <div className="w-full h-[calc(100vh_-_65px)]">{children}</div>
      </section>
    </div>
  );
}
