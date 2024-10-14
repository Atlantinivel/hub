import { User } from '@prisma/client';
import fs from 'fs';
import { NextResponse, NextRequest } from 'next/server';
//import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import path from 'path';

import prisma from '@/../../libs/prismadb';

export async function GET(req: NextRequest) {
  //const resend = new Resend(process.env.NEXT_RESEND_API_KEY);
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  const postId = url.searchParams.get('postId');
  console.log(id);
  const users = await prisma.user.findMany({
    where: {
      department: id,
    },
  });
  console.log(users);

  try {
    // Example usage
    const emails: string[] = getEmails(users);
    console.log(emails);
    // const { data, error } = await resend.emails.send({
    //   from: 'Acme <onboarding@resend.dev>',
    //   to: emails,
    //   subject: 'atlantinivel',
    //   html: 'Test send email atlantinivel',
    // });
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.sendinblue.com',
      port: 587, // no need to set host or port etc.
      auth: {
        user: 'carlosama1902@gmail.com',
        pass: process.env.NEXT_PUBLIC_EMAILPROVIDER_API,
      },
    });
    const filePath = path.join(
      process.cwd(),
      'public/email-template',
      'forum-template.html',
    );
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const replacedHtml = source.replaceAll('{POSTID}', postId as string); // Replace template variables

    const mailOptions = {
      from: 'carlosama1902@gmail.com', // sender
      to: emails, // receiver
      subject: 'Atlantinivel - new forum post',
      html: replacedHtml,
    };
    const emailRes = await transporter.sendMail(mailOptions);

    return NextResponse.json(emailRes);
  } catch (error) {
    console.log(error);
    return NextResponse.json(400);
  }
}

function getEmails(users: User[]): string[] {
  return users.map((user) => user.email as string);
}
