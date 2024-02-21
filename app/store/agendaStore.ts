import { create } from 'zustand';

const useEventStore = create((set) => ({
  events: [],
  addEvents: (eventsFromApi: any) =>
    set(() => ({
      events: eventsFromApi,
    })),
  addEvent: (event: any) =>
    set((state: any) => ({ events: [...state.events, event] })),
  removeEvent: (eventId: string) =>
    set((state: any) => ({
      events: state.events.filter((event: any) => event.id !== eventId),
    })),
  editEvent: (event: any) =>
    set((state: any) => ({
      events: [
        ...state.events.filter((prevEvent: any) => prevEvent.id !== event.id),
        event,
      ],
    })),
}));

export default useEventStore;
