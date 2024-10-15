import { getServerSession } from 'next-auth/next';

import { config } from '@/app/api/auth/[...nextauth]/route';
import { Forum } from '@/components/own/forum';
import { DataTable } from '@/components/own/table';
import { User, columns } from '@/components/own/user-table/columns';

export default async function forum() {
  return (
    <div className="container py-3">
      <h1 className="mb-6 text-3xl font-bold">Forum</h1>
      <Forum></Forum>
    </div>
  );
}
