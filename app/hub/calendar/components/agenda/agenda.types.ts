import { User, Tag } from '@/app/hub/calendar/timer.types';

export type Event = {
  id: string;
  description?: string;
  guestsIds?: any;
  room?: string;
  start: string;
  end: string;
  posX: number;
  posY: number;
  isEditing: boolean;
};

export type PropTypes = {
  users: User[];
  tags: Tag[];
};
