import { auth } from '@clerk/nextjs';
import { MainNav } from '@/components/main-nav';
import StoreSwitcher from '@/components/store-switcher';
import { redirect } from 'next/navigation';
import prismadb from '@/lib/prismadb';
import { ThemeToggle } from './theme-toggle';
import { Sidebar } from './sidebar';
import { FileText } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { CustomUserButton } from './user-button';

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }
  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className='fixed top-0 w-full z-50 bg-background border-b-2 border-black shadow-sm'>
      <div className='flex h-16 items-center px-4 relative'>
        <StoreSwitcher items={stores} />
        <MainNav className='mx-6 hidden sm:block' />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeToggle />
          <Button variant="outline" size="icon" asChild className="rounded-lg border-2 border-black neo-shadow hover:translate-y-[-2px] active:translate-y-[1px] transition-all duration-200">
            <a href="/documentation" target="_blank">
              <FileText className="h-5 w-5 text-primary" />
            </a>
          </Button>
          <CustomUserButton />
        </div>
        <Sidebar />
      </div>
      <div className='absolute bottom-0 left-0 w-full h-[3px] bg-accent/30'></div>
    </div>
  );
};

export default Navbar;