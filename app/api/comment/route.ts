import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import prisma from '@/../../libs/prismadb';

export async function POST(req: NextRequest) {
  try {
    console.log('session post comment');
    const { text, postId, userId } = await req.json();
    const data = {
      text: text,
      postId: postId,
      userId: userId,
    };
    const user = await prisma.comment.create({
      data,
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json(400);
  }
}
