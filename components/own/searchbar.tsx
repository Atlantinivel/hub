'use client';

import { Prisma, Post } from '@prisma/client';
import axios from 'axios';
import { Users } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { FC, useCallback, useEffect, useRef, useState } from 'react';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = () => {
  const [input, setInput] = useState<string>('');
  const pathname = usePathname();
  const commandRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    setInput('');
  }, [pathname]);

  return (
    <Command
      ref={commandRef}
      className="relative rounded-lg border max-w-lg z-50 overflow-visible"
    >
      <CommandInput
        onValueChange={(text) => {
          setInput(text);
        }}
        value={input}
        className="outline-none border-none focus:border-none focus:outline-none ring-0"
        placeholder="Search communities..."
      />

      {input.length > 0 && (
        <CommandList className="absolute bg-white top-full inset-x-0 shadow rounded-b-md"></CommandList>
      )}
    </Command>
  );
};

export default SearchBar;
