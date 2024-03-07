import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/config/db-connect';
import { getBaseURI } from '@/lib/utils/get-envs';
import UserModel from '@/models/User.model';
import { User } from '@/types/user';
import { stripe } from './get-stripe';

// Generate Customer portal
export async function generateCustomerPortalLink(customerId: string) {
  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: process.env.NEXTAUTH_URL + '/dashboard/billing',
    });

    return portalSession.url;
  } catch (error) {
    console.error('🚀 ~ file: helpers.ts:15 ~ generateCustomerPortalLink ~ error:', error);

    return undefined;
  }
}

export async function hasSubscription(stripeCustomerId: string) {
  if (stripeCustomerId) {
    const subscriptions = await stripe.subscriptions.list({
      customer: String(stripeCustomerId),
    });

    return subscriptions.data.length > 0;
  }

  return false;
}

export async function createCheckoutLink(customer: string) {
  const checkout = await stripe.checkout.sessions.create({
    success_url: `${getBaseURI()}/dashboard/?success=true`,
    cancel_url: `${getBaseURI()}/dashboard/?cancel=true`,
    customer: customer,
    line_items: [{ price: 'price_1OmceoCIpTU9V9MObMycdDLb', quantity: 1 }],
    mode: 'subscription',
  });

  return checkout.url;
}

export async function createCustomerIfNull() {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (session) {
    if (!session?.user?.stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: String((session?.user as User)?.email),
      });

      await UserModel.findByIdAndUpdate(session?.user?._id, { $set: { stripeCustomerId: customer.id } });
    }

    const loggedInUser = await UserModel.findOne({ email: session?.user?.email });
    return loggedInUser?.stripeCustomerId;
  }
}
