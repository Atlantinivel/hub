import {
  format,
  subDays,
  addDays,
  isSameDay,
  differenceInDays,
  getDayOfYear,
  setDayOfYear,
} from 'date-fns';
import { ChangeEvent, FC } from 'react';

import { DatePicker } from '@/components/own/date-picker';
import { FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { ManualMethodProps } from './manualMethod.types';

const ManualMethod: FC<ManualMethodProps> = ({ form }) => {
  const handleChangeTime = (
    e: ChangeEvent<HTMLInputElement>,
    currentDate: Date,
    update: (value: Date) => void,
  ) => {
    const value = e.target.value;
    if (value) {
      const hours = e.target.value.split(':');
      const newTime = new Date(currentDate);
      newTime.setHours(Number(hours[0]), Number(hours[1]));
      update(newTime);
    }
  };

  const handleOnBlur = (startTime: Date, endTime: Date) => {
    const startTimeIsBigger =
      format(startTime, 'HH:mm') > format(endTime, 'HH:mm');

    const sameDay = isSameDay(startTime, endTime);

    // we are only comparing in times (HH:mm)
    // so if start time is bigger then end time (in HH:mm), end time must be 1 day later
    if (startTimeIsBigger && sameDay) {
      const newDate = addDays(endTime, 1);
      form.setValue('endTime', newDate);
      return;
    }

    // if the user sets the start time again to be less than the end time (in HH:mm), we set both to the same day
    if (!startTimeIsBigger && !sameDay) {
      const newDate = subDays(endTime, differenceInDays(endTime, startTime));
      form.setValue('endTime', newDate);
    }
  };

  // date picker serves to change the day of the start time
  const handleChangeDatePicker = (date: Date, currentDate: Date) => {
    // we get the day of the year, bc we only want to set the new day, without changing the hours, minutes and seconds
    const day = getDayOfYear(date);
    const newDate = setDayOfYear(currentDate, day);
    form.setValue('startTime', newDate);

    // if start time gets "3 more days", we set also "3 more days" to end time
    const days = differenceInDays(newDate, currentDate);
    const newEndTimeDate = addDays(form.getValues().endTime, days);
    form.setValue('endTime', newEndTimeDate);
  };

  return (
    <>
      <div className="flex items-center gap-1">
        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <Input
              name={field.name}
              value={format(field.value, 'HH:mm')}
              onChange={(e) => handleChangeTime(e, field.value, field.onChange)}
              onBlur={() => handleOnBlur(field.value, form.getValues().endTime)}
              type="time"
            />
          )}
        />
        -
        <div className="relative">
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => {
              const startTimeValue = form.getValues().startTime;
              const sameDay = isSameDay(field.value, startTimeValue);

              return (
                <>
                  <Input
                    name={field.name}
                    value={format(field.value, 'HH:mm')}
                    onChange={(e) =>
                      handleChangeTime(e, field.value, field.onChange)
                    }
                    onBlur={() => handleOnBlur(startTimeValue, field.value)}
                    type="time"
                  />
                  {!sameDay && (
                    <span className="absolute -right-[5px] -top-[5px] h-[18px] min-w-[18px] rounded-[30px] bg-black text-center text-xs font-semibold text-white">
                      1
                    </span>
                  )}
                </>
              );
            }}
          />
        </div>
      </div>

      <FormField
        control={form.control}
        name="startTime"
        render={({ field: { value } }) => {
          return (
            <DatePicker
              date={value}
              setDate={(date?: Date) =>
                // if date doesn't exist we set the start time to "today"
                handleChangeDatePicker(date ?? new Date(), value)
              }
            />
          );
        }}
      />
    </>
  );
};

export default ManualMethod;
