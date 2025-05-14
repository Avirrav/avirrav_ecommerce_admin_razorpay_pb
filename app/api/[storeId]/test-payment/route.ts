import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const { amount } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const store = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!store) {
      return new NextResponse("Store not found", { status: 404 });
    }

    if (!store.razorpayKeyId || !store.razorpayKeySecret) {
      return new NextResponse("Razorpay credentials not found", { status: 400 });
    }

    const razorpay = new Razorpay({
      key_id: store.razorpayKeyId,
      key_secret: store.razorpayKeySecret,
    });

    const order = await razorpay.orders.create({
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR",
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      keyId: store.razorpayKeyId,
    });
  } catch (error) {
    console.error("[TEST_PAYMENT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}