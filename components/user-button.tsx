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
        <button className="relative h-8 w-8 rounded-lg border border-gray-600 overflow-hidden hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center bg-gray-800 text-gray-300 hover:text-white">
          <User className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 p-2 bg-white border border-gray-200 shadow-lg">
        <div className="flex items-center gap-3 p-2 mb-2 border-b border-gray-200 pb-2">
          <div className="h-8 w-8 rounded-lg border border-gray-200 shadow-sm flex items-center justify-center bg-white">
            <User className="h-4 w-4 text-gray-600" />
          </div>
          <div className="flex flex-col min-w-0">
            <p className="text-sm font-medium truncate text-gray-900">{user.fullName}</p>
            <p className="text-xs text-gray-600 truncate">{user.primaryEmailAddress?.emailAddress}</p>
          </div>
        </div>
        <DropdownMenuItem 
          onClick={() => openUserProfile()}
          className="cursor-pointer hover:bg-gray-50 py-2 text-gray-900"
        >
          <User className="mr-2 h-4 w-4" />
          Go to Account
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => {
            signOut(() => {
              window.location.href = '/';
            });
          }}
          className="cursor-pointer text-red-600 hover:bg-red-50 py-2"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};