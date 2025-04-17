import { NextResponse } from "next/server";
import Razorpay from 'razorpay';
import prismadb from "@/lib/prismadb";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const {
      productIds,
      amount,
      fullName,
      email,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country
    } = await req.json();

    if (!productIds || productIds.length === 0) {
      return new NextResponse("Product ids are required", { status: 400 });
    }
    console.log('Product IDs:', productIds, 'Amount:', amount,  'Full Name:', fullName, 'Email:', email, 'Phone:', phone, 'Address Line 1:', addressLine1, 'Address Line 2:', addressLine2, 'City:', city, 'State:', state, 'Postal Code:', postalCode, 'Country:', country);
    const products = await prismadb.product.findMany({
      where: {
        id: {
          in: productIds
        }
      }
    });
    // Create customer record
    const customer = await prismadb.customer.create({
      data: {
        storeId: params.storeId,
        fullName,
        email: email || '',
        phone,
        shippingAddress: JSON.stringify({
          addressLine1,
          addressLine2,
          city,
          state,
          postalCode,
          country
        })
      },
    });

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: amount,
      currency: "INR",
      receipt: `order_${Date.now()}`,
    });
    console.log('Razorpay Order:', razorpayOrder);
    const order = await prismadb.order.create({
      data: {
      storeId: params.storeId,
      customerId: customer.id,
      isPaid: false,
      phone,
      email: email || '',
      address: addressLine1,
      paymentId: razorpayOrder.id,
      orderItems: {
        create: productIds.map((productId: string) => ({
        product: {
          connect: {
          id: productId
          }
        }
        }))
      },
      },
    });
    console.log('Order:', order);
    return NextResponse.json(razorpayOrder, {
      headers: corsHeaders
    });

  } catch (error) {
    console.log('[CHECKOUT_ERROR]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}