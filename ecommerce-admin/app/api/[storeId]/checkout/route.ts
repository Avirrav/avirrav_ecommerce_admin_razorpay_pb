import { NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import prismadb from "@/lib/prismadb";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { productIds } = await req.json();

    if (!productIds || productIds.length === 0) {
      return new NextResponse("Product ids are required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        id: {
          in: productIds
        }
      }
    });

    const total = products.reduce((acc, product) => {
      return acc + Number(product.price);
    }, 0);

    // Create order in Razorpay
    const order = await razorpay.orders.create({
      amount: Math.round(total * 100), // Amount in smallest currency unit (paise for INR)
      currency: 'INR',
      receipt: `order_${Date.now()}`,
    });

    // Create order in database
    await prismadb.order.create({
      data: {
        storeId: params.storeId,
        isPaid: false,
        orderItems: {
          create: productIds.map((productId: string) => ({
            product: {
              connect: {
                id: productId
              }
            }
          }))
        },
        paymentId: order.id,
      }
    });

    return NextResponse.json({ 
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID
    }, {
      headers: corsHeaders
    });
  } catch (error) {
    console.log('[CHECKOUT_ERROR]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}