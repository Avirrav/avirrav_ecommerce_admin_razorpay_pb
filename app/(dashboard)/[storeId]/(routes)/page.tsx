import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { getGraphRevenue } from '@/actions/get-graph-revenue';
import { getSalesCount } from '@/actions/get-sales-count';
import { getStockCount } from '@/actions/get-stock-count';
import { getTotalRevenue } from '@/actions/get-total-revenue';
import { Overview } from '@/components/overview';
import { SetupGuide } from '@/components/setup-guide';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { formatter } from '@/lib/utils';
import { CreditCard, DollarSign, Package } from 'lucide-react';

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage = async ({ params }: DashboardPageProps) => {
  const totalRevenue = await getTotalRevenue(params.storeId);
  const salesCount = await getSalesCount(params.storeId);
  const stockCount = await getStockCount(params.storeId);
  const graphRevenue = await getGraphRevenue(params.storeId);
  const { userId } = auth();
  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect('/');
  }

  // Check if billboards exist
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  // Check if categories exist
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  // Check if colors exist
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  // Check if sizes exist
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  // Check if products exist
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const steps = [
    {
      title: "Store Details",
      description: "Fill in your store details including name, username, and API URL",
      completed: !!store.name && !!store.username && !!store.apiUrl
    },
    {
      title: "Create Billboards",
      description: "Add promotional billboards for your store",
      completed: billboards.length > 0
    },
    {
      title: "Add Categories",
      description: "Create product categories for better organization",
      completed: categories.length > 0
    },
    {
      title: "Add Colors",
      description: "Define available colors for your products",
      completed: colors.length > 0
    },
    {
      title: "Add Sizes",
      description: "Define available sizes for your products",
      completed: sizes.length > 0
    },
    {
      title: "Add Products",
      description: "Start adding products to your store",
      completed: products.length > 0
    }
  ];


  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-4 md:p-8 md:pt-6'>
        <Heading title='Dashboard' description='Overview of your store' />
        <Separator />
        <SetupGuide steps={steps} />
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
              <CardTitle className='text-sm font-medium'>Stocks</CardTitle>
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
