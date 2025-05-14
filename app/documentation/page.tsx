import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'API Documentation',
  description: 'API Documentation for store integration',
};

export default function DocumentationPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">API Documentation</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Available Endpoints</h2>
        
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-medium mb-3">Products</h3>
            <p className="text-gray-600 mb-2">GET /api/[storeId]/products</p>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
              <code>{`// Response format
{
  id: string;
  name: string;
  price: string;
  isFeatured: boolean;
  size: { id: string, name: string, value: string };
  color: { id: string, name: string, value: string };
  category: { id: string, name: string };
  images: { id: string, url: string }[];
}`}</code>
            </pre>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-medium mb-3">Categories</h3>
            <p className="text-gray-600 mb-2">GET /api/[storeId]/categories</p>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
              <code>{`// Response format
{
  id: string;
  name: string;
  billboard: {
    id: string;
    label: string;
    imageUrl: string;
  };
}`}</code>
            </pre>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-medium mb-3">Billboards</h3>
            <p className="text-gray-600 mb-2">GET /api/[storeId]/billboards</p>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
              <code>{`// Response format
{
  id: string;
  label: string;
  imageUrl: string;
}`}</code>
            </pre>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-medium mb-3">Colors</h3>
            <p className="text-gray-600 mb-2">GET /api/[storeId]/colors</p>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
              <code>{`// Response format
{
  id: string;
  name: string;
  value: string; // hex color code
}`}</code>
            </pre>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-medium mb-3">Sizes</h3>
            <p className="text-gray-600 mb-2">GET /api/[storeId]/sizes</p>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
              <code>{`// Response format
{
  id: string;
  name: string;
  value: string;
}`}</code>
            </pre>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-medium mb-3">Checkout</h3>
            <p className="text-gray-600 mb-2">POST /api/[storeId]/checkout</p>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
              <code>{`// Request format
{
  productIds: string[];
  amount: number;
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// Response format
{
  orderId: string;
  amount: number;
  currency: string;
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Example Usage</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
          <code>{`// Fetch products with filters
const getProducts = async (query: {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}) => {
  const url = qs.stringifyUrl({
    url: \`\${process.env.NEXT_PUBLIC_API_URL}/products\`,
    query: {
      colorId: query.colorId,
      sizeId: query.sizeId,
      categoryId: query.categoryId,
      isFeatured: query.isFeatured,
    },
  });

  const res = await fetch(url);
  return res.json();
};`}</code>
        </pre>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Required Environment Variables</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
          <code>{`NEXT_PUBLIC_API_URL=your_admin_dashboard_api_url
NEXT_PUBLIC_ADMIN_URL=your_admin_dashboard_url
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id`}</code>
        </pre>
      </section>
    </div>
  );
}