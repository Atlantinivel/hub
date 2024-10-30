// 'use client';

// import { Check } from 'lucide-react';
// import { useMemo } from 'react';

// import * as React from 'react';

// import { Button } from '@/components/ui/button';
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
// } from '@/components/ui/command';
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover';
// import { cn } from '@/lib/utils';

// type PropsType = {
//   items: { value: string; label: string }[];
//   label: React.ReactNode;
//   value: string | string[];
//   onChange: (value: string | string[]) => void;
//   isMultiple?: boolean;
//   disabled?: boolean;
// };

// export function Combobox({
//   items,
//   label,
//   value,
//   onChange,
//   isMultiple,
//   disabled,
// }: PropsType) {
//   const [open, setOpen] = React.useState(false);

//   const buttonText = useMemo(() => {
//     if (isMultiple && value.length > 0) {
//       if (value.length <= 2) {
//         return (value as string[]).map((selectedItem) => (
//           <span
//             className="mx-0.5 rounded-sm bg-accent p-1 text-xs"
//             key={selectedItem}
//           >
//             {items.find((item) => item.value === selectedItem)?.label}
//           </span>
//         ));
//       } else {
//         return (
//           <>
//             {(value as string[]).slice(0, 2).map((selectedItem) => (
//               <span
//                 className="mx-0.5 rounded-sm bg-accent p-1 text-xs"
//                 key={selectedItem}
//               >
//                 {items.find((item) => item.value === selectedItem)?.label}
//               </span>
//             ))}
//             <span className="mx-0.5 rounded-sm bg-accent p-1 text-xs">
//               +{value.length - 2}
//             </span>
//           </>
//         );
//       }
//     }

//     if (!isMultiple && value)
//       return items.find((item) => item.value === value)?.label;

//     return label;
//   }, [isMultiple, items, label, value]);

//   const handleSelect = (currentValue: string) => {
//     if (isMultiple) {
//       const newValue = [...(value as string[])];

//       if (newValue.includes(currentValue)) {
//         newValue.splice(newValue.indexOf(currentValue), 1);
//       } else {
//         newValue.push(currentValue);
//       }

//       onChange(newValue);
//       return;
//     }

//     onChange(currentValue === value ? '' : currentValue);
//     setOpen(false);
//   };

//   const isSelected = (itemValue: string) => {
//     return (
//       (isMultiple && value.includes(itemValue)) ||
//       (!isMultiple && value === itemValue)
//     );
//   };

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           role="combobox"
//           aria-expanded={open}
//           className="w-auto justify-between"
//           disabled={disabled}
//         >
//           {buttonText}
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-auto p-0">
//         <Command>
//           <CommandInput placeholder="Search..." />
//           <CommandEmpty>Nothing found.</CommandEmpty>
//           <CommandGroup>
//             {items.map((item) => (
//               <CommandItem
//                 key={item.value}
//                 value={item.label}
//                 onSelect={() => handleSelect(item.value)}
//               >
//                 <Check
//                   className={cn(
//                     'mr-2 h-4 w-4',
//                     isSelected(item.value) ? 'opacity-100' : 'opacity-0',
//                   )}
//                 />
//                 {item.label}
//               </CommandItem>
//             ))}
//           </CommandGroup>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// }


"use client";

import * as React from "react";
import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

type Framework = Record<"value" | "label", string>;

type PropsType = {
  items: Framework[];
  label: React.ReactNode;
  value: Framework[];
  onChange: (value: Framework[]) => void;
  disabled?: boolean;
};

export function Combobox({ items, label, value, onChange, disabled }: PropsType) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback((item: Framework) => {
    onChange(value.filter((s) => s.value !== item.value));
  }, [onChange, value]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if ((e.key === "Delete" || e.key === "Backspace") && input.value === "") {
          onChange(value.slice(0, -1));
        }
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [onChange, value]
  );

  const selectables = items.filter(
    (item) => !value.find(v => v.value === item.value)
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {value.map((item) => (
            <Badge key={item.value} variant="secondary">
              {item.label}
              <button
                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUnselect(item);
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleUnselect(item)}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={label as string}
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
            disabled={disabled}
          />
        </div>
      </div>
      <div className="relative mt-2">
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((item) => (
                  <CommandItem
                    key={item.value}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      setInputValue("");
                      onChange([...value, item]);
                    }}
                    className="cursor-pointer"
                  >
                    <Check className="mr-2 h-4 w-4 opacity-0" />
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}