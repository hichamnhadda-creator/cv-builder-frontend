import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck, FiX, FiStar, FiZap, FiDownload, FiLayers } from 'react-icons/fi';
import { ROUTES, CREDIT_PACKS, DOWNLOAD_COST } from '../utils/constants';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

const PricingPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { credits, updateUser } = useAuth();
    const [selectedPack, setSelectedPack] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState('idle'); // 'idle', 'processing', 'success', 'error'
    const [transactionId, setTransactionId] = useState(null);

    const initialOptions = {
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID || "test",
        currency: "USD",
        intent: "capture",
        "disable-funding": "card", // Disable PayPal's buggy card form, we will use our own button
    };

    const handleCreateOrder = (data, actions) => {
        // Create an order on the frontend for sandbox testing
        return actions.order.create({
            purchase_units: [
                {
                    description: `CV Builder - ${selectedPack.credits} Credits`,
                    amount: {
                        currency_code: 'USD',
                        value: (selectedPack.priceMad / 10).toFixed(2), // Mock conversion to USD
                    },
                },
            ],
        }).catch(err => {
            console.error('PayPal Create Order Error:', err);
            toast.error('Could not initialize PayPal checkout.');
        });
    };

    const handleApprove = async (data, actions) => {
        setPaymentStatus('processing');
        try {
            // Capture the order directly on the frontend
            const details = await actions.order.capture();
            
            setTransactionId(details.id);
            updateUser({ credits: credits + selectedPack.credits });
            setPaymentStatus('success');
            toast.success('Payment successful!');
        } catch (err) {
            setPaymentStatus('error');
            toast.error('An error occurred during payment verification.');
            console.error(err);
        }
    };

    const handleMockCardPayment = () => {
        setPaymentStatus('processing');
        // Simulate a card payment delay
        setTimeout(() => {
            setTransactionId('mock_card_' + Math.random().toString(36).substr(2, 9));
            updateUser({ credits: credits + selectedPack.credits });
            setPaymentStatus('success');
            toast.success('Card payment simulated successfully!');
        }, 2000);
    };

    const resetCheckout = () => {
        setSelectedPack(null);
        setPaymentStatus('idle');
        setTransactionId(null);
    };

    return (
        <PayPalScriptProvider options={initialOptions}>
            <div className="min-h-screen bg-off-white">
                {/* Header */}
                <div className="bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-3xl font-bold text-primary-800">{t('pricing.header.buyCredits')}</h1>
                            <div className="flex gap-4 items-center">
                                <div className="text-sm font-semibold bg-gray-100 px-3 py-1 rounded">
                                    {t('pricing.header.yourCredits')} <span className="text-primary-600 font-bold">{credits}</span>
                                </div>
                                <Button variant="ghost" onClick={() => navigate(ROUTES.DASHBOARD)}>
                                    {t('pricing.header.dashboard')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pricing Section */}
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
                    <div className="text-center mb-8 md:mb-10">
                        <h2 className="text-3xl md:text-4xl font-black text-primary-900 mb-2 md:mb-4 tracking-tight">
                            {t('pricing.title')}
                        </h2>
                        <p className="text-xl font-medium text-gray-600 max-w-2xl mx-auto mb-2">
                             {t('pricing.subtitle')}
                        </p>
                    </div>

                    <AnimatePresence mode="wait">
                        {selectedPack ? (
                            <motion.div 
                                key="checkout-card"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl border border-primary-200"
                            >
                                {paymentStatus === 'idle' && (
                                    <>
                                        <h3 className="text-2xl font-bold text-center mb-4">{t('pricing.checkout.title')}</h3>
                                        <div className="bg-gray-50 p-6 rounded-2xl mb-6 text-center border border-gray-100">
                                            <p className="text-gray-500 text-sm mb-1">{t('pricing.checkout.buying')}</p>
                                            <p className="text-3xl font-black text-primary-600">{selectedPack.credits} {t('pricing.credits')}</p>
                                            <div className="mt-3 inline-block bg-white px-4 py-1 rounded-full border border-gray-100 shadow-sm text-lg font-bold text-gray-800">
                                                {selectedPack.priceMad} {t('pricing.currency')}
                                            </div>
                                        </div>
                                        <div className="mb-4 relative z-0 flex flex-col gap-3">
                                            <PayPalButtons
                                                createOrder={handleCreateOrder}
                                                onApprove={handleApprove}
                                                onError={(err) => {
                                                    console.error('PayPal onError:', err);
                                                    setPaymentStatus('error');
                                                    toast.error('PayPal encountered an error. Please try again.');
                                                }}
                                                onCancel={() => {
                                                    toast('Payment cancelled', { icon: 'ℹ️' });
                                                }}
                                                style={{ 
                                                    layout: "vertical",
                                                    color: "gold",
                                                    shape: "rect",
                                                    label: "paypal"
                                                }}
                                            />

                                            <div className="relative flex items-center py-2">
                                                <div className="flex-grow border-t border-gray-200"></div>
                                                <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-semibold uppercase tracking-wider">Or pay with</span>
                                                <div className="flex-grow border-t border-gray-200"></div>
                                            </div>

                                            <Button 
                                                variant="outline" 
                                                fullWidth 
                                                onClick={handleMockCardPayment}
                                                className="h-[45px] border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 font-bold"
                                            >
                                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                                                Debit or Credit Card
                                            </Button>
                                        </div>
                                        <Button variant="ghost" fullWidth onClick={() => setSelectedPack(null)}>
                                            {t('pricing.checkout.back')}
                                        </Button>
                                    </>
                                )}

                                {paymentStatus === 'processing' && (
                                    <div className="py-12 text-center">
                                        <div className="w-16 h-16 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin mx-auto mb-6"></div>
                                        <h3 className="text-xl font-bold text-gray-800">{t('pricing.checkout.processing')}</h3>
                                    </div>
                                )}

                                {paymentStatus === 'success' && (
                                    <div className="text-center py-4">
                                        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-100">
                                            <FiCheck className="text-4xl" />
                                        </div>
                                        <h3 className="text-2xl font-black text-gray-900 mb-2">{t('pricing.checkout.successTitle')}</h3>
                                        <p className="text-gray-600 mb-8">{t('pricing.checkout.successSubtitle')}</p>
                                        
                                        <div className="bg-gray-50 rounded-2xl p-4 mb-8 text-left text-xs text-gray-500 font-mono">
                                            <p>Transaction ID: {transactionId}</p>
                                        </div>

                                        <Button 
                                            variant="primary" 
                                            fullWidth 
                                            onClick={() => navigate(ROUTES.DASHBOARD)}
                                            className="h-12 md:h-14 bg-primary-800"
                                        >
                                            {t('pricing.checkout.goToDashboard')}
                                        </Button>
                                    </div>
                                )}

                                {paymentStatus === 'error' && (
                                    <div className="text-center py-4">
                                        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-red-100">
                                            <FiX className="text-4xl" />
                                        </div>
                                        <h3 className="text-2xl font-black text-gray-900 mb-2">{t('pricing.checkout.errorTitle')}</h3>
                                        <p className="text-gray-600 mb-8">{t('pricing.checkout.errorSubtitle')}</p>
                                        
                                        <div className="flex gap-4">
                                            <Button variant="outline" fullWidth onClick={resetCheckout}>
                                                {t('pricing.checkout.tryAgain')}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="pricing-grid"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
                            >
                            {/* Free Plan Card */}
                            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
                                <div className="mb-6 text-center">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{t('pricing.plans.free.name')}</h3>
                                    <p className="text-gray-500 text-sm mb-4">{t('pricing.plans.free.subtitle')}</p>
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className="text-5xl font-black text-gray-900">0</span>
                                        <span className="text-gray-400 font-medium text-lg">{t('pricing.currency')}</span>
                                    </div>
                                </div>
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <FiCheck className="text-green-500 flex-shrink-0" />
                                        <span>{t('pricing.plans.free.features.cvCount')}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <FiLayers className="text-blue-500 flex-shrink-0" />
                                        <span>{t('pricing.plans.free.features.templates')}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-400 italic">
                                        <FiX className="text-red-400 flex-shrink-0" />
                                        <span>{t('pricing.plans.free.features.watermark')}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-400 italic">
                                        <FiX className="text-red-400 flex-shrink-0" />
                                        <span>{t('pricing.plans.free.features.noPdf')}</span>
                                    </div>
                                </div>
                                <div className="mt-auto">
                                    <Button
                                        variant="outline"
                                        onClick={() => navigate(ROUTES.DASHBOARD)}
                                        fullWidth
                                        className="h-12 font-bold"
                                    >
                                        {t('pricing.plans.free.cta')}
                                    </Button>
                                </div>
                            </div>

                            {/* Credit Packs */}
                            {CREDIT_PACKS.map((pack) => (
                                <div
                                    key={pack.id}
                                    className={`bg-white rounded-3xl p-8 border transition-all duration-300 relative flex flex-col ${pack.popular
                                        ? 'border-primary-800 shadow-2xl lg:scale-105 ring-2 ring-primary-800 ring-offset-2 z-10'
                                        : 'border-gray-100 shadow-md hover:shadow-xl'
                                        }`}
                                >
                                    {pack.popular && (
                                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary-800 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                                            <FiZap className="text-yellow-400" /> {t('pricing.mostPopular')}
                                        </div>
                                    )}

                                    <div className="mb-6 mt-2 text-center">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                                            {t(`pricing.plans.${pack.id === 'pack_40' ? 'testing' : pack.id === 'pack_100' ? 'popular' : 'heavy'}.name`)}
                                        </h3>
                                        <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                                            {t(`pricing.plans.${pack.id === 'pack_40' ? 'testing' : pack.id === 'pack_100' ? 'popular' : 'heavy'}.subtitle`)}
                                        </p>
                                        <div className="flex items-baseline justify-center gap-2 mb-2">
                                            <span className="text-5xl font-black text-primary-900">
                                                {pack.credits}
                                            </span>
                                            <span className="text-gray-400 font-medium text-lg">{t('pricing.credits')}</span>
                                        </div>
                                        <div className="bg-primary-50 rounded-xl py-2 px-4 inline-block mt-2">
                                            <p className="text-primary-800 text-lg font-bold">{pack.priceMad} {t('pricing.currency')}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                                            <FiCheck className="text-primary-600 flex-shrink-0" />
                                            <span>{t('pricing.features.premiumDownloads', { count: Math.floor(pack.credits / DOWNLOAD_COST) })}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <FiCheck className="text-primary-600 flex-shrink-0" />
                                            <span>{t('pricing.features.noWatermark')}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <FiDownload className="text-primary-600 flex-shrink-0" />
                                            <span>{t('pricing.features.hqPdf')}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <FiStar className="text-yellow-500 flex-shrink-0" />
                                            <span>{t('pricing.features.premiumTemplates')}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-auto">
                                        <Button
                                            variant={pack.popular ? 'primary' : 'outline'}
                                            onClick={() => setSelectedPack(pack)}
                                            fullWidth
                                            className={`h-12 md:h-14 font-bold transition-all ${
                                                pack.popular ? 'bg-primary-800 hover:bg-black shadow-lg hover:shadow-primary-200' : ''
                                            }`}
                                        >
                                            {t(`pricing.plans.${pack.id === 'pack_40' ? 'testing' : pack.id === 'pack_100' ? 'popular' : 'heavy'}.cta`)}
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
                </div>
            </div>
        </PayPalScriptProvider>
    );
};

export default PricingPage;
