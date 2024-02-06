import { DataTable } from "@/components/own/table";
import { User, columns } from "@/components/own/user-table/columns";

async function getUsers(): Promise<User[]> {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users`);
  const data = await res.json();
  return data;
}

export default async function Users() {
  const data = await getUsers();

  return (
    <div className="container py-3">
      <h1 className="mb-6 text-3xl font-bold">Funcionários</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
