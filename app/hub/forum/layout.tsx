import React from 'react';
export default async function HubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" max-h-screen h-full">
      <div className="h-[calc(100vh_-_65px)]">{children}</div>
    </div>
  );
}
