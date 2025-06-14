import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'API Documentation & Integration Guide',
  description: 'Complete API documentation and integration guide for store management',
};

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-slate-900">API Documentation & Integration Guide</h1>
          <p className="text-lg text-slate-600">Complete guide for integrating your store with the Pugly Dashboard API</p>
        </div>

        {/* Quick Start Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-slate-900 border-b border-slate-200 pb-2">🚀 Quick Start</h2>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4 text-blue-900">Getting Started in 3 Steps</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <h4 className="font-semibold text-blue-900">Create Your Store</h4>
                  <p className="text-blue-700">Sign up and create your first store in the dashboard</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <h4 className="font-semibold text-blue-900">Configure Your Store</h4>
                  <p className="text-blue-700">Set up billboards, categories, colors, sizes, and products</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <h4 className="font-semibold text-blue-900">Connect Your Frontend</h4>
                  <p className="text-blue-700">Use our API endpoints to fetch data and create orders</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Store Connection Guide */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-slate-900 border-b border-slate-200 pb-2">🔗 Store Connection Guide</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-slate-900">Dashboard Setup</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-emerald-500 pl-4">
                  <h4 className="font-semibold text-emerald-800">1. Store Configuration</h4>
                  <p className="text-sm text-slate-600">Go to Settings → Configure store name, username, and API URL</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-blue-800">2. Payment Setup</h4>
                  <p className="text-sm text-slate-600">Add Razorpay credentials for payment processing</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-purple-800">3. Content Management</h4>
                  <p className="text-sm text-slate-600">Create billboards, categories, and products</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-slate-900">Frontend Integration</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-orange-800">1. Environment Setup</h4>
                  <p className="text-sm text-slate-600">Configure API URLs and keys in your frontend</p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-red-800">2. API Integration</h4>
                  <p className="text-sm text-slate-600">Fetch products, categories, and handle checkout</p>
                </div>
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h4 className="font-semibold text-indigo-800">3. Payment Flow</h4>
                  <p className="text-sm text-slate-600">Implement Razorpay checkout and verification</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-slate-900">Required Environment Variables</h3>
            <pre className="bg-slate-800 text-emerald-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Frontend Environment Variables
NEXT_PUBLIC_API_URL=https://your-dashboard-domain.com/api/[storeId]
NEXT_PUBLIC_ADMIN_URL=https://your-dashboard-domain.com
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id

# Dashboard Environment Variables (Already configured)
DATABASE_URL=your_database_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret`}
            </pre>
          </div>
        </section>

        {/* Polaris Design System */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-slate-900 border-b border-slate-200 pb-2">🎨 Polaris Design System</h2>
          
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4 text-purple-900">Design Philosophy</h3>
            <p className="text-purple-800 mb-4">
              Our dashboard follows Shopify&apos;s Polaris design system, ensuring a professional, accessible, and intuitive user experience.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-2">Consistency</h4>
                <p className="text-sm text-purple-700">Unified visual language across all components</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-2">Accessibility</h4>
                <p className="text-sm text-purple-700">WCAG compliant with proper contrast ratios</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-2">Efficiency</h4>
                <p className="text-sm text-purple-700">Optimized for productivity and ease of use</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-slate-900">Color Palette</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
                  <div>
                    <p className="font-medium text-slate-900">Primary Blue</p>
                    <p className="text-sm text-slate-600">#5c6ac4</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-600 rounded-lg"></div>
                  <div>
                    <p className="font-medium text-slate-900">Success Green</p>
                    <p className="text-sm text-slate-600">#50b83c</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-600 rounded-lg"></div>
                  <div>
                    <p className="font-medium text-slate-900">Critical Red</p>
                    <p className="text-sm text-slate-600">#de3618</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-amber-500 rounded-lg"></div>
                  <div>
                    <p className="font-medium text-slate-900">Warning Yellow</p>
                    <p className="text-sm text-slate-600">#ffc453</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-slate-900">Typography Scale</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-2xl font-semibold text-slate-900">Display Large</p>
                  <p className="text-sm text-slate-600">32px / 40px - Page titles</p>
                </div>
                <div>
                  <p className="text-xl font-semibold text-slate-900">Display</p>
                  <p className="text-sm text-slate-600">24px / 32px - Section headers</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-900">Heading</p>
                  <p className="text-sm text-slate-600">16px / 24px - Card titles</p>
                </div>
                <div>
                  <p className="text-base text-slate-900">Body</p>
                  <p className="text-sm text-slate-600">14px / 20px - Main content</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Caption</p>
                  <p className="text-xs text-slate-500">11px / 16px - Helper text</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-slate-900">Component Guidelines</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Buttons</h4>
                <div className="space-y-2">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">Primary</button>
                  <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-50 transition-colors">Secondary</button>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors">Destructive</button>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Cards</h4>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <h5 className="font-medium text-slate-900 mb-1">Card Title</h5>
                  <p className="text-sm text-slate-600">Card content with proper spacing and typography</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Status Badges</h4>
                <div className="space-y-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">Active</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">Pending</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Inactive</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* API Endpoints */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-slate-900 border-b border-slate-200 pb-2">📡 API Endpoints</h2>
          
          <div className="space-y-8">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-slate-900 flex items-center">
                <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-sm font-mono mr-3">GET</span>
                Products
              </h3>
              <p className="text-slate-600 mb-4">Fetch all products with optional filtering</p>
              <div className="bg-slate-50 rounded-lg p-4 mb-4">
                <code className="text-sm text-slate-800">GET /api/[storeId]/products</code>
              </div>
              <div className="mb-4">
                <h4 className="font-semibold text-slate-900 mb-2">Query Parameters</h4>
                <div className="space-y-2 text-sm">
                  <div><code className="bg-slate-100 px-2 py-1 rounded">categoryId</code> - Filter by category</div>
                  <div><code className="bg-slate-100 px-2 py-1 rounded">colorId</code> - Filter by color</div>
                  <div><code className="bg-slate-100 px-2 py-1 rounded">sizeId</code> - Filter by size</div>
                  <div><code className="bg-slate-100 px-2 py-1 rounded">isFeatured</code> - Show only featured products</div>
                </div>
              </div>
              <pre className="bg-slate-800 text-emerald-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// Response format
{
  "id": "product_id",
  "name": "Product Name",
  "description": "Product description",
  "price": "99.99",
  "sku": "PROD-001",
  "stockQuantity": 10,
  "isFeatured": true,
  "isArchived": false,
  "category": {
    "id": "cat_id",
    "name": "Category Name"
  },
  "size": {
    "id": "size_id", 
    "name": "Large",
    "value": "L"
  },
  "color": {
    "id": "color_id",
    "name": "Red", 
    "value": "#FF0000"
  },
  "images": [
    {
      "id": "img_id",
      "url": "https://example.com/image.jpg"
    }
  ]
}`}
              </pre>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-slate-900 flex items-center">
                <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-sm font-mono mr-3">GET</span>
                Categories
              </h3>
              <p className="text-slate-600 mb-4">Fetch all categories with associated billboards</p>
              <div className="bg-slate-50 rounded-lg p-4 mb-4">
                <code className="text-sm text-slate-800">GET /api/[storeId]/categories</code>
              </div>
              <pre className="bg-slate-800 text-emerald-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// Response format
{
  "id": "category_id",
  "name": "Category Name",
  "billboard": {
    "id": "billboard_id",
    "label": "Billboard Text",
    "imageUrl": "https://example.com/billboard.jpg"
  }
}`}
              </pre>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-slate-900 flex items-center">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-mono mr-3">POST</span>
                Checkout
              </h3>
              <p className="text-slate-600 mb-4">Create a new order and initiate payment</p>
              <div className="bg-slate-50 rounded-lg p-4 mb-4">
                <code className="text-sm text-slate-800">POST /api/[storeId]/checkout</code>
              </div>
              <pre className="bg-slate-800 text-emerald-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// Request body
{
  "productIds": ["prod_1", "prod_2"],
  "amount": 19998, // Amount in paise (₹199.98)
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "addressLine1": "123 Main Street",
  "addressLine2": "Apt 4B",
  "city": "Mumbai",
  "state": "Maharashtra", 
  "postalCode": "400001",
  "country": "India"
}

// Response
{
  "id": "order_id",
  "amount": 19998,
  "currency": "INR",
  "receipt": "order_receipt"
}`}
              </pre>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-slate-900 flex items-center">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-mono mr-3">POST</span>
                Payment Verification
              </h3>
              <p className="text-slate-600 mb-4">Verify Razorpay payment and update order status</p>
              <div className="bg-slate-50 rounded-lg p-4 mb-4">
                <code className="text-sm text-slate-800">POST /api/[storeId]/verify-payment</code>
              </div>
              <pre className="bg-slate-800 text-emerald-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// Request body
{
  "razorpay_order_id": "order_id",
  "razorpay_payment_id": "payment_id", 
  "razorpay_signature": "signature_hash"
}

