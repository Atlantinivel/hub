import { NextResponse } from 'next/server';

import prisma from '@/../../libs/prismadb';

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const users = await prisma.user.findMany({
      where: {
        department: id,
      },
    });

    console.log(users);

    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
    return NextResponse.json(400);
  }
}
