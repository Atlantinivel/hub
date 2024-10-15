type EventDataType = {
  id: string;
  description?: string;
  guestsIds: any;
  room: string;
  start: string;
  endTime?: string;
  startTime?: string;
  end: string;
};

type State = {
  events: EventDataType[];
};

type Actions = {
  addEvent: (event: EventDataType) => void;
  addEvents: (eventsFromApi: any) => void;
  removeEvent: (eventId: string) => void;
  editEvent: (event: EventDataType) => void;
};
