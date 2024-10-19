import { getServerSession } from 'next-auth/next';

import { config } from '@/app/api/auth/[...nextauth]/route';
import { Forum } from '@/components/own/forum';
import { DataTable } from '@/components/own/table';
import { User, columns } from '@/components/own/user-table/columns';
import { SlashIcon } from '@radix-ui/react-icons';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default async function forum() {
  return (
    <div className="container py-3">
      <Breadcrumb className="py-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/hub">Hub</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Forum</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="mb-6 text-3xl font-bold">Forum</h1>
      <Forum></Forum>
    </div>
  );
}
