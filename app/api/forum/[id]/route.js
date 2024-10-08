import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import prisma from '@/../../libs/prismadb';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    console.log('api', id);
    const post = await prisma.post.findFirst({
      where: {
        id: id,
      },
      include: {
        author: true,
        comments: { include: { author: true } },
      },
    });
    console.log('data', post);
    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
    return NextResponse.json(400);
  }
}
