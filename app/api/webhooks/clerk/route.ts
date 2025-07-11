import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';
import { clerkClient } from '@clerk/nextjs/server';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.error('Missing svix headers');
      return new NextResponse('Error occurred -- no svix headers', {
        status: 400
      });
    }

    // Get the body
    const payload = await req.text();
    const body = JSON.parse(payload);

    // Get the Webhook secret from environment variables
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
      console.error('CLERK_WEBHOOK_SECRET not found in environment variables');
      return new NextResponse('Webhook secret not configured', {
        status: 500
      });
    }

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: any;

    // Verify the payload with the headers
    try {
      evt = wh.verify(payload, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as any;
    } catch (err) {
      console.error('Error verifying webhook:', err);
      return new NextResponse('Error occurred during verification', {
        status: 400
      });
    }

    // Handle the webhook
    const { id } = body.data;
    const eventType = evt.type;

    console.log(`Processing webhook: ID=${id}, Type=${eventType}`);

    // Handle user.created event
    if (eventType === 'user.created') {
      try {
        const currentDate = new Date().toISOString();
        
        const defaultMetadata = {
          isSubscribed: false,
          planDetails: {
            planName: 'Free',
            price: 0,
            durationMonths: 0,
            storesAllowed: 0,  // Free plan: 0 stores
            productsAllowed: 0, // Free plan: 0 products
            subscriptionStartDate: currentDate,
            subscriptionEndDate: null,
            razorpayOrderId: null,
            razorpayPaymentId: null,
          }
        };

        // Set default subscription metadata for new users
        await clerkClient.users.updateUserMetadata(id, {
          publicMetadata: defaultMetadata
        });

        console.log(`✅ Successfully set default subscription metadata for user ${id}`);
        console.log('Metadata set:', JSON.stringify(defaultMetadata, null, 2));

        return new NextResponse('User metadata updated successfully', { 
          status: 200,
          headers: corsHeaders 
        });

      } catch (error) {
        console.error('❌ Error updating user metadata:', error);
        return new NextResponse('Error updating user metadata', {
          status: 500,
          headers: corsHeaders
        });
      }
    }

    // Handle user.updated event (optional - for when users update their profile)
    if (eventType === 'user.updated') {
      try {
        // Get current user metadata
        const user = await clerkClient.users.getUser(id);
        const currentMetadata = user.publicMetadata as any;

        // Only set default metadata if isSubscribed doesn't exist
        if (currentMetadata.isSubscribed === undefined) {
          const currentDate = new Date().toISOString();
          
          const defaultMetadata = {
            isSubscribed: false,
            planDetails: {
              planName: 'Free',
              price: 0,
              durationMonths: 0,
              storesAllowed: 0,  // Free plan: 0 stores
              productsAllowed: 0, // Free plan: 0 products
              subscriptionStartDate: currentDate,
              subscriptionEndDate: null,
              razorpayOrderId: null,
              razorpayPaymentId: null,
            }
          };

          await clerkClient.users.updateUserMetadata(id, {
            publicMetadata: {
              ...currentMetadata,
              ...defaultMetadata
            }
          });

          console.log(`✅ Successfully set default subscription metadata for updated user ${id}`);
        } else {
          console.log(`ℹ️ User ${id} already has subscription metadata`);
        }

        return new NextResponse('User metadata checked/updated successfully', { 
          status: 200,
          headers: corsHeaders 
        });

      } catch (error) {
        console.error('❌ Error updating user metadata on user.updated:', error);
        return new NextResponse('Error updating user metadata', {
          status: 500,
          headers: corsHeaders
        });
      }
    }

    // For other event types, just acknowledge
    console.log(`ℹ️ Webhook event ${eventType} received but not processed`);
    return new NextResponse('Webhook received', { 
      status: 200,
      headers: corsHeaders 
    });

  } catch (error) {
    console.error('❌ Webhook processing error:', error);
    return new NextResponse('Internal server error', {
      status: 500,
      headers: corsHeaders
    });
  }
}