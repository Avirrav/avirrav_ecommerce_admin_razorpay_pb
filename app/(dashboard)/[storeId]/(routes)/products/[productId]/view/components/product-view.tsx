'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download, Package, DollarSign, Palette, Ruler, Tag, Archive, Star, Truck, Scale } from "lucide-react";
import Image from "next/image";
import { jsPDF } from "jspdf";
import { Badge } from "@/components/ui/badge";

interface ProductViewProps {
  data: any;
}

export const ProductView: React.FC<ProductViewProps> = ({ data }) => {
  // Add default values for missing data
  const defaultData = {
    name: data.name || 'N/A',
    description: data.description || 'No description available',
    sku: data.sku || 'N/A',
    price: data.price || '0.00',
    costPerItem: data.costPerItem || '0.00',
    profitMargin: data.profitMargin || '0%',
    stockQuantity: data.stockQuantity || 0,
    category: data.category || { name: 'Uncategorized', value: 'uncategorized' },
    size: data.size || { name: 'Standard', value: 'standard' },
    color: data.color || { name: 'Default', value: '#000000' },
    weight: data.weight || 0,
    weightUnit: data.weightUnit || 'kg',
    length: data.length || 0,
    width: data.width || 0,
    height: data.height || 0,
    requiresShipping: data.requiresShipping ?? true,
    isFeatured: data.isFeatured ?? false,
    isArchived: data.isArchived ?? false,
    sellWhenOutOfStock: data.sellWhenOutOfStock ?? false,
    createdAt: data.createdAt || 'N/A',
    images: data.images || [],
    taxes: data.taxes || '[]'
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text("Product Details", 20, 20);
    
    // Add content
    doc.setFontSize(12);
    let y = 40;
    const lineHeight = 10;

    // Basic Information
    doc.text(`Name: ${defaultData.name}`, 20, y); y += lineHeight;
    doc.text(`Description: ${defaultData.description}`, 20, y); y += lineHeight;
    doc.text(`SKU: ${defaultData.sku}`, 20, y); y += lineHeight;
    
    // Pricing
    doc.text(`Price: ${defaultData.price}`, 20, y); y += lineHeight;
    doc.text(`Cost Per Item: ${defaultData.costPerItem}`, 20, y); y += lineHeight;
    doc.text(`Profit Margin: ${defaultData.profitMargin}`, 20, y); y += lineHeight;
    
    // Taxes
    try {
      const taxes = JSON.parse(defaultData.taxes);
      if (Array.isArray(taxes) && taxes.length > 0) {
        taxes.forEach((tax: { name: string, value: number }) => {
          doc.text(`${tax.name}: ${tax.value}%`, 20, y);
          y += lineHeight;
        });
      } else {
        doc.text('Taxes: None', 20, y); y += lineHeight;
      }
    } catch (e) {
      doc.text('Taxes: None', 20, y); y += lineHeight;
    }
    
    // Inventory
    doc.text(`Stock Quantity: ${defaultData.stockQuantity}`, 20, y); y += lineHeight;
    doc.text(`Category: ${defaultData.category.name}`, 20, y); y += lineHeight;
    doc.text(`Size: ${defaultData.size.name}`, 20, y); y += lineHeight;
    doc.text(`Color: ${defaultData.color.name}`, 20, y); y += lineHeight;
    
    // Shipping Details
    doc.text(`Weight: ${defaultData.weight} ${defaultData.weightUnit}`, 20, y); y += lineHeight;
    doc.text(`Length: ${defaultData.length} cm`, 20, y); y += lineHeight;
    doc.text(`Width: ${defaultData.width} cm`, 20, y); y += lineHeight;
    doc.text(`Height: ${defaultData.height} cm`, 20, y); y += lineHeight;
    doc.text(`Requires Shipping: ${defaultData.requiresShipping ? 'Yes' : 'No'}`, 20, y); y += lineHeight;
    
    // Additional Info
    doc.text(`Featured: ${defaultData.isFeatured ? 'Yes' : 'No'}`, 20, y); y += lineHeight;
    doc.text(`Archived: ${defaultData.isArchived ? 'Yes' : 'No'}`, 20, y); y += lineHeight;
    doc.text(`Sell When Out of Stock: ${defaultData.sellWhenOutOfStock ? 'Yes' : 'No'}`, 20, y); y += lineHeight;
    doc.text(`Created At: ${defaultData.createdAt}`, 20, y);
    
    // Save PDF
    doc.save(`product-${defaultData.sku}.pdf`);
  };

  const getStockStatus = () => {
    if (defaultData.stockQuantity > 10) return { label: 'In Stock', color: 'success' };
    if (defaultData.stockQuantity > 0) return { label: 'Low Stock', color: 'warning' };
    return { label: 'Out of Stock', color: 'destructive' };
  };

  const stockStatus = getStockStatus();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Product Details</h2>
          <p className="text-gray-600 mt-1">View and manage product information</p>
        </div>
        <Button onClick={generatePDF} className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Export PDF</span>
        </Button>
      </div>

      <Separator />

      {/* Product Information Card */}
      <Card className="border bg-gray-50 border-gray-200 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">Product Information</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Basic product details and identification</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium text-gray-600">Product Name</span>
                <p className="text-base font-semibold text-gray-900 mt-1">{defaultData.name}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">SKU</span>
                <p className="text-base text-gray-900 mt-1 font-mono bg-gray-100 px-2 py-1 rounded">{defaultData.sku}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Created Date</span>
                <p className="text-base text-gray-900 mt-1">{defaultData.createdAt}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium text-gray-600">Description</span>
                <p className="text-base text-gray-900 mt-1 leading-relaxed">{defaultData.description}</p>
              </div>
              <div className="flex items-center space-x-3">
                {defaultData.isFeatured && (
                  <Badge variant="info" className="flex items-center space-x-1">
                    <Star className="h-3 w-3" />
                    <span>Featured</span>
                  </Badge>
                )}
                {defaultData.isArchived && (
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <Archive className="h-3 w-3" />
                    <span>Archived</span>
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing & Financial Information */}
      <Card className="border bg-gray-50 border-gray-200 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">Pricing & Financial Details</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Cost structure and pricing information</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600 mb-1">Selling Price</p>
                <p className="text-2xl font-bold text-green-600">{defaultData.price}</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600 mb-1">Cost Per Item</p>
                <p className="text-2xl font-bold text-red-600">{defaultData.costPerItem}</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600 mb-1">Profit Margin</p>
                <p className="text-2xl font-bold text-blue-600">{defaultData.profitMargin}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Applied Taxes</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {(() => {
                try {
                  const taxes = JSON.parse(defaultData.taxes);
                  if (Array.isArray(taxes) && taxes.length > 0) {
                    return taxes.map((tax: { name: string, value: number }, index: number) => (
                      <div key={index} className="bg-white rounded-lg p-3 border border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700">{tax.name}</span>
                          <span className="text-sm font-bold text-gray-900">{tax.value}%</span>
                        </div>
                      </div>
                    ));
                  }
                } catch (e) {
                  return (
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">No taxes applied</span>
                      </div>
                    </div>
                  );
                }
                return (
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">No taxes applied</span>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Characteristics */}
      <Card className="border bg-gray-50 border-gray-200 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Palette className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">Product Characteristics</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Size, color, and category information</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-3">
                <Tag className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Category</p>
                  <p className="text-base font-semibold text-gray-900">{defaultData.category.name}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-3">
                <Ruler className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Size</p>
                  <p className="text-base font-semibold text-gray-900">{defaultData.size.name} ({defaultData.size.value})</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-3">
                <div
                  className="w-5 h-5 rounded-full border-2 border-gray-300 shadow-sm"
                  style={{ backgroundColor: defaultData.color.value }}
                />
                <div>
                  <p className="text-sm font-medium text-gray-600">Color</p>
                  <p className="text-base font-semibold text-gray-900">{defaultData.color.name}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Management */}
      <Card className="border bg-gray-50 border-gray-200 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Package className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">Inventory Management</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Stock levels and inventory settings</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-gray-600">Current Stock</p>
                <Badge variant={stockStatus.color as any}>{stockStatus.label}</Badge>
              </div>
              <p className="text-3xl font-bold text-gray-900">{defaultData.stockQuantity}</p>
              <p className="text-sm text-gray-500 mt-1">units available</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                <span className="text-sm font-medium text-gray-700">Sell when out of stock</span>
                <Badge variant={defaultData.sellWhenOutOfStock ? "success" : "secondary"}>
                  {defaultData.sellWhenOutOfStock ? 'Enabled' : 'Disabled'}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shipping & Dimensions */}
      <Card className="border bg-gray-50 border-gray-200 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Truck className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">Shipping & Dimensions</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Physical properties and shipping requirements</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                <span className="text-sm font-medium text-gray-700">Requires Shipping</span>
                <Badge variant={defaultData.requiresShipping ? "info" : "secondary"}>
                  {defaultData.requiresShipping ? 'Yes' : 'No'}
                </Badge>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center space-x-3">
                  <Scale className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Weight</p>
                    <p className="text-base font-semibold text-gray-900">{defaultData.weight} {defaultData.weightUnit}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900">Dimensions (cm)</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                  <p className="text-xs font-medium text-gray-600 mb-1">Length</p>
                  <p className="text-lg font-bold text-gray-900">{defaultData.length}</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                  <p className="text-xs font-medium text-gray-600 mb-1">Width</p>
                  <p className="text-lg font-bold text-gray-900">{defaultData.width}</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                  <p className="text-xs font-medium text-gray-600 mb-1">Height</p>
                  <p className="text-lg font-bold text-gray-900">{defaultData.height}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Images */}
      <Card className="border bg-gray-50 border-gray-200 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-pink-50 rounded-lg">
              <Package className="h-5 w-5 text-pink-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">Product Images</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Visual representation of the product</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          {defaultData.images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {defaultData.images.map((image: { url: string }, index: number) => (
                <div key={index} className="relative aspect-square group">
                  <Image
                    src={image.url}
                    alt={`Product image ${index + 1}`}
                    fill
                    className="object-cover rounded-lg border border-gray-200 shadow-sm group-hover:shadow-md transition-shadow"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded-lg" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Package className="mx-auto h-12 w-12 text-gray-400 mb-3" />
              <p className="text-sm text-gray-500">No images available for this product</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};