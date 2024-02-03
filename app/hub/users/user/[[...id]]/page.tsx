

import { User, columns } from '@/components/own/user-table/columns'









import UserForm from './user-form';



async function getUser(id: string): Promise<User[] | undefined> {
  const { signal } = new AbortController()
  if (!id) return;

  console.log('ID', id[0]);

  const response = await fetch(`http://localhost:3000/api/users/user/${id[0]}`, { signal });

  const data = await response.json()
  return data
}



const UserAddEdit = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const data = await getUser(id);
  console.log('da', data);




  return (
    <UserForm id={id} values={data} ></UserForm>
  )
}


export default UserAddEdit;