import Footer from '@/components/footer';
import { TopBar } from '@/components/top-bar';
import { AdminSidebar } from '@/components/admin-sidebar';
import { MobileDetector } from '@/components/mobile/mobile-detector';
import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
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

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <MobileDetector stores={stores} storeId={params.storeId}>
      <div className="h-screen flex flex-col bg-gray-900 overflow-hidden">
        {/* Top Section - Fixed header */}
        <div className="h-14 flex-shrink-0 relative z-50">
          <TopBar stores={stores} />
        </div>

        {/* Bottom Section with curved border - White background */}
        <div className="flex-1 flex rounded-t-3xl bg-white shadow-lg relative overflow-hidden">
          {/* Left Sidebar - Hidden on mobile */}
          <div className="hidden md:block w-56 flex-shrink-0 bg-white border-r border-gray-200 overflow-hidden">
            <div className="h-full overflow-y-auto">
              <AdminSidebar />
            </div>
          </div>

          {/* Main Content - Scrollable area with proper text colors */}
          <div className="flex-1 flex flex-col min-h-0 bg-white overflow-hidden">
            <main className="flex-1 overflow-y-auto">
              <div className="p-3 md:p-6">
                <div className="max-w-full text-gray-900">
                  {children}
                </div>
              </div>
              <div className="flex-shrink-0">
                <Footer />
              </div>
            </main>
          </div>
        </div>
      </div>
    </MobileDetector>
  );
}