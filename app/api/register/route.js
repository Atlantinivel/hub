import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

import prisma from '../../../libs/prismadb';

import bcrypt from 'bcrypt';

export async function POST(request) {
  try {
    const data2 = await request.json();
    var saltValue = bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        // Handle error
        return;
      }
      return salt;
      // Salt generation successful, proceed to hash the password
    });
    const hashValue = bcrypt.hash(data2.password, saltValue, (err, hash) => {
      if (err) {
        // Handle error
        return;
      }
      return hash;
    });
    const data = {
      name: data2.name,
      email: data2.email,
      hashedPassword: hashValue,
      fullName: data2.fullname,
      birthDate: '1997-10-08T23:00:00.000+00:00',
      employeeNumber: data2.employeeNumber,
      personalPhoneNumber: data2.personalPhoneNumber,
      companyPhoneNumber: data2.companyPhoneNumber,
      companyCode: data2.companyCode,
      gender: data2.gender,
      department: '10',
      job: '9',
    };
    const user = await prisma.user.create({ data });
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json(400);
  }
}
