'use client';

import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Image, 
  FolderOpen, 
  Ruler, 
  Palette, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings 
} from 'lucide-react';

export const AdminSidebar = () => {
  const pathName = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: 'Overview',
      icon: LayoutDashboard,
      active: pathName === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: 'Billboards',
      icon: Image,
      active: pathName === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: 'Categories',
      icon: FolderOpen,
      active: pathName === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: 'Sizes',
      icon: Ruler,
      active: pathName === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/colors`,
      label: 'Colors',
      icon: Palette,
      active: pathName === `/${params.storeId}/colors`,
    },
    {
      href: `/${params.storeId}/products`,
      label: 'Products',
      icon: Package,
      active: pathName === `/${params.storeId}/products`,
    },
    {
      href: `/${params.storeId}/orders`,
      label: 'Orders',
      icon: ShoppingCart,
      active: pathName === `/${params.storeId}/orders`,
    },
    {
      href: `/${params.storeId}/customers`,
      label: 'Customers',
      icon: Users,
      active: pathName === `/${params.storeId}/customers`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      icon: Settings,
      active: pathName === `/${params.storeId}/settings`,
    },
  ];

  return (
    <div className="h-full bg-[#ebebeb]">
      <nav className="p-4 space-y-1">
        {routes.map((route) => {
          const Icon = route.icon;
          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                route.active
                  ? 'bg-blue-50 text-[#1a1a1a] border-r-2 border-[#1a1a1a]'
                  : 'text-gray-600 hover:text-gray-900'
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{route.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};