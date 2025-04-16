import { headers } from "next/headers";
import { NextResponse } from "next/server";
import crypto from "crypto";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = headers();
  const razorpaySignature = headersList.get("x-razorpay-signature");

  if (!razorpaySignature) {
    return new NextResponse("Webhook signature missing", { status: 400 });
  }

  // Verify webhook signature
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpaySignature) {
    return new NextResponse("Invalid webhook signature", { status: 400 });
  }

  const payload = JSON.parse(body);

  if (payload.event === "payment.captured") {
    const paymentId = payload.payload.payment.entity.order_id;

    // Update order status in database
    await prismadb.order.update({
      where: {
        paymentId: paymentId,
      },
      data: {
        isPaid: true,
      },
    });
  }

  return new NextResponse(null, { status: 200 });
}