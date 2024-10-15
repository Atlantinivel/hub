import { NextResponse } from 'next/server';

import prisma from '../../../libs/prismadb';
var _ = require('lodash');

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    console.log('searchParams', searchParams);
    const guests = searchParams.get('guests')

    const room = searchParams.get('room')
    const guestExist = guests !== '';
    const guestList = guests?.split(',')
    console.log('ROOM GUESTS', room, guestList);
    let whereCondition = {};

if (room && guestExist) {
  whereCondition = {
    room: room,
    guestsIds: {
      hasSome: guestList,
    },
  };
} else if (room) {
  whereCondition = {
    room: room,
  };
} else if (guestExist) {
  whereCondition = {
    guestsIds: {
      hasSome: guestList,
    },
  };
}
if(Object.keys(whereCondition).length > 0) {
  const meeting = await prisma.meeting.findMany({
    where: whereCondition,
    
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
} else {

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
}
  
  } catch (error) {
    console.log(error);
    return NextResponse.json(false);
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
