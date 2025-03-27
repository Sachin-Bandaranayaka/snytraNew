import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { userSubscriptions, pricingPackages } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    // Get userId from the query param
    const userId = request.nextUrl.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    console.log(`Fetching invoices for user ID: ${userId}`);

    // Fetch the user's subscription from our database
    const subscription = await db
      .select()
      .from(userSubscriptions)
      .where(eq(userSubscriptions.userId, parseInt(userId)))
      .limit(1);

    // Generate mock invoices based on the subscription
    if (subscription && subscription.length > 0) {
      const mockInvoices = [];
      const sub = subscription[0];
      
      // Get package info to know the price
      const packageInfo = await db
        .select()
        .from(pricingPackages)
        .where(eq(pricingPackages.id, sub.packageId))
        .limit(1);
      
      const price = packageInfo[0]?.price || 4999;
      
      // Create 3 mock invoices for the past 3 months
      const now = new Date();
      
      for (let i = 0; i < 3; i++) {
        const invoiceDate = new Date();
        invoiceDate.setMonth(now.getMonth() - i);
        
        mockInvoices.push({
          id: `INV-${userId}-${invoiceDate.getFullYear()}${(invoiceDate.getMonth() + 1).toString().padStart(2, '0')}`,
          created: Math.floor(invoiceDate.getTime() / 1000),
          amount_paid: price,
          status: 'paid',
          customer: sub.stripeCustomerId || `cus_test_${userId}`,
          subscription: sub.stripeSubscriptionId || `sub_test_${userId}`,
          period_start: Math.floor(invoiceDate.getTime() / 1000),
          period_end: Math.floor(new Date(invoiceDate.getFullYear(), invoiceDate.getMonth() + 1, 0).getTime() / 1000)
        });
      }
      
      return NextResponse.json({
        success: true,
        invoices: mockInvoices
      });
    }
    
    return NextResponse.json({
      success: true,
      invoices: []
    });
    
  } catch (error: any) {
    console.error('Error generating mock invoices:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Failed to generate mock invoices',
      message: error.message 
    }, { status: 500 });
  }
} 