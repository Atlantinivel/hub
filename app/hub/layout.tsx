import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Nav } from "@/components/own/nav";



export default async function HubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // @ts-ignore
  const session = await getServerSession(authOptions)

  const isAuthenticated = !!session;

  if (!isAuthenticated) {
    redirect('/login');
  }
  return (
    <div className=" max-h-screen h-full" >
      <Nav></Nav>

      <div className="h-[calc(100vh_-_65px)]">
        {children}</div>
    </div>
  );
}
