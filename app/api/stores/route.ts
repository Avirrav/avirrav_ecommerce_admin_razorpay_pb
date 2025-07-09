import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const stores = await prismadb.store.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(stores);
  } catch (error) {
    console.log('[STORES_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    // Get user metadata to check subscription and store limits
    const user = await clerkClient.users.getUser(userId);
    const metadata = user.publicMetadata as any;
    const isSubscribed = metadata?.isSubscribed || false;
    const planDetails = metadata?.planDetails;

    // Check if user is subscribed
    if (!isSubscribed || !planDetails) {
      return new NextResponse('Subscription required to create stores', { status: 403 });
    }

    // Check if subscription is expired
    if (planDetails.subscriptionEndDate) {
      const endDate = new Date(planDetails.subscriptionEndDate);
      const now = new Date();
      if (now > endDate) {
        return new NextResponse('Subscription expired. Please renew to create stores', { status: 403 });
      }
    }

    // Get current store count for the user
    const currentStoreCount = await prismadb.store.count({
      where: {
        userId,
      },
    });

    // Check store limit (-1 means unlimited)
    const storesAllowed = planDetails.storesAllowed || 0;
    if (storesAllowed !== -1 && currentStoreCount >= storesAllowed) {
      return new NextResponse(`Store limit reached. Your plan allows ${storesAllowed} store${storesAllowed === 1 ? '' : 's'}`, { status: 403 });
    }

    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORES_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
