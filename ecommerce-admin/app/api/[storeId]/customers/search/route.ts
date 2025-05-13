import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
// /api/{storeId}/customers/search?email=customer@example.com
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }

    const customer = await prismadb.customer.findFirst({
      where: {
        email: email,
        storeId: params.storeId
      }
    });

    if (!customer) {
      return new NextResponse("Customer not found", { status: 404 });
    }
  
    return NextResponse.json(customer);
  } catch (error) {
    console.log('[CUSTOMER_GET_BY_EMAIL]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}