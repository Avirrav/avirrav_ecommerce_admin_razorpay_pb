import { NextResponse } from "next/server";
import crypto from "crypto";
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
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();
    console.log('Payment Details:', { razorpay_order_id, razorpay_payment_id, razorpay_signature });

    if (!razorpay_signature) {
      return new NextResponse("Webhook signature missing", { status: 400 });
    }

    // Verify signature
    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
    
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(payload)
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;
    console.log('Signature Verification:', { expectedSignature, razorpay_signature, isAuthentic });

    if (isAuthentic) { 
      // First find the order using orderId
      const existingOrder = await prismadb.order.findFirst({
        where: {
          razorOrderId: razorpay_order_id,
          storeId: params.storeId
        }
      });

      if (!existingOrder) {
        console.log('Order not found:', razorpay_order_id);
        return new NextResponse("Order not found", { status: 404 });
      }

      // Update order with payment details
      const order = await prismadb.order.update({
        where: {
          id: existingOrder.id // Use the order's unique id
        },
        data: {
          paymentId: razorpay_payment_id,
          isPaid: true,
          paymentStatus: 'paid',
          orderStatus: 'confirmed'
        },
        include: {
          orderItems: true
        }
      });

      return NextResponse.json({ 
        message: "Payment verified successfully",
        order: order 
      }, {
        headers: corsHeaders
      });
    } else { 
      return new NextResponse("Invalid signature", { status: 400 });
    }
  } catch (error) {
    console.log('[VERIFY_PAYMENT_ERROR]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}