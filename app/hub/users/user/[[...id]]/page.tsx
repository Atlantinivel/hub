'use client';
import { User } from '@/components/own/user-table/columns';

import UserForm from './user-form';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

// async function getUser(id: string): Promise<User[] | undefined> {
//   const { signal } = new AbortController();
//   if (!id) return;

//   const response = await fetch(
//     `${process.env.VERCEL_URL}/api/users/user/${id[0]}`,
//     { cache: 'no-store' },
//   );

//   const data = await response.json();
//   return data;
// }

const UserAddEdit = ({ params }: { params: { id: string } }) => {

  const { id } = params;
  const [data, setData] = useState(null)

  const [isLoading, setLoading] = useState(true)



  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    };
    fetch(`/api/users/user/${id[0]}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])


  if (isLoading) return <div className='container h-full flex align-middle items-center'><Loader2 className="m-auto h-12  w-12 animate-spin"></Loader2></div>
  if (!data && id) return <p>No data</p>

  return <UserForm id={id} values={data}></UserForm>;
};

export default UserAddEdit;
