'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant='outline' 
          size='icon'
          className={cn(
            "rounded-lg border-2 border-black neo-shadow",
            "hover:translate-y-[-2px] active:translate-y-[1px] transition-all duration-200"
          )}
        >
          <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-primary dark:-rotate-90 dark:scale-0' />
          <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all text-primary dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem 
          onClick={() => setTheme('light')} 
          className={cn("hover:bg-accent/10 font-medium", theme === 'light' && "bg-accent/5")}
        >
          <Sun className="h-4 w-4 mr-2 text-primary" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('dark')} 
          className={cn("hover:bg-accent/10 font-medium", theme === 'dark' && "bg-accent/5")}
        >
          <Moon className="h-4 w-4 mr-2 text-primary" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('system')} 
          className={cn("hover:bg-accent/10 font-medium", theme === 'system' && "bg-accent/5")}
        >
          <span className="mr-2 flex h-4 w-4 items-center justify-center text-primary text-xs">💻</span>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
