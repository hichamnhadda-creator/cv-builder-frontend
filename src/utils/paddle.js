import toast from 'react-hot-toast';
import { ROUTES } from './constants';

/**
 * Reusable function to open Paddle checkout v2 for credit packs.
 * @param {string} priceId - The Paddle Price ID to charge for.
 * @param {object} user - The authenticated user object from useAuth().
 */
export const openCheckout = (priceId, user) => {
    if (!user) {
        toast.error('Please log in to purchase credits.');
        return;
    }

    if (!window.Paddle) {
        console.error('[Paddle] SDK window.Paddle object is missing.');
        toast.error('Payment system is not ready. Please refresh the page and try again.');
        return;
    }

    // Determine credit allocation based on the specific pricing IDs
    let credits = 0;
    if (priceId === 'pri_01krye61748vf2h64jxk7r1z77') {
        credits = 40;
    } else if (priceId === 'pri_01krye7w40s9ms0dpzpvvy3njp') {
        credits = 100;
    } else if (priceId === 'pri_01krye9fq1dprtzs68gkvjgs4w') {
        credits = 200;
    }

    console.log(`[Paddle] Triggering Checkout: PriceId=${priceId}, Credits=${credits}, User=${user.email}`);

    try {
        window.Paddle.Checkout.open({
            items: [
                {
                    priceId: priceId,
                    quantity: 1,
                },
            ],
            customData: {
                user_id: user.id,
                email: user.email,
                credits: credits.toString(),
            },
            customer: {
                email: user.email,
            },
            settings: {
                displayMode: 'overlay',
                theme: 'light',
                successUrl: `${window.location.origin}${import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, '')}${ROUTES.DASHBOARD}?payment=success`,
            }
        });
    } catch (err) {
        console.error('[Paddle] Checkout open failed:', err);
        toast.error('Failed to open checkout overlay.');
    }
};
