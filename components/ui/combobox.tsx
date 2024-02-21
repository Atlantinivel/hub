'use client';

import { Check } from 'lucide-react';
import { useMemo } from 'react';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type PropsType = {
  items: { value: string; label: string }[];
  label: React.ReactNode;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  isMultiple?: boolean;
  disabled?: boolean;
};

export function Combobox({
  items,
  label,
  value,
  onChange,
  isMultiple,
  disabled,
}: PropsType) {
  const [open, setOpen] = React.useState(false);

  const buttonText = useMemo(() => {
    if (isMultiple && value.length > 0)
      return (value as string[]).map((selectedItem) => (
        <span
          className="mx-0.5 rounded-sm bg-accent p-1 text-xs"
          key={selectedItem}
        >
          {items.find((item) => item.value === selectedItem)?.label}
        </span>
      ));

    if (!isMultiple && value)
      return items.find((item) => item.value === value)?.label;

    return label;
  }, [isMultiple, items, label, value]);

  const handleSelect = (currentValue: string) => {
    if (isMultiple) {
      const newValue = [...(value as string[])];

      if (newValue.includes(currentValue)) {
        newValue.splice(newValue.indexOf(currentValue), 1);
      } else {
        newValue.push(currentValue);
      }

      onChange(newValue);
      return;
    }

    onChange(currentValue === value ? '' : currentValue);
    setOpen(false);
  };

  const isSelected = (itemValue: string) => {
    return (
      (isMultiple && value.includes(itemValue)) ||
      (!isMultiple && value === itemValue)
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-auto justify-between"
          disabled={disabled}
        >
          {buttonText}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>Nothing found.</CommandEmpty>
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                key={item.value}
                value={item.label}
                onSelect={() => handleSelect(item.value)}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    isSelected(item.value) ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
