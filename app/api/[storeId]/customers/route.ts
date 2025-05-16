import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import toast from "react-hot-toast";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { fullName, email, phone, shippingAddress } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!fullName) {
      return new NextResponse("Full name is required", { status: 400 });
    }

    if (!phone) {
      return new NextResponse("Phone is required", { status: 400 });
    }

    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }

    if (!shippingAddress) {
      return new NextResponse("Shipping address is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    // Check if customer exists with better error handling
    const existingCustomer = await prismadb.customer.findFirst({
      where: {
        email,
      }
    });

    if (existingCustomer) {
      const conflictDetails = {
        error: "Customer already exists",
        code: "CUSTOMER_EXISTS",
        details: {
          email: existingCustomer.email === email ? "Email already registered" : null,
        }
      };
      return new NextResponse(JSON.stringify(conflictDetails), {
        status: 409,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    const customer = await prismadb.customer.create({
      data: {
        fullName,
        email,
        phone,
        shippingAddress,
        storeId: params.storeId,
      }
    });

    return NextResponse.json({
      success: true,
      data: customer
    });

  } catch (error) {
    console.error('[CUSTOMERS_POST]', error);
    const errorResponse = {
      error: "Internal server error",
      code: "INTERNAL_ERROR",
      details: process.env.NODE_ENV === 'development' ? error : undefined
    };

    return new NextResponse(JSON.stringify(errorResponse), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({
          error: "Store ID is required",
          code: "MISSING_STORE_ID"
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    const customers = await prismadb.customer.findMany({
      where: {
        storeId: params.storeId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      data: customers
    });

  } catch (error) {
    console.error('[CUSTOMERS_GET]', error);
    return new NextResponse(
      JSON.stringify({
        error: "Internal server error",
        code: "INTERNAL_ERROR",
        details: process.env.NODE_ENV === 'development' ? error : undefined
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}