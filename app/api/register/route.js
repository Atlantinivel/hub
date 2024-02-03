// route.js
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "../../../libs/prismadb"

export async function POST(request, response) {
  try {
     const data = await request.json();

    const user = await prisma.user.create({
      data,
    });


    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json(400);
  }
}
