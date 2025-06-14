import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

// Global customer search endpoint - /api/customers/search?email=customer@example.com
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    
    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }

    // Search for customer globally across all stores
    const customer = await prismadb.customer.findFirst({
      where: {
        email: email,
      },
      include: {
        store: {
          select: {
            id: true,
            name: true,
            username: true,
          }
        }
      }
    });

    if (!customer) {
      return new NextResponse("Customer not found", { status: 404 });
    }
  
    return NextResponse.json(customer);
  } catch (error) {
    console.log('[GLOBAL_CUSTOMER_SEARCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}