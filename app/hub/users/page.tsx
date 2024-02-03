
// export default function Users() {
//   return (
//     <div className=" flex flex-col md:flex-row gap-5 justify-center items-center text-center h-full m-auto">
//       Users
//     </div>
//   )
// }

import { User, columns } from '@/components/own/user-table/columns'
import { DataTable } from '@/components/own/table'
import { SideMenu } from '@/components/own/side-menu/side-menu'
import { Separator } from '@/components/ui/separator'

async function getUsers(): Promise<User[]> {
  // const res = await fetch(
  //   'https://64a6f5fc096b3f0fcc80e3fa.mockapi.io/api/users'
  // )
  const res = await fetch('http://localhost:3000/api/users');
  const data = await res.json()
  return data
}

// async function getUsers() {
//   // const res = await fetch('http://localhost:3000/api/users');
//   const res = await fetch('https://64a6f5fc096b3f0fcc80e3fa.mockapi.io/api/users');
//   const user = res.data;
//   console.log(user);
//   // 
//   return res;
// }

const sidebarNavItems = [
  {
    title: "Lista",
    href: "/hub/users",
  },
  {
    title: "Adicionar",
    href: "/hub/users/user",
  },
  // {
  //   title: "Renovações",
  //   href: "/hub/users",
  // },
  // {
  //   title: "Contratos",
  //   href: "/hub/users",
  // },
]


export default async function Users() {
  const data = await getUsers()


  return (
    <div className='container py-3'>
      <h1 className='mb-6 text-3xl font-bold'>Funcionários</h1>
      <DataTable columns={columns} data={data} />
    </div>
  )
}