import { Calendar, Users } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Tets() {
  return (
    <div className=" flex flex-col md:flex-row gap-5 justify-center items-center text-center h-full m-auto">
      <Card className=" min-w-[200px]">
        <CardHeader>
          <CardTitle className=" pb-4">Calendário</CardTitle>
          <CardDescription>
            {' '}
            <Calendar className="h-[4.2rem] w-[4.2rem] stroke-black  dark:stroke-white m-auto"></Calendar>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/hub/calendar">Entrar</Link>
          </Button>
        </CardContent>
      </Card>
      <Card className=" min-w-[200px]">
        <CardHeader>
          <CardTitle className=" pb-4">Funcionários</CardTitle>
          <CardDescription>
            <Users className="h-[4.2rem] w-[4.2rem] stroke-black  dark:stroke-white  m-auto"></Users>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/hub/users">Entrar</Link>
          </Button>
        </CardContent>
      </Card>
      <Card className=" min-w-[200px]">
        <CardHeader>
          <CardTitle className=" pb-4">Forum</CardTitle>
          <CardDescription>
            <Users className="h-[4.2rem] w-[4.2rem] stroke-black  dark:stroke-white  m-auto"></Users>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/hub/forum">Entrar</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
