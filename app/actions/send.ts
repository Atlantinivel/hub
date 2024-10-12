'use server';
import { getData } from '@/lib/fetchFunctions';
import { GenericObject } from '@/models/types';

export async function sendEmail(id: string) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/send/?id=${id}`, {
    method: 'GET',
  });

  const data = await res.json();
  console.log('action post', data);
  return data;
}
