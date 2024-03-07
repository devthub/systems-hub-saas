import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';

export const stripePk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE;
export const stripeSecret = process.env.NEXT_PUBLIC_STRIPE_SECRET;

export const stripe = new Stripe(String(stripeSecret), {
  apiVersion: '2023-10-16',
});

export async function getStripePromise() {
  let stripePromise = null;
  if (!stripePromise) {
    if (!stripePk) {
      console.error('Please add stripe publishable key!');
    } else {
      stripePromise = await loadStripe(stripePk);
    }
  }
  return stripePromise;
}
