import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck, FiX } from 'react-icons/fi';
import { ROUTES, PLAN_FEATURES, PLANS } from '../utils/constants';
import Button from '../components/Button';
import PaymentModal from '../components/PaymentModal';
import { useSubscription } from '../contexts/SubscriptionContext';

const PricingPage = () => {
    const navigate = useNavigate();
    const { isPremium } = useSubscription();
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    const plans = [
        {
            id: PLANS.FREE,
            ...PLAN_FEATURES[PLANS.FREE],
            highlighted: false,
            current: !isPremium
        },
        {
            id: PLANS.PREMIUM,
            ...PLAN_FEATURES[PLANS.PREMIUM],
            highlighted: true,
            current: isPremium
        }
    ];

    const handlePlanClick = (plan) => {
        if (plan.id === PLANS.FREE) {
            navigate(ROUTES.DASHBOARD);
        } else {
            if (isPremium) {
                navigate(ROUTES.DASHBOARD);
            } else {
                setIsPaymentModalOpen(true);
            }
        }
    };

    return (
        <div className="min-h-screen bg-off-white">
            {/* Header */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-primary-800">Pricing</h1>
                        <Button variant="ghost" onClick={() => navigate(ROUTES.HOME)}>
                            Back to Home
                        </Button>
                    </div>
                </div>
            </div>

            {/* Pricing Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
                <div className="text-center mb-8 md:mb-10">
                    <h2 className="text-3xl md:text-4xl font-black text-primary-900 mb-2 md:mb-4 tracking-tight">
                        Simple, transparent pricing
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Start for free, then upgrade to unlock unlimited downloads and advanced features.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 border transition-all duration-300 relative ${plan.highlighted
                                ? 'border-primary-800 shadow-2xl scale-105 ring-1 ring-primary-800'
                                : 'border-gray-100 shadow-md hover:shadow-xl'
                                }`}
                        >
                            {plan.current && (
                                <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    Active
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-primary-800 mb-2">
                                    {plan.name}
                                </h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-black text-primary-900">
                                        ${plan.price}
                                    </span>
                                    {plan.price > 0 && (
                                        <span className="text-gray-400 font-medium">/month</span>
                                    )}
                                </div>
                            </div>

                            <ul className="space-y-3 mb-6">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <FiCheck className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                        <span className="text-gray-600 font-medium text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                variant={plan.highlighted ? 'primary' : 'outline'}
                                onClick={() => handlePlanClick(plan)}
                                fullWidth
                                disabled={plan.current}
                                className="h-12 md:h-14 text-sm md:text-base"
                            >
                                {plan.current
                                    ? 'Current Plan'
                                    : plan.price === 0
                                        ? 'Continue for Free'
                                        : 'Upgrade to PRO'}
                            </Button>
                        </div>
                    ))}
                </div>

                <div className="mt-8 md:mt-12 text-center">
                    <p className="text-gray-400 text-sm">
                        All plans include 256-bit SSL encryption and expert support.
                    </p>
                </div>
            </div>

            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
            />
        </div>
    );
};

export default PricingPage;
