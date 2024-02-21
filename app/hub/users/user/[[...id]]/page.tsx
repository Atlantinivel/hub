import { User } from '@/components/own/user-table/columns';

import UserForm from './user-form';

async function getUser(id: string): Promise<User[] | undefined> {
  const { signal } = new AbortController();
  if (!id) return;

  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/users/user/${id[0]}`,
    { cache: 'no-store' },
  );

  const data = await response.json();
  return data;
}

const UserAddEdit = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const userData = await getUser(id);
  const [data] = await Promise.all([userData]);

  return <UserForm id={id} values={data}></UserForm>;
};

export default UserAddEdit;
