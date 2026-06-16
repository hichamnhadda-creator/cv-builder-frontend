import toast from 'react-hot-toast';
import api from '../lib/api';

export const openPolarCheckout = async (productId, credits, user) => {
    if (!user) {
        toast.error('Please log in to purchase credits.');
        return;
    }

    if (!productId) {
        toast.error('Invalid product selected.');
        return;
    }

    console.log(`[Polar] Triggering Checkout: ProductId=${productId}, User=${user.email}`);

    try {
        // Request the checkout session URL from our backend
        const response = await api.post('/payments/checkout', {
            productId,
            credits
        });

        if (response.data && response.data.url) {
            // Redirect to the Polar Sandbox Hosted Checkout URL returned by the API
            window.location.href = response.data.url;
        } else {
            throw new Error('No checkout URL returned from server');
        }
    } catch (err) {
        console.error('[Polar] Checkout open failed:', err);
        toast.error(err.response?.data?.error || 'Failed to initiate checkout.');
        throw err;
    }
};
