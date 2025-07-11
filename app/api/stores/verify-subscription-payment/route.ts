import { NextResponse } from "next/server";
import crypto from "crypto";
import prismadb from "@/lib/prismadb";
import { clerkClient } from "@clerk/nextjs/server";

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
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, planName } = await req.json();

    if (!razorpay_signature || !userId || !planName) {
      return new NextResponse("Missing required fields for subscription verification", { status: 400 });
    }
    // Get razorpay key secret from environment variables
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!razorpayKeySecret) {
      return new NextResponse("Razorpay key secret not configured", { status: 500 });
    }

    // Verify signature
    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", razorpayKeySecret)
      .update(payload)
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Define plan details
      let subscriptionDetails = {
        planName: 'Free',
        price: 0,
        durationMonths: 0,
        storesAllowed: 0,
        productsAllowed: 0,
        subscriptionStartDate: new Date().toISOString(),
        subscriptionEndDate: null as string | null,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
      };

      const now = new Date();
      let endDate: Date;

      switch (planName) {
        case 'Trial':
          endDate = new Date(now.getTime() + (6 * 30 * 24 * 60 * 60 * 1000)); // 6 months
          subscriptionDetails = {
            planName: 'Trial',
            price: 30,
            durationMonths: 6,
            storesAllowed: 1,
            productsAllowed: 10,
            subscriptionStartDate: new Date().toISOString(),
            subscriptionEndDate: endDate.toISOString(),
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
          };
          break;
        case 'Basic':
          endDate = new Date(now.getTime() + (12 * 30 * 24 * 60 * 60 * 1000)); // 12 months
          subscriptionDetails = {
            planName: 'Basic',
            price: 2000,
            durationMonths: 12,
            storesAllowed: -1, // unlimited
            productsAllowed: -1, // unlimited
            subscriptionStartDate: new Date().toISOString(),
            subscriptionEndDate: endDate.toISOString(),
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
          };
          break;
        case 'Advanced':
          endDate = new Date(now.getTime() + (12 * 30 * 24 * 60 * 60 * 1000)); // 12 months
          subscriptionDetails = {
            planName: 'Advanced',
            price: 6000,
            durationMonths: 12,
            storesAllowed: -1, // unlimited
            productsAllowed: -1, // unlimited
            subscriptionStartDate: new Date().toISOString(),
            subscriptionEndDate: endDate.toISOString(),
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
          };
          break;
        default:
          return new NextResponse("Invalid plan name provided", { status: 400 });
      }

      // Update user metadata in Clerk
      await clerkClient.users.updateUserMetadata(userId, {
        publicMetadata: {
          isSubscribed: true,
          planDetails: subscriptionDetails,
        },
      });

      return NextResponse.json({
        message: "Subscription verified and activated successfully",
        isSubscribed: true,
        planDetails: subscriptionDetails,
      }, {
        headers: corsHeaders
      });
    } else {
      return new NextResponse("Invalid signature", { status: 400 });
    }
  } catch (error) {
    console.error('[VERIFY_SUBSCRIPTION_PAYMENT_ERROR]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}