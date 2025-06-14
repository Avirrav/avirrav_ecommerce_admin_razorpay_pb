'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download, Package, CreditCard, Truck, Calendar, MapPin, Phone, Mail, User } from "lucide-react";
import Image from "next/image";
import { jsPDF } from "jspdf";
import { formatter } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import axios from "axios";

interface OrderViewProps {
  data: any;
}

interface ProductDetails {
  id: string;
  name: string;
  images: { url: string }[];
  color: { name: string; value: string } | null;
  size: { name: string; value: string } | null;
  price: number;
}

export const OrderView: React.FC<OrderViewProps> = ({ data }) => {
  const [productDetails, setProductDetails] = useState<Record<string, ProductDetails>>({});

  useEffect(() => {
    const fetchProductDetails = async () => {
      const details: Record<string, ProductDetails> = {};
      
      for (const item of data.orderItems) {
        try {
          const response = await axios.get(`/api/${data.storeId}/products/${item.productId}`);
          details[item.productId] = response.data;
        } catch (error) {
          console.error(`Error fetching product details for ${item.productId}:`, error);
        }
      }
      
      setProductDetails(details);
    };

    fetchProductDetails();
  }, [data.orderItems, data.storeId]);

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(20);
    doc.text("Order Details", 20, 20);

    // Add content
    doc.setFontSize(12);
    let y = 40;
    const lineHeight = 10;

    // Order Information
    doc.text(`Order ID: ${data.id}`, 20, y); y += lineHeight;
    doc.text(`Date: ${data.createdAt}`, 20, y); y += lineHeight;
    doc.text(`Status: ${data.orderStatus}`, 20, y); y += lineHeight;

    // Customer Information
    y += lineHeight;
    doc.text("Customer Information:", 20, y); y += lineHeight;
    doc.text(`Name: ${data.customer?.fullName || 'Guest Customer'}`, 20, y); y += lineHeight;
    doc.text(`Phone: ${data.phone}`, 20, y); y += lineHeight;
    if (data.email) {
      doc.text(`Email: ${data.email}`, 20, y); y += lineHeight;
    }
    doc.text(`Address: ${data.address}`, 20, y); y += lineHeight;

    // Payment Information
    y += lineHeight;
    doc.text("Payment Information:", 20, y); y += lineHeight;
    doc.text(`Payment Status: ${data.paymentStatus}`, 20, y); y += lineHeight;
    doc.text(`Payment Method: ${data.paymentMethod}`, 20, y); y += lineHeight;
    doc.text(`Total Amount: ${formatter.format(data.totalAmount)}`, 20, y); y += lineHeight;
    doc.text(`Is Paid: ${data.isPaid ? 'Yes' : 'No'}`, 20, y); y += lineHeight;

    // Products
    y += lineHeight;
    doc.text("Order Items:", 20, y); y += lineHeight;
    data.orderItems.forEach((item: any) => {
      doc.text(`- ${item.product.name} (Qty: ${item.quantity}) - ${formatter.format(item.product.price)}`, 30, y);
      y += lineHeight;
    });

    // Save PDF
    doc.save(`order-${data.id}.pdf`);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'success';
      case 'shipped':
        return 'info';
      case 'confirmed':
        return 'warning';
      case 'cancelled':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Order Details</h2>
          <p className="text-gray-600 mt-1">View and manage order information</p>
        </div>
        <Button onClick={generatePDF} className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Export PDF</span>
        </Button>
      </div>

      <Separator />

      {/* Order Information Card */}
      <Card className="border bg-gray-50 border-gray-200 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">Order Information</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Order #{data.id}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-600">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Created on {data.createdAt}</span>
            </div>
            <Badge variant={getStatusColor(data.orderStatus)} className="capitalize">
              {data.orderStatus}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Order Items Card */}
      <Card className="border bg-gray-50 border-gray-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900">Order Items</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            {data.orderItems.map((item: any, index: number) => {
              const product = productDetails[item.productId];
              return (
                <div key={item.id} className={`flex items-center space-x-4 p-4 rounded-lg border border-gray-100 ${index !== data.orderItems.length - 1 ? 'mb-4' : ''}`}>
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    {product?.images && product.images.length > 0 ? (
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                        <Image
                          src={product.images[0].url}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                        <Package className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{product?.name || 'Product not found'}</h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">Color:</span>
                        <div className="flex items-center space-x-1">
                          <div
                            className="w-3 h-3 rounded-full border border-gray-300"
                            style={{ backgroundColor: product?.color?.value || '#000000' }}
                          />
                          <span className="text-xs text-gray-600">{product?.color?.name || 'N/A'}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-xs text-gray-500">Size:</span>
                        <span className="text-xs text-gray-600">{product?.size?.name || 'N/A'}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-xs text-gray-500">Qty:</span>
                        <span className="text-xs text-gray-600">{item.quantity}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      {formatter.format(product?.price || 0)}
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-xs text-gray-500">
                        {formatter.format((product?.price || 0) * item.quantity)} total
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Payment Summary Card */}
      <Card className="border bg-gray-50 border-gray-200 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <CreditCard className="h-5 w-5 text-green-600" />
            </div>
            <CardTitle className="text-lg font-semibold text-gray-900">Payment Summary</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            {/* Payment Status Badges */}
            <div className="flex items-center space-x-3">
              <Badge variant={getPaymentStatusColor(data.paymentStatus)} className="capitalize">
                {data.paymentStatus}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {data.paymentMethod}
              </Badge>
            </div>

            {/* Payment Details */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Subtotal</span>
                <span className="text-sm font-medium text-gray-900">
                  {formatter.format(data.totalAmount)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Shipping</span>
                <span className="text-sm font-medium text-gray-900">Free</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Tax</span>
                <span className="text-sm font-medium text-gray-900">Included</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-base font-semibold text-gray-900">Total</span>
                <span className="text-base font-bold text-gray-900">
                  {formatter.format(data.totalAmount)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Payment Status</span>
                <span className={`text-sm font-medium ${data.isPaid ? 'text-green-600' : 'text-red-600'}`}>
                  {data.isPaid ? 'Paid' : 'Unpaid'}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Details Card */}
      <Card className="border bg-gray-50 border-gray-200 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Truck className="h-5 w-5 text-purple-600" />
            </div>
            <CardTitle className="text-lg font-semibold text-gray-900">Shipping Details</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Information */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900 flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Customer Information</span>
              </h4>
              <div className="space-y-2 pl-6">
                <div className="flex items-center space-x-2">
                  <User className="h-3 w-3 text-gray-400" />
                  <span className="text-sm text-gray-600 min-w-[60px]">Name:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {data.customer?.fullName || 'Guest Customer'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-3 w-3 text-gray-400" />
                  <span className="text-sm text-gray-600 min-w-[60px]">Phone:</span>
                  <span className="text-sm font-medium text-gray-900">{data.phone}</span>
                </div>
                {data.email && (
                  <div className="flex items-center space-x-2">
                    <Mail className="h-3 w-3 text-gray-400" />
                    <span className="text-sm text-gray-600 min-w-[60px]">Email:</span>
                    <span className="text-sm font-medium text-gray-900">{data.email}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900 flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Shipping Address</span>
              </h4>
              <div className="space-y-2 pl-6">
                <div className="text-sm text-gray-900">
                  <div className="font-medium">{data.address}</div>
                  {/* If we have parsed shipping address, show detailed address */}
                  {data.customer?.shippingAddress && (() => {
                    try {
                      const address = JSON.parse(data.customer.shippingAddress);
                      return (
                        <div className="mt-2 space-y-1 text-gray-600">
                          {address.addressLine2 && <div>{address.addressLine2}</div>}
                          <div>{address.city}, {address.state} {address.postalCode}</div>
                          <div>{address.country}</div>
                        </div>
                      );
                    } catch (e) {
                      return null;
                    }
                  })()}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};