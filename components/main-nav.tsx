'use client';

import { useParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
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
      href: `/${params.storeId}/customers`,
      label: 'Customers',
      active: pathName === `/${params.storeId}/customers`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathName === `/${params.storeId}/settings`,
    },
  ];

  return (
    <div className={cn('flex items-center space-x-6 lg:space-x-8', className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-body font-medium polaris-transition relative py-2 hover:text-primary',
            route.active
              ? 'text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:rounded-full'
              : 'text-muted-foreground'
          )}
        >
          {route.label}
        </Link>
      ))}
    </div>
  );
}