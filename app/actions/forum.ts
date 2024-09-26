'use server';

import { getData, postData } from '@/lib/fetchFunctions';
import { GenericObject } from '@/models/types';

export async function createPost(body: {
  departmentid?: string;
  title: string;
  content: string;
  userId: string;
}) {
  console.log(body);
  const data = await postData('forum', body);
  return {
    data: data.category,
  };
}

export async function getPosts(queryParams?: GenericObject) {
  let url = 'forum';

  const data = await getData(url);
  return {
    data: data,
  };
}