'use client';

import { getGraphRevenue } from '@/actions/get-graph-revenue';
import { getSalesCount } from '@/actions/get-sales-count';
import { getStockCount } from '@/actions/get-stock-count';
import { getTotalRevenue } from '@/actions/get-total-revenue';
import { Overview } from '@/components/overview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { formatter } from '@/lib/utils';
import { CreditCard, DollarSign, Package } from 'lucide-react';
import { useEffect, useState } from 'react';
import prismadb from '@/lib/prismadb';

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage = ({ params }: DashboardPageProps) => {
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [salesCount, setSalesCount] = useState<number>(0);
  const [stockCount, setStockCount] = useState<number>(0);
  const [graphRevenue, setGraphRevenue] = useState<any[]>([]);
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString());

  useEffect(() => {
    const loadData = async () => {
      const revenue = await getTotalRevenue(params.storeId);
      const sales = await getSalesCount(params.storeId);
      const stock = await getStockCount(params.storeId);
      const graph = await getGraphRevenue(params.storeId);

      setTotalRevenue(revenue);
      setSalesCount(sales);
      setStockCount(stock);
      setGraphRevenue(graph);
    };

    loadData();

    // Update clock every second
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, [params.storeId]);

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-4 md:p-8 md:pt-6'>
        <div className="flex items-center justify-between">
          <Heading title='Dashboard' description='Overview of your store' />
          <div className="text-xl font-semibold">
            {time}
          </div>
        </div>
        <Separator />
        <div className='grid gap-4 md:grid-cols-3'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Revenue
              </CardTitle>
              <DollarSign className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Sales</CardTitle>
              <CreditCard className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>+{salesCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Products in Stock</CardTitle>
              <Package className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{stockCount}</div>
            </CardContent>
          </Card>
        </div>
        <Card className='md:col-span-1'>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className='pl-2'>
            <Overview data={graphRevenue} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;