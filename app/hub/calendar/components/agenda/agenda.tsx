// @ts-nocheck
'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import useEventStore from '@/app/store/agendaStore';
import ptLocale from '@fullcalendar/core/locales/pt';
import TimerInput from '@/app/hub/calendar/components/timerInput/timerInput';
import rooms from '@/static-data/rooms.json';
import {
  PropTypes,
  Event,
} from '@/app/hub/calendar/components/agenda/agenda.types';
import {
  DateSelectArg,
  EventClickArg,
  EventDropArg,
} from '@fullcalendar/core/index.js';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Combobox } from '@/components/ui/combobox';
import { Toggle } from '@/components/ui/toggle';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useSession } from 'next-auth/react';

// const arrayColors = ['#fbf0c3',
// '#938b50',
// '#3f0e07',
// '#4f4a2a',
// '#ac9470',
// '#604c31',
// '#801818',
// '#5218fa',
// '#000080',
// '#0000cd',
// '#4666ff',
// '#009af0',
// '#0070ff',
// '#74a2a2',
// '#b9c4bc',
// '#82929e',
// '#876514',
// '#967117',
// '#e5c54f',
// '#7f6d2c',
// '#ccaf46',
// '#654321',
// '#556b2f',
// '#979255',
// '#b7410e',
// '#6f4e37',
// '#b00b1e',
// '#672c47',
// '#2c4767',
// '#1c537a',
// '#f0a858',
// '#b57000',
// '#8a2be2',
// '#ff65d4',
// '#ff4500',
// '#cc00cc',
// '#949cf7',
// '#c2b5aa',
// '#bab299',
// '#d1d0c4',
// '#d7cfd9',
// '#49283a'];

// @ts-ignore
const Agenda = ({ users, meetings }: PropTypes) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);
  const session = useSession();

  console.log('session', session);
  const { data } = session;
  // const { token } = data;

  const eventStore = useEventStore();
  // @ts-ignore
  const addEvents = useEventStore((state) => state.addEvents);

  useEffect(() => {
    if (meetings) {
      addEvents(meetings);
    }
  }, [meetings, addEvents]);

  const [openedCard, setOpenedCard] = useState(false);
  const [myEvents, setMyEvents] = useState<Boolean>(true);

  const [guests, setGuests] = useState<String[]>([]);
  const [room, setRooms] = useState('');

  const [entry, setEntry] = useState<Event>({
    id: '',
    start: '',
    end: '',
    posX: 0,
    posY: 0,
    isEditing: false,
  });

  const createEvent = (arg: DateSelectArg) => {
    setEntry({
      id: '',
      description: '',
      start: arg.startStr,
      end: arg.endStr,
      posX: arg.jsEvent?.x || 0,
      posY: arg.jsEvent?.y || 0,
      isEditing: false,
    });

    setOpenedCard(true);
  };

  const editEvent = (arg: EventClickArg) => {
    setEntry({
      id: arg.event.id,
      description: arg.event.title,
      guestsIds: arg.event.extendedProps.guestsIds,
      room: arg.event.extendedProps.room,
      start: arg.event.startStr,
      end: arg.event.endStr,
      posX: arg.jsEvent.x,
      posY: arg.jsEvent.y,
      isEditing: true,
    });

    setOpenedCard(true);
  };

  const dragEvent = (arg: EventDropArg) => {
    arg.jsEvent.preventDefault();
    // @ts-ignore
    eventStore.editEvent({
      id: arg.event.id,
      description: arg.event.title,
      guestsIds: arg.event.extendedProps.guestsIds,
      room: arg.event.extendedProps.room,
      start: arg.event.startStr,
      end: arg.event.endStr,
    });
  };

  const getMeetings = useCallback(async () => {
    const res = await fetch(`/api/meeting?guests=${guests}&room=${room}`, {
      cache: 'no-store',
    });
    const data = await res.json();

    if (data) {
      addEvents(data);
    } else {
      addEvents([]);
    }
    return data;
  }, [guests, room]);
  useEffect(() => {
    // @ts-ignore
    if (data?.token?.id) {
      // @ts-ignore
      setGuests([data?.token?.id]);
    }
    // @ts-ignore
  }, [data?.token?.id]);

  const cleanFilters = useCallback(() => {
    setGuests([]);
    setRooms('');
    setMyEvents(false);
    getMeetings();
    // @ts-ignore
  }, [data?.token?.id]);
  const handleOnChangeMyEvents = useCallback(() => {
    if (!myEvents) {
      setGuests([...guests, data?.token?.id]);
    } else {
      setGuests([]);
    }

    setMyEvents(!myEvents);
  }, [guests, myEvents, data]);

  const usersItems = useMemo(
    //@ts-ignore
    () => users.map(({ id, name }) => ({ value: id, label: name })),
    [users],
  );

  const mappedEntries = useMemo(
    () =>
      // @ts-ignore
      eventStore.events.map((event) => ({
        ...event,
        title: event.description,
        guestsIds: event.guestsIds,
        room: event.room,
        start: event.start || event.startTime,
        end: event.end || event.endTime,
        color: event.guestsIds.includes(data?.token?.id) ? '' : 'purple',
      })),
    // @ts-ignore
    [eventStore.events, data?.token?.id],
  );
  console.log(guests, room);

  return (
    <>
      <div className="mb-6 flex min-h-[70px] flex-wrap items-center gap-4 rounded-md border p-3 mt-3">
        <div className="flex items-center space-x-2">
          <Switch
            checked={myEvents}
            onCheckedChange={handleOnChangeMyEvents}
            id="my-events"
          />
          <Label htmlFor="my-events">Mostrar os meus eventos</Label>
        </div>
        <Combobox
          items={usersItems}
          label={'Funcionarios'}
          isMultiple
          value={guests}
          onChange={setGuests}
        />
        <Select onValueChange={setRooms} defaultValue="" value={room}>
          <SelectTrigger className=" max-w-[210px]">
            <SelectValue placeholder="Sala" />
          </SelectTrigger>
          <SelectContent>
            {rooms.map((d) => (
              <SelectItem key={d.value} value={d.id.toString()}>
                {d.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={cleanFilters}>Limpar</Button>
        <Button onClick={getMeetings}>Aplicar</Button>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          start: 'today prev,next',
          end: 'dayGridMonth timeGridWeek timeGridDay listWeek',
        }}
        height={'calc(100vh - 220px)'}
        locale={ptLocale}
        navLinks={true}
        selectable={true}
        nowIndicator={true}
        editable={true}
        scrollTime={format(new Date(), 'HH:mm:ss')}
        select={createEvent}
        eventClick={editEvent}
        eventDrop={dragEvent}
        events={mappedEntries}
        allDaySlot={false}
        slotMinTime="01:00:00"
        slotLabelContent={(args) => {
          const hour = args.date.getHours().toString().padStart(2, '0');
          const minute = args.date.getMinutes().toString().padStart(2, '0');
          return `${hour}:${minute}`;
        }}
      />
      <Popover open={openedCard} onOpenChange={setOpenedCard}>
        <PopoverTrigger
          key={`${entry.posX}-${entry.posY}-${entry.description}`}
          style={{
            position: 'absolute',
            left: entry.posX + 224,
            top: entry.posY,
          }}
        ></PopoverTrigger>
        <PopoverContent className="w-[28rem]">
          <TimerInput
            users={users}
            // @ts-ignore
            entry={entry}
            closeModal={() => setOpenedCard(false)}
          />
        </PopoverContent>
      </Popover>
    </>
  );
};

export default Agenda;
