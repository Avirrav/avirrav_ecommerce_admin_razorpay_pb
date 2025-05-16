'use client';

import { useState, useEffect } from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export const CustomUserButton = () => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !user) return null;

  // Extract user initials for avatar fallback
  const initials = user.firstName && user.lastName
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
    : user.emailAddresses[0]?.emailAddress.charAt(0).toUpperCase() || '?';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative h-9 w-9 rounded-lg border-2 border-black neo-shadow overflow-hidden hover:translate-y-[-2px] active:translate-y-[1px] transition-all duration-200 focus:outline-none flex items-center justify-center bg-primary/5">
          <User className="h-5 w-5 text-primary" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 p-2">
        <div className="flex items-center gap-3 p-2 mb-2 border-b-2 border-primary/10 pb-2">
          <div className="h-9 w-9 rounded-lg border-2 border-black neo-shadow flex items-center justify-center bg-primary/5">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div className="flex flex-col min-w-0">
            <p className="text-sm font-bold truncate">{user.fullName}</p>
            <p className="text-xs text-primary/70 truncate">{user.primaryEmailAddress?.emailAddress}</p>
          </div>
        </div>
        <DropdownMenuItem 
          onClick={() => openUserProfile()}
          className="font-medium cursor-pointer hover:bg-accent/10 py-2"
        >
          <User className="mr-2 h-4 w-4 text-primary" />
          Go to Account
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => {
            signOut(() => {
              window.location.href = '/';
            });
          }}
          className="font-medium cursor-pointer text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 py-2"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}; 