// Response
{
  "message": "Payment verified successfully",
  "order": {
    "id": "order_id",
    "isPaid": true,
    "paymentStatus": "paid"
  }
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* Integration Examples */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-slate-900 border-b border-slate-200 pb-2">💻 Integration Examples</h2>
          
          <div className="space-y-8">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-slate-900">Fetching Products</h3>
              <pre className="bg-slate-800 text-emerald-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// Using fetch API
const getProducts = async (storeId, filters = {}) => {
  const params = new URLSearchParams(filters);
  const url = \`\${process.env.NEXT_PUBLIC_API_URL}/\${storeId}/products?\${params}\`;
  
  const response = await fetch(url);
  const products = await response.json();
  
  return products;
};

// Usage examples
const allProducts = await getProducts('store_123');
const featuredProducts = await getProducts('store_123', { isFeatured: true });
const categoryProducts = await getProducts('store_123', { categoryId: 'cat_456' });`}
              </pre>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-slate-900">Razorpay Integration</h3>
              <pre className="bg-slate-800 text-emerald-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// 1. Create order
const createOrder = async (orderData) => {
  const response = await fetch(\`\${API_URL}/checkout\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  return response.json();
};

// 2. Initialize Razorpay
const initializePayment = (orderData) => {
  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: orderData.amount,
    currency: 'INR',
    name: 'Your Store Name',
    description: 'Purchase Description',
    order_id: orderData.id,
    handler: async (response) => {
      // 3. Verify payment
      await fetch(\`\${API_URL}/verify-payment\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature
        })
      });
    },
    prefill: {
      name: orderData.fullName,
      email: orderData.email,
      contact: orderData.phone
    }
  };
  
  const razorpay = new window.Razorpay(options);
  razorpay.open();
};`}
              </pre>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-slate-900">React Hook Example</h3>
              <pre className="bg-slate-800 text-emerald-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// Custom hook for products
import { useState, useEffect } from 'react';

export const useProducts = (storeId, filters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams(filters);
        const response = await fetch(
          \`\${process.env.NEXT_PUBLIC_API_URL}/\${storeId}/products?\${params}\`
        );
        
        if (!response.ok) throw new Error('Failed to fetch');
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [storeId, JSON.stringify(filters)]);

  return { products, loading, error };
};

// Usage in component
const ProductList = ({ storeId }) => {
  const { products, loading, error } = useProducts(storeId, { isFeatured: true });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};`}
              </pre>
            </div>
          </div>
        </section>

        {/* Error Handling */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-slate-900 border-b border-slate-200 pb-2">⚠️ Error Handling</h2>
          
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-slate-900">Common Error Responses</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-red-800 mb-2">400 - Bad Request</h4>
                <pre className="bg-red-50 border border-red-200 p-3 rounded text-sm">
{`{
  "error": "Missing required fields",
  "details": "Product IDs are required"
}`}
                </pre>
              </div>
              
              <div>
                <h4 className="font-semibold text-amber-800 mb-2">404 - Not Found</h4>
                <pre className="bg-amber-50 border border-amber-200 p-3 rounded text-sm">
{`{
  "error": "Store not found",
  "storeId": "invalid_store_id"
}`}
                </pre>
              </div>
              
              <div>
                <h4 className="font-semibold text-red-800 mb-2">500 - Internal Server Error</h4>
                <pre className="bg-red-50 border border-red-200 p-3 rounded text-sm">
{`{
  "error": "Internal server error",
  "message": "Something went wrong"
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-slate-900 border-b border-slate-200 pb-2">✅ Best Practices</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-emerald-900">Do&apos;s</h3>
              <ul className="space-y-2 text-emerald-800">
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-600 mt-1">✓</span>
                  <span>Cache API responses to improve performance</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-600 mt-1">✓</span>
                  <span>Implement proper error handling and user feedback</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-600 mt-1">✓</span>
                  <span>Use environment variables for API URLs and keys</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-600 mt-1">✓</span>
                  <span>Validate payment responses on the server side</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-600 mt-1">✓</span>
                  <span>Implement loading states for better UX</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-red-900">Don&apos;ts</h3>
              <ul className="space-y-2 text-red-800">
                <li className="flex items-start space-x-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span>Don&apos;t expose sensitive API keys in frontend code</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span>Don&apos;t trust payment data without server verification</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span>Don&apos;t make API calls on every component render</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span>Don&apos;t ignore error responses from the API</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span>Don&apos;t hardcode store IDs in your application</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-slate-900 border-b border-slate-200 pb-2">🆘 Support & Resources</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-xl">📚</span>
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Documentation</h3>
              <p className="text-blue-800 text-sm">Comprehensive guides and API reference</p>
            </div>
            
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-emerald-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-xl">💬</span>
              </div>
              <h3 className="text-lg font-semibold text-emerald-900 mb-2">Community</h3>
              <p className="text-emerald-800 text-sm">Join our developer community for support</p>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-xl">🛠️</span>
              </div>
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Tools</h3>
              <p className="text-purple-800 text-sm">SDKs, libraries, and development tools</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-200 pt-8 pb-8">
          <div className="text-center text-slate-600">
            <p className="mb-2">Built with ❤️ using the Polaris Design System</p>
            <p className="text-sm">© 2025 Pugly Dashboard. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}