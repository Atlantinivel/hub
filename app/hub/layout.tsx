import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import React from 'react';

import { Nav } from '@/components/own/nav';

import { config } from '../api/auth/[...nextauth]/route';

export default async function HubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // @ts-ignore
  const session = await getServerSession(config);
  const isAuthenticated = !!session;

  if (!isAuthenticated) {
    redirect('/login');
  }
  return (
    <div className=" max-h-screen h-full">
      <Nav></Nav>

      <div className="h-[calc(100vh_-_65px)]">{children}</div>
    </div>
  );
}
