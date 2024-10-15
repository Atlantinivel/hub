export enum Method {
  Manual = 'manual',
  Timer = 'timer',
}

export type TimerInputProps = {
  entry?: {
    id: string;
    description?: string;
    guestsIds: any;
    guests: any;
    room: string;
    start: string;
    end: string;
    posX: number;
    posY: number;
    isEditing: boolean;
  };
  closeModal?: () => void;
};

export type EntryType = {
  description: string;
  creatorId: string;
  guestsIds: any[];
  guests: any[];
  room: string;
  startTime: string;
  endTime: string;
  id: string;
};
