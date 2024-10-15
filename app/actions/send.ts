'use server';
import { getData } from '@/lib/fetchFunctions';
import { GenericObject } from '@/models/types';

export async function sendEmail(id: string, postId: string) {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/send/?id=${id}&postId=${postId}`,
    {
      method: 'GET',
    },
  );

  const data = await res.json();
  console.log('action post', data);
  return data;
}
