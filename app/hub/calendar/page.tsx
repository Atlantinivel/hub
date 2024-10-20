import TimerInput from '@/app/hub/calendar/components/timerInput/timerInput';

// import { getData } from '@/utils/fetchFunctions';

// import { Status, Project, Tag } from './timer.types';
import Agenda from '@/app/hub/calendar/components/agenda/agenda';
import { getServerSession } from 'next-auth';
import { config } from '@/app/api/auth/[...nextauth]/route';

// import { config } from '../api/auth/[...nextauth]/route';
//@ts-ignore
async function getUsers(): Promise<any[]> {
  const res = await fetch(`${process.env.VERCEL_URL}/api/users`);
  const data = await res.json();
  return data;
}
//@ts-ignore
async function getMeetings(id): Promise<any[]> {
  const res = await fetch(
    `${process.env.VERCEL_URL}/api/meeting?guests=${id}`,
    {
      cache: 'no-store',
    },
  );
  const data = await res.json();
  return data;
}

const Timer = async () => {
  const session = await getServerSession(config);

  const usersData = getUsers();
  //@ts-ignore
  const meetingsData = getMeetings(session.token.id);
  const [users, meetings] = await Promise.all([usersData, meetingsData]);

  return (
    <div className=" container ">
      {/* @ts-ignore */}
      <TimerInput users={users} />
      {/* @ts-ignore */}
      <Agenda users={users} meetings={meetings} />
    </div>
  );
};

export default Timer;
