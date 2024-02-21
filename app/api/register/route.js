import { NextResponse } from 'next/server';

import prisma from '../../../libs/prismadb';

import bcrypt from 'bcrypt';

export async function POST(request) {
  try {
    const data = await request.json();
    console.log('DATA', data);
    const { roles } = data;
    if (roles.length > 0) {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 12);
      const user = await prisma.user.create({
        data: { ...data, hashedPassword: hashedPassword },
      });

      return NextResponse.json(user);
    } else {
      const user = await prisma.user.create({
        data,
      });
      return NextResponse.json(user);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(400);
  }
}
