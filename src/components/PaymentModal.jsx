import React, { useState } from 'react';
import { FiCreditCard, FiLock, FiCheckCircle } from 'react-icons/fi';
import Modal from './Modal';
import Button from './Button';
import { useSubscription } from '../contexts/SubscriptionContext';

const PaymentModal = ({ isOpen, onClose }) => {
    const { upgradeToPremium } = useSubscription();
    const [processing, setProcessing] = useState(false);
    const [step, setStep] = useState('payment'); // payment, success

    const handlePayment = async (e) => {
        e.preventDefault();
        setProcessing(true);
        try {
            await upgradeToPremium();
            setStep('success');
        } catch (error) {
            console.error(error);
        } finally {
            setProcessing(false);
        }
    };

    const handleClose = () => {
        if (step === 'success') {
            // Reset state when closing after success
            setStep('payment');
        }
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={step === 'payment' ? 'Upgrade to Premium' : 'Success!'}
            size="md"
        >
            {step === 'payment' ? (
                <div className="p-4">
                    <div className="bg-blue-50 p-4 rounded-lg mb-6 flex items-start gap-3">
                        <FiLock className="text-blue-500 mt-1" />
                        <div>
                            <h4 className="font-semibold text-blue-800">Secure Checkout</h4>
                            <p className="text-sm text-blue-600">Your payment information is encrypted and secure.</p>
                        </div>
                    </div>

                    <form onSubmit={handlePayment} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-gray-400">
                                    <FiCreditCard />
                                </span>
                                <input
                                    type="text"
                                    placeholder="0000 0000 0000 0000"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                                <input
                                    type="text"
                                    placeholder="MM/YY"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                                <input
                                    type="text"
                                    placeholder="123"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button
                                type="submit"
                                variant="primary"
                                fullWidth
                                disabled={processing}
                            >
                                {processing ? 'Processing...' : 'Pay $12.00 / month'}
                            </Button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiCheckCircle className="text-green-500 text-3xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Payment Successful!</h3>
                    <p className="text-gray-600 mb-6">
                        You are now a Premium member. Enjoy all the exclusive features and templates.
                    </p>
                    <Button
                        variant="primary"
                        onClick={handleClose}
                        fullWidth
                    >
                        Start Creating
                    </Button>
                </div>
            )}
        </Modal>
    );
};

export default PaymentModal;
