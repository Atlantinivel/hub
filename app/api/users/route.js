// route.js
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "../../../libs/prismadb"

export async function GET() {
  try {

    const users = await prisma.user.findMany();

    console.log(users);
   


    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
    return NextResponse.json(400);
  }
}

