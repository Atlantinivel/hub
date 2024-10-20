'use server';

import { Post } from '@prisma/client';

import { getData, postData } from '@/lib/fetchFunctions';
import { GenericObject } from '@/models/types';
const baseUrl = process.env.NEXTAUTH_URL;
export async function createPost(body: {
  departmentid?: string;
  title: string;
  content: string;
  userId: string;
}) {
  console.log(body);
  const data = await postData('forum', body);
  return {
    data: data as Post,
  };
}

export async function getPosts(queryParams?: GenericObject) {
  let url = 'forum';

  // const data = await getData(url);
  // return {
  //   data: data,
  // };
  const res = await fetch(`/api/${url}`, {
    method: 'GET',
  });

  const data = await res.json();
  return data;
}
