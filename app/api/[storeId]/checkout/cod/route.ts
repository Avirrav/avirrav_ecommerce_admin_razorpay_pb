import { NextResponse } from "next/server";
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
  context: { params: { storeId: string } }
) {
  const { params } = await context;
  try {
    const {
      fullName,
      email,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      productIds
    } = await req.json();
    if (!productIds || productIds.length === 0) {
      console.error('Product ids are required');
      return new NextResponse("Product ids are required", { status: 400 });
    }

    // Get store details including Razorpay credentials
    const store = await prismadb.store.findFirst({
      where: {
        id: params.storeId
      }
    });

    if (!store || !store.razorpayKeyId || !store.razorpayKeySecret) {
      return new NextResponse("Store Razorpay credentials not found", { status: 400 });
    }

    // Fetch products with their current prices and check stock
    const productsInOrder = await prismadb.product.findMany({
      where: {
        id: {
          in: productIds
        }
      }
    });

    // Create a map of product quantities and calculate total amount on backend
    const productQuantityMap: { [key: string]: number } = {};
    let calculatedAmount = 0;

    for (const productId of productIds) {
      productQuantityMap[productId] = (productQuantityMap[productId] || 0) + 1;
    }

    for (const product of productsInOrder) {
      const requestedQuantity = productQuantityMap[product.id] || 0;
      if (!product.sellWhenOutOfStock && product.stockQuantity < requestedQuantity) {
        return new NextResponse(`Product ${product.name} is out of stock`, { status: 400 });
      }
      calculatedAmount += product.price.toNumber() * requestedQuantity;
    }

    try {
      // Check if customer exists using findUnique with composite key
      let customer = await prismadb.customer.findUnique({
        where: {
          email: email || ''
        }
      });
      if (customer) {
        // Update existing customer
        customer = await prismadb.customer.update({
          where: {
            email: email || ''
          },
          data: {
            fullName,
            phone,
            shippingAddress: JSON.stringify({
              addressLine1,
              addressLine2,
              city,
              state,
              postalCode,
              country
            })
          }
        });
      } else {
        // Create new customer with upsert to handle race conditions
        customer = await prismadb.customer.upsert({
          where: {
            email: email || ''
          },
          update: {
            fullName,
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
          create: {
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
          }
        });
      }


      // Create order and update stock quantities in a transaction
      const order = await prismadb.$transaction(async (tx) => {
        // Create the order
        const newOrder = await tx.order.create({
          data: {
            storeId: params.storeId,
            customerId: customer?.id,
            isPaid: true,
            phone,
            email: email || '',
            address: addressLine1,
            paymentMethod: 'CASH ON DELIVERY',
            paymentStatus: 'PAID',
            orderStatus: 'confirmed',
            orderItems: {
              create: productIds.map((productId: string) => {
                const product = productsInOrder.find(p => p.id === productId);
                return {
                  product: { connect: { id: productId } },
                  price: product?.price?.toNumber() ?? 0
                };
              })
            },
          },
        });
        // Update stock quantities
        for (const product of productsInOrder) {
          const quantityOrdered = productQuantityMap[product.id] || 0;
          if (!product.sellWhenOutOfStock) {
            await tx.product.update({
              where: {
                id: product.id
              },
              data: {
                stockQuantity: {
                  decrement: quantityOrdered
                }
              }
            });
          }
        }

        return newOrder;
      });

      return NextResponse.json({
        orderId: order.id,
        message: "Order placed successfully with Cash on Delivery"
      }, {
        status: 200,
        headers: corsHeaders
      });

    } catch (error) {
      console.log('[CHECKOUT_COD_ERROR]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  } catch (error) {
    console.log('[CHECKOUT_COD_ERROR]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
