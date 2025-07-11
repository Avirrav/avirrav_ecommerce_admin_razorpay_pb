import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { auth } from "@clerk/nextjs";
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
) {
  try {
    const { userId } = auth();
    const { planName } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!planName) {
      return new NextResponse("Plan name is required", { status: 400 });
    }

    // Check if Razorpay credentials are configured in environment
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return new NextResponse("Razorpay credentials not configured", { status: 500 });
    }


    // Define plan pricing
    let amount = 0;
    let description = "";

    switch (planName) {
      case 'Trial':
        amount = 3000; // ₹30 in paise
        description = "Trial Plan - 6 months, 1 store, 10 products";
        break;
      case 'Basic':
        amount = 200000; // ₹2000 in paise
        description = "Basic Plan - 12 months, unlimited stores and products";
        break;
      case 'Advanced':
        amount = 600000; // ₹6000 in paise
        description = "Advanced Plan - 12 months, unlimited stores and products with premium features";
        break;
      default:
        return new NextResponse("Invalid plan name", { status: 400 });
    }

    // Initialize Razorpay with environment variables
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: amount,
      currency: "INR",
      receipt: `subscription_${planName}_${Date.now()}`,
      notes: {
        planName: planName,
        userId: userId,
        type: "subscription"
      }
    });

    return NextResponse.json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      planName: planName,
      description: description,
    }, {
      headers: corsHeaders
    });

  } catch (error) {
    console.error("[CREATE_SUBSCRIPTION]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}