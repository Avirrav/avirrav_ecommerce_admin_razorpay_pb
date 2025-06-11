'use client';

import { useEffect, useState, useCallback } from 'react';
import { MobileDashboard } from './mobile-dashboard';
import prismadb from '@/lib/prismadb';

interface MobileDetectorProps {
  children: React.ReactNode;
  storeId?: string;
  stores: any[];
}

export const MobileDetector = ({ children, storeId, stores }: MobileDetectorProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);

  const fetchDashboardData = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Fetch all required data for mobile dashboard
      const [ordersRes, productsRes] = await Promise.all([
        fetch(`/api/${storeId}/orders`).catch(() => ({ ok: false, json: () => Promise.resolve([]) })),
        fetch(`/api/${storeId}/products`).catch(() => ({ ok: false, json: () => Promise.resolve([]) })),
      ]);
      const orders = ordersRes.ok ? await ordersRes.json() : [];
      const products = productsRes.ok ? await productsRes.json() : [];

      // Ensure we have arrays
      const ordersArray = Array.isArray(orders) ? orders : [];
      const productsArray = Array.isArray(products) ? products : [];
      const storesArray = Array.isArray(stores) ? stores : [];
      console.log("Stores Array:", storesArray);
      // Format data for mobile components
      const formattedOrders = ordersArray.map((order: any) => {
        const orderItems = order.orderItems || [];
        const totalPrice = orderItems.reduce((total: number, item: any) => 
          total + (Number(item.product?.price || 0) * (item.quantity || 1)), 0);
        
        return {
          id: order.id || '',
          phone: order.phone || 'N/A',
          address: order.address || 'N/A',
          isPaid: Boolean(order.isPaid),
          totalPrice: `₹${totalPrice.toFixed(2)}`,
          products: orderItems.map((item: any) => item.product?.name || 'Unknown Product').join(', ') || 'No products',
          createdAt: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A',
          paymentStatus: order.paymentStatus || 'pending',
          orderStatus: order.orderStatus || 'draft',
        };
      });

      const formattedProducts = productsArray.map((product: any) => ({
        id: product.id || '',
        name: product.name || 'Unnamed Product',
        price: `₹${Number(product.price || 0).toFixed(2)}`,
        size: product.size?.name || 'N/A',
        category: product.category?.name || 'N/A',
        color: product.color?.value || '#000000',
        isFeatured: Boolean(product.isFeatured),
        isArchived: Boolean(product.isArchived),
        createdAt: product.createdAt ? new Date(product.createdAt).toLocaleDateString() : 'N/A',
        stockQuantity: Number(product.stockQuantity || 0),
      }));

      // Format stores for store switcher
      const formattedStores = storesArray.map((store: any) => ({
  // Remove this duplicate function as it's now defined above
        username: store.username || '',
        apiUrl: store.apiUrl || '',
        razorpayKeyId: store.razorpayKeyId || '',
      }));

      // Find current store
      const currentStore = formattedStores.find((store: any) => store.id === storeId) || {
        id: storeId || '',
        name: 'Current Store',
        username: '',
        apiUrl: '',
        razorpayKeyId: '',
      };

      // Calculate totals
      const totalRevenue = formattedOrders.reduce((total: number, order: any) => 
        total + parseFloat(order.totalPrice.replace('₹', '') || '0'), 0);
      
      const salesCount = formattedOrders.filter((order: any) => order.isPaid).length;
      
      const stockCount = formattedProducts.reduce((total: number, product: any) => 
        total + product.stockQuantity, 0);

      setDashboardData({
        orders: formattedOrders,
        products: formattedProducts,
        stores: formattedStores,
        store: currentStore,
        totalRevenue: `₹${totalRevenue.toFixed(2)}`,
        salesCount,
        stockCount,
      });
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Set empty data to prevent infinite loading
      setDashboardData({
        orders: [],
        products: [],
        stores: [],
        store: { id: storeId || '', name: 'Store', username: '', apiUrl: '', razorpayKeyId: '' },
        totalRevenue: '₹0.00',
        salesCount: 0,
        stockCount: 0,
      });
    } finally {
      setIsLoading(false);
    }
  }, [storeId, stores]);

  useEffect(() => {
    const checkDevice = () => {
      try {
        const userAgent = navigator.userAgent;
        const screenWidth = window.innerWidth;
        
        // Comprehensive mobile detection
        const isMobileUA = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        const isTabletUA = /iPad|Android(?=.*Tablet)|Tablet/i.test(userAgent);
        const isMobileScreen = screenWidth < 768;
        
        // Consider it mobile if it's a mobile device OR small screen (but not tablet)
        const isMobileDevice = (isMobileUA && !isTabletUA) || (isMobileScreen && !isTabletUA);
        
        setIsMobile(isMobileDevice);
        
        // Fetch data immediately if mobile is detected
        if (isMobileDevice && storeId) {
          fetchDashboardData();
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error detecting device:', error);
        setIsLoading(false);
      }
    };

    // Add a minimum loading time to prevent flashing
    const minLoadingTime = 1000; // 1 second
    const startTime = Date.now();

    checkDevice();
    
    // Listen for resize events
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const userAgent = navigator.userAgent;
      const isTabletUA = /iPad|Android(?=.*Tablet)|Tablet/i.test(userAgent);
      const isMobileUA = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      
      const isMobileDevice = (isMobileUA && !isTabletUA) || (screenWidth < 768 && !isTabletUA);
      setIsMobile(isMobileDevice);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [storeId, fetchDashboardData]);


  // Show loading animation while detecting mobile and fetching data
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-6">
          {/* Polaris-style loading animation */}
          <div className="relative">
            <div className="w-12 h-12 border-4 border-indigo-100 rounded-full animate-spin"></div>
            <div className="absolute top-0 left-0 w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">Loading Dashboard</h3>
            <p className="text-sm text-gray-600 animate-pulse">Preparing your experience...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show mobile dashboard if on mobile device and data is loaded
  if (isMobile && dashboardData && storeId) {
    return (
      <MobileDashboard
        storeId={storeId}
        stores={dashboardData.stores}
        totalRevenue={dashboardData.totalRevenue}
        salesCount={dashboardData.salesCount}
        stockCount={dashboardData.stockCount}
        orders={dashboardData.orders}
        products={dashboardData.products}
        store={dashboardData.store}
      />
    );
  }

  // Show desktop version for non-mobile devices
  return <>{children}</>;
};