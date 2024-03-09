import TimerInput from '@/app/hub/calendar/components/timerInput/timerInput';

// import { getData } from '@/utils/fetchFunctions';

// import { Status, Project, Tag } from './timer.types';
import Agenda from '@/app/hub/calendar/components/agenda/agenda';

//@ts-ignore
async function getUsers(): Promise<any[]> {
  const res = await fetch(`${process.env.VERCEL_URL}/api/users`);
  const data = await res.json();
  return data;
}

async function getMeetings(): Promise<any[]> {
  const res = await fetch(`${process.env.VERCEL_URL}/api/meeting`, {
    cache: 'no-store',
  });
  const data = await res.json();
  return data;
}
async function getProjects() {
  // const projects = await getData<Project[]>('projects');
  // return projects.filter(({ status }) => status !== Status.Archived);
}

async function getTags() {
  // const tags = await getData<Tag[]>('tags');
  // return tags.filter(({ status }) => status !== Status.Archived);
}

const Timer = async () => {
  const usersData = getUsers();
  const meetingsData = getMeetings();
  const [users, meetings] = await Promise.all([usersData, meetingsData]);
  console.log(
    'meetings',
    meetings.map((a) => a.guests[0]),
  );

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
