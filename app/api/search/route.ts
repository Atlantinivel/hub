import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/../../libs/prismadb';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const q = url.searchParams.get('q');

    if (!q) return new NextResponse('Invalid query', { status: 400 });

    const result = await prisma.post.findMany({
      where: {
        name: {
          startsWith: q,
        },
      },
      include: {
        author: true,
        comments: true,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return NextResponse.json(400);
  }
}
