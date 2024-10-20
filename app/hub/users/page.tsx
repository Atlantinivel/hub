'use client';
import { DataTable } from '@/components/own/table';
import { User, columns } from '@/components/own/user-table/columns';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { SlashIcon } from '@radix-ui/react-icons';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
export default function Users() {
  const [data, setData] = useState(null);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/users`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading)
    return (
      <div className="container h-full flex align-middle items-center">
        <Loader2 className="m-auto h-12  w-12 animate-spin"></Loader2>
      </div>
    );
  if (!data) return <p>No data</p>;

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
            <BreadcrumbPage>Users</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="mb-6 text-3xl font-bold">Funcionários</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
