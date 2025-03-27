/**
 * Utility functions for Stripe integration
 */

/**
 * Creates a Stripe checkout session for a pricing package
 * @param packageId - The ID of the pricing package
 * @param userId - The user ID (optional, for subscriptions)
 * @returns The Stripe checkout session data including the URL to redirect to
 */
export async function createCheckoutSession(packageId: number, userId?: number) {
    try {
        const response = await fetch('/api/stripe/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                packageId,
                userId,
                successUrl: `${window.location.origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
                cancelUrl: `${window.location.origin}/pricing`,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to create checkout session');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating checkout session:', error);
        throw error;
    }
}

/**
 * Redirects to Stripe Checkout for a pricing package
 * @param packageId - The ID of the pricing package
 * @param userId - The user ID (optional, for subscriptions)
 */
export async function redirectToCheckout(packageId: number, userId?: number) {
    try {
        const { url } = await createCheckoutSession(packageId, userId);

        if (url) {
            window.location.href = url;
        } else {
            throw new Error('No checkout URL returned');
        }
    } catch (error) {
        console.error('Error redirecting to checkout:', error);
        throw error;
    }
} 