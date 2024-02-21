import { NextResponse } from 'next/server';

import prisma from '../../../libs/prismadb';
var _ = require('lodash');

export async function GET(request) {
  try {
    const meeting = await prisma.meeting.findMany({
      include: {
        guests: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });
    return NextResponse.json(meeting);
  } catch (error) {
    console.log(error);
    return NextResponse.json(400);
  }
}
export async function POST(request) {
  try {
    const data = await request.json();

    const {
      description,
      room,
      startTime,
      endTime,
      duration,
      creatorId,
      guestsIds,
    } = data.data;
    if (!data.data.id) {
      const meeting = await prisma.meeting.create({
        data: {
          description,
          room,
          startTime,
          endTime,
          duration,
          creator: {
            connect: {
              id: creatorId,
            },
          },
          guests: {
            connect: guestsIds.map((guestId) => ({ id: guestId })),
          },
        },
        include: {
          creator: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
          guests: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
        },
      });
      return NextResponse.json(meeting);
    } else {
      const meeting = await prisma.meeting.update({
        where: {
          id: data.data.id,
        },
        data: _.omit(data.data, 'id'),
      });
      return NextResponse.json(meeting);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(400);
  }
}
