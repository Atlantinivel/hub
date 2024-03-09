'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
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

// @ts-ignore
const Agenda = ({ users, meetings }: PropTypes) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

  const eventStore = useEventStore();
  // @ts-ignore
  const addEvents = useEventStore((state) => state.addEvents);

  useEffect(() => {
    if (meetings) {
      addEvents(meetings);
    }
  }, [meetings, addEvents]);

  const [openedCard, setOpenedCard] = useState(false);
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

  console.log(meetings);

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
        color: 'purple'
      })),
    // @ts-ignore
    [eventStore.events],
  );

  return (
    <>
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
