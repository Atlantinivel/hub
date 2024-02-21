'use client';

import { zodResolver } from '@hookform/resolvers/zod';

import axios from 'axios';
import { toast } from '@/components/ui/use-toast';
import { useEffect, FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Combobox } from '@/components/ui/combobox';
import { Form, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Toggle } from '@/components/ui/toggle';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

import ManualMethod from './manualMethod/manualMethod';
import rooms from '@/static-data/rooms.json';

import { EntryType, TimerInputProps } from './timerInput.types';
import useEventStore from '@/app/store/agendaStore';

const timerSchema = z.object({
  id: z.string().optional(),
  description: z.string().min(2),
  creatorId: z.string(),
  guestsIds: z.array(z.string()).optional(),
  room: z.string().optional(),
  duration: z.number().optional(),
  startTime: z.date(),
  endTime: z.date(),
});

export type FormType = z.infer<typeof timerSchema>;

const TimerInput: FC<TimerInputProps> = ({
  // @ts-ignore
  users,
  entry,
  closeModal,
}) => {
  const eventStore = useEventStore();
  // @ts-ignore
  const removeEvent = useEventStore((state) => state.removeEvent);

  const form = useForm<FormType>({
    resolver: zodResolver(timerSchema),
    defaultValues: {
      id: entry?.id,
      description: '',
      creatorId: '65bd343d627409b6f55d4b1e',
      guestsIds: entry?.guestsIds || [],
      room: entry?.room || '',
      duration: 0,
      startTime: new Date(),
      endTime: new Date(),
    },
  });

  useEffect(() => {
    if (entry) {
      form.reset((prev) => ({
        ...prev,
        id: entry?.id || '',
        description: entry.description || '',
        guestsIds: entry.guestsIds || [],
        room: entry.room || '',
        startTime: new Date(entry.start),
        endTime: new Date(entry.end),
      }));
    }
  }, [entry, form]);

  console.log(form.getValues());

  const onSubmit = async ({
    duration,
    ...values
  }: z.infer<typeof timerSchema>) => {
    const endTime = values.endTime;

    const result = await axios.post<EntryType>(
      `/api/meeting`,
      {
        data: {
          ...values,
          endTime,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('entrou', entry, values, result);

    if (entry?.isEditing) {
      // @ts-ignore
      eventStore.editEvent({
        id: entry.id,
        description: result.data.description,
        guestsIds: result.data.guestsIds,
        room: result.data.room,
        start: result.data.startTime,
        end: result.data.endTime,
      });
    } else {
      // @ts-ignore
      eventStore.addEvent({
        id: result.data.id,
        description: result.data.description,
        guestsIds: result.data.guestsIds,
        room: result.data.room,
        start: result.data.startTime,
        end: result.data.endTime,
      });
    }

    closeModal?.();
    form.reset();
  };

  const removeMeeting = async () => {
    const result = await axios.delete<any, any>(`/api/meeting/${entry!.id}`);
    if (result.data.ok) {
      removeEvent(entry!.id);

      toast({
        title: 'Reuniao removida.',
      });
    } else {
      toast({
        title: 'Algo correu mal.',
      });
    }
    closeModal?.();
  };

  const usersItems = useMemo(
    //@ts-ignore
    () => users.map(({ id, name }) => ({ value: id, label: name })),
    [users],
  );
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-6 flex min-h-[70px] flex-wrap items-center gap-4 rounded-md border p-3 mt-3"
      >
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <Input
              placeholder="Descrição da reunião"
              {...field}
              className="min-w-56 flex-1 sm:min-w-80"
            />
          )}
        />
        <div className="flex flex-col items-start gap-4">
          <FormField
            control={form.control}
            name="guestsIds"
            render={({ field }) => (
              <Combobox
                items={usersItems}
                label={'Convidados'}
                isMultiple
                value={field.value || ''}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="room"
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          )}
        />

        <div className="flex flex-wrap items-center gap-4 ">
          <ManualMethod form={form} />
        </div>
        <div className="flex items-center gap-4">
          <Button type="submit">{entry?.isEditing ? 'Save' : 'Add'}</Button>
          {entry?.isEditing && (
            <Button type="button" onClick={() => removeMeeting()}>
              {'Remover'}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default TimerInput;
