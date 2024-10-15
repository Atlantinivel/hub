import { NextResponse } from 'next/server';

import prisma from '@/../../libs/prismadb';

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    console.log('request', id, request);

    const user = await prisma.meeting.delete({
      where: {
        id: id,
      },
    });

    console.log(user);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 400, ok: false });
  }
}
