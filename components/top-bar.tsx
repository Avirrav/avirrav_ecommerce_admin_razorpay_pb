'use client';

import { Search, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from './theme-toggle';
import { CustomUserButton } from './user-button';
import { Button } from './ui/button';
import { FileText } from 'lucide-react';
import StoreSwitcher from './store-switcher';
import { useState } from 'react';
import { AdminSidebar } from './admin-sidebar';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

interface TopBarProps {
  stores: any[];
}

export const TopBar = ({ stores }: TopBarProps) => {
  return (
    <div className="h-14 bg-[#1a1a1a] flex items-center px-4 md:px-6">
      {/* Mobile Menu Button */}
      <div className="md:hidden mr-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon-sm" className="text-gray-300 hover:text-white hover:bg-gray-800">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="h-full bg-gray-100">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900">Navigation</h2>
              </div>
              <AdminSidebar />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Left - Store Switcher */}
      <div className="flex items-center">
        <StoreSwitcher items={stores} />
      </div>

      {/* Center - Search Bar (Hidden on mobile) */}
      <div className="hidden md:flex flex-1 justify-center px-8">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search..."
            className="pl-10 h-9 bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-500 focus:bg-gray-700 rounded-md w-full"
          />
        </div>
      </div>

      {/* Right - User Actions */}
      <div className="flex items-center space-x-2 ml-auto">
        <ThemeToggle />
        <Button variant="ghost" size="icon-sm" asChild className="text-gray-300 hover:text-white hover:bg-gray-800 border-0">
          <a href="/documentation" target="_blank">
            <FileText className="h-4 w-4" />
          </a>
        </Button>
        <CustomUserButton />
      </div>
    </div>
  );
};