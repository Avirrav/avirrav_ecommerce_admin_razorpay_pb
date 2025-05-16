'use client';
import { Menu } from 'lucide-react';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Footer from './footer';
import { Separator } from '@/components/ui/separator';

export function Sidebar() {
  const pathName = usePathname();

  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: 'Overview',
      active: pathName === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: 'Billboards',
      active: pathName === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: 'Categories',
      active: pathName === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: 'Sizes',
      active: pathName === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/colors`,
      label: 'Colors',
      active: pathName === `/${params.storeId}/colors`,
    },
    {
      href: `/${params.storeId}/products`,
      label: 'Products',
      active: pathName === `/${params.storeId}/products`,
    },
    {
      href: `/${params.storeId}/orders`,
      label: 'Orders',
      active: pathName === `/${params.storeId}/orders`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathName === `/${params.storeId}/settings`,
    },
  ];
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='md:hidden'>
          <Menu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="border-l-2 border-black rounded-l-lg dark:border-white">
        <SheetHeader>
          <SheetTitle className='flex justify-center font-bold border-b-2 border-primary pb-2'>ADMIN PANEL</SheetTitle>
        </SheetHeader>
        <div className='grid gap-4 justify-items-center py-6'>
          <div className='grid grid-cols-1 gap-6'>
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  'text-sm font-bold transition-colors hover:text-primary py-2 px-4 rounded-md',
                  route.active
                    ? 'text-accent-foreground bg-accent/20 border-2 border-black dark:border-white neo-shadow'
                    : 'text-muted-foreground'
                )}
              >
                {route.label}
              </Link>
            ))}
          </div>
          <SheetFooter className="border-t-2 border-primary/20 mt-4 pt-4 w-full">
            <Footer />
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
