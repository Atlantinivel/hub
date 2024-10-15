import { NextResponse } from 'next/server';

import prisma from '../../../libs/prismadb';

export async function GET() {
  try {
    const users = await prisma.user.findMany();


    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
    return NextResponse.json(400);
  }
}
