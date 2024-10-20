'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';

import axios from 'axios';
import { toast } from '@/components/ui/use-toast';
import { useEffect, FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Combobox } from '@/components/ui/combobox';
import { Form, FormDescription, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
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

import { Checkbox } from '@/components/ui/checkbox';
import { EntryType, TimerInputProps } from './timerInput.types';
import useEventStore from '@/app/store/agendaStore';
import departmentsList from '@/static-data/departments.json';

const timerSchema = z.object({
  id: z.string().optional(),
  description: z.string().min(2),
  creatorId: z.string(),
  guestsIds: z.array(z.string()).optional(),
  room: z.string().optional(),
  duration: z.number().optional(),
  startTime: z.date(),
  endTime: z.date(),
  isOOO: z.boolean(),
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
  const [departments, setDepartments] = useState([]);
  const [isOOO, setIsOOO] = useState(false);

  const form = useForm<FormType>({
    resolver: zodResolver(timerSchema),
    defaultValues: {
      id: entry?.id,
      description: '',
      creatorId: '65bd343d627409b6f55d4b1e',
      guestsIds: entry?.guestsIds || [],
      room: entry?.room,
      duration: 0,
      startTime: new Date(),
      endTime: new Date(),
      isOOO: false,
    },
  });

  useEffect(() => {
    if (entry) {
      form.reset((prev) => ({
        ...prev,
        id: entry?.id || '',
        description: entry.description || '',
        guestsIds: entry.guestsIds || [],
        room: entry.room,
        startTime: new Date(entry.start),
        endTime: new Date(entry.end),
      }));
    }
  }, [entry, form]);

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

  const handleDepartmentChange = (departmentsState: any) => {
    setDepartments(departmentsState);
    const filteredListUsers = departmentsState?.map((id) => {
      const u = users.filter((user: any) => user.department == id);
      if (u.length > 0) {
        return u;
      }
    });

    const filteredUsers = filteredListUsers.filter((element: any) => {
      return element !== undefined;
    });

    if (filteredUsers.flat(1).length === 0) return;

    const listIdUsers = filteredUsers.flat(1).map((user: any) => user.id);

    const list = form.getValues().guestsIds;

    listIdUsers.map((id: string) => {
      if (!list!.includes(id)) {
        list!.push(id);
      }
    });

    form.setValue('guestsIds', list);
  };

  const usersItems = useMemo(
    //@ts-ignore
    () => users.map(({ id, name }) => ({ value: id.toString(), label: name })),
    [users],
  );

  const asd = form.getValues().isOOO;
  const departmentsItems = useMemo(
    //@ts-ignore
    () => departmentsList.map(({ id, value }) => ({ value: id, label: value })),
    [departmentsList],
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
        <FormField
          control={form.control}
          name="isOOO"
          render={({ field }) => (
            <>
              <FormDescription>Indisponível</FormDescription>
              <Checkbox
                checked={field.value}
                onCheckedChange={(e) => {
                  setIsOOO(!field.value);
                  field.onChange(e);
                }}
                {...field}
              />
            </>
          )}
        />

        {!isOOO && (
          <>
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

            <Combobox
              items={departmentsItems}
              label={'Departamentos'}
              isMultiple
              value={departments}
              onChange={handleDepartmentChange}
            />
            <FormField
              control={form.control}
              name="room"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
          </>
        )}

        <div className="flex flex-wrap items-center gap-4 ">
          <ManualMethod form={form} isOOO={isOOO} />
        </div>
        <div className="flex items-center gap-4">
          <Button type="submit">
            {entry?.isEditing ? 'Gravar' : 'Adicionar'}
          </Button>
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
