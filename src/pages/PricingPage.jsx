import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck, FiStar } from 'react-icons/fi';
import { ROUTES, CREDIT_PACKS } from '../utils/constants';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase'; // We'll get session from here

const PricingPage = () => {
    const navigate = useNavigate();
    const { credits, updateUser } = useAuth();
    const [selectedPack, setSelectedPack] = useState(null);

    const initialOptions = {
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID || "test", // 'test' works for sandbox visually if client-id is missing
        currency: "USD",
        intent: "capture",
    };

    const handleCreateOrder = async (packId) => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            const res = await fetch(`${import.meta.env.VITE_API_URL}/payment/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.access_token}`
                },
                body: JSON.stringify({ packId })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            return data.id;
        } catch (err) {
            toast.error('Could not initiate PayPal checkout: ' + err.message);
            throw err;
        }
    };

    const handleApprove = async (data, actions) => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            const res = await fetch(`${import.meta.env.VITE_API_URL}/payment/capture-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.access_token}`
                },
                body: JSON.stringify({ orderID: data.orderID, packId: selectedPack.id })
            });
            
            const result = await res.json();
            if (res.ok && result.success) {
                toast.success('Credits successfully added to your account!');
                updateUser({ credits: result.newCredits });
                setSelectedPack(null);
            } else {
                toast.error('Payment capture failed. Please try again.');
            }
        } catch (err) {
            toast.error('An error occurred during payment verification.');
            console.error(err);
        }
    };

    return (
        <PayPalScriptProvider options={initialOptions}>
            <div className="min-h-screen bg-off-white">
                {/* Header */}
                <div className="bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-3xl font-bold text-primary-800">Buy Credits</h1>
                            <div className="flex gap-4 items-center">
                                <div className="text-sm font-semibold bg-gray-100 px-3 py-1 rounded">
                                    Your Credits: <span className="text-primary-600">{credits}</span>
                                </div>
                                <Button variant="ghost" onClick={() => navigate(ROUTES.DASHBOARD)}>
                                    Dashboard
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pricing Section */}
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
                    <div className="text-center mb-8 md:mb-10">
                        <h2 className="text-3xl md:text-4xl font-black text-primary-900 mb-2 md:mb-4 tracking-tight">
                            Pay only for what you download
                        </h2>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-2">
                            1 High-Quality PDF Download = 5 Credits. No hidden subscriptions.
                        </p>
                    </div>

                    {selectedPack ? (
                        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl border border-primary-200">
                            <h3 className="text-2xl font-bold text-center mb-4">Complete Payment</h3>
                            <div className="bg-gray-50 p-4 rounded-lg mb-6 text-center">
                                <p className="text-gray-500 text-sm">You are buying</p>
                                <p className="text-2xl font-black text-primary-600">{selectedPack.credits} Credits</p>
                                <p className="text-gray-500 text-sm mt-1">for {selectedPack.priceMad} MAD</p>
                            </div>
                            <div className="mb-4">
                                <PayPalButtons
                                    createOrder={() => handleCreateOrder(selectedPack.id)}
                                    onApprove={handleApprove}
                                    style={{ layout: "vertical" }}
                                />
                            </div>
                            <Button variant="ghost" fullWidth onClick={() => setSelectedPack(null)}>
                                Back to Packs
                            </Button>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {CREDIT_PACKS.map((pack) => (
                                <div
                                    key={pack.id}
                                    className={`bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border transition-all duration-300 relative flex flex-col ${pack.popular
                                        ? 'border-primary-800 shadow-2xl scale-105 ring-1 ring-primary-800 z-10'
                                        : 'border-gray-100 shadow-md hover:shadow-xl'
                                        }`}
                                >
                                    {pack.popular && (
                                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary-800 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-lg">
                                            <FiStar /> Most Popular
                                        </div>
                                    )}

                                    <div className="mb-8 mt-2 text-center">
                                        <h3 className="text-xl font-bold text-gray-800 mb-4">
                                            {pack.name}
                                        </h3>
                                        <div className="flex items-baseline justify-center gap-1 mb-2">
                                            <span className="text-6xl font-black text-primary-900">
                                                {pack.credits}
                                            </span>
                                            <span className="text-gray-400 font-medium text-lg">credits</span>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg py-2 mt-4">
                                            <p className="text-primary-800 text-xl font-bold">{pack.priceMad} MAD</p>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-auto">
                                        <Button
                                            variant={pack.popular ? 'primary' : 'outline'}
                                            onClick={() => setSelectedPack(pack)}
                                            fullWidth
                                            className="h-12 md:h-14 text-sm md:text-base font-bold transition-transform hover:scale-[1.02]"
                                        >
                                            Select Pack
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </PayPalScriptProvider>
    );
};

export default PricingPage;
