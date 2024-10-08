'use server';

import { Comment } from '@prisma/client';

import { getData, postData } from '@/lib/fetchFunctions';
import { GenericObject } from '@/models/types';

export async function createComment(body: {
  text: string;
  postId: string;
  userId: string;
}) {
  console.log('creat comment ', body);
  const data = await postData('comment', body);
  console.log('create comment', data);
  return {
    data: data as Comment,
  };
}
