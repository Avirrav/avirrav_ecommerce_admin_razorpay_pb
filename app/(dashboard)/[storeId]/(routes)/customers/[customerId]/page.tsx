import { redirect } from 'next/navigation';
import prismadb from "@/lib/prismadb";
import { CustomerForm } from './components/customer-form';

const CustomerPage = async ({
  params
}: {
  params: { customerId: string, storeId: string }
}) => {
  // Redirect to customers page if trying to access "new" route
  if (params.customerId === 'new') {
    redirect(`/${params.storeId}/customers`);
  }

  const customer = await prismadb.customer.findUnique({
    where: {
      id: params.customerId
    }
  });

  if (!customer) {
    redirect(`/${params.storeId}/customers`);
  }

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CustomerForm initialData={customer} />
      </div>
    </div>
  );
}

export default CustomerPage;