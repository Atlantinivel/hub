
import { NextResponse } from "next/server";
import prisma from "@/../../libs/prismadb"

import { revalidatePath } from 'next/cache'

export async function GET(request, { params }) { 
    try {
        const { id } = params 
        
        console.log('request', id, request);

    const user = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    console.log(user);
   


    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json(400);
  }
}


export async function POST(request, { params }) { 
  try {
      const { id } = params 
      const data = await request.json();

  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: data,
  });

  console.log(user);
 


  return NextResponse.json(user);
} catch (error) {
  console.log(error);
  return NextResponse.json(400);
}
}

