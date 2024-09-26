import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import prisma from '@/../../libs/prismadb';

export async function POST(req: NextRequest) {
  try {
    const session = await getToken({ req }); // check next auth seeesion equal null
    console.log('session', session);
    const { departmentid, title, content, userId } = await req.json();
    const data = {
      departmentid: departmentid,
      title: title,
      content: content,
      userId: userId,
    };
    const user = await prisma.post.create({
      data,
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json(400);
  }
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      },
    });

    console.log(posts);

    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
    return NextResponse.json(400);
  }
}
