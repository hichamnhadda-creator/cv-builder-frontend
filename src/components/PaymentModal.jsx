import React from 'react';
import { FiAlertCircle, FiCreditCard, FiZap, FiCheck, FiStar } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import Button from './Button';
import { ROUTES } from '../utils/constants';
import { useAuth } from '../contexts/AuthContext';

const PaymentModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    
    const isFreeUser = !user?.hasPurchased && (user?.credits || 0) < 5;
    const isLimitReached = (user?.freeExportCount || 0) >= 1;

    const handleBuyCredits = () => {
        onClose();
        navigate(ROUTES.PRICING);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={null} // Hide default title for custom design
            size="md"
        >
            <div className="relative overflow-hidden rounded-t-3xl">
                {/* Header Gradient Decor */}
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-[#2563eb] to-[#4f46e5] opacity-10"></div>
                
                <div className="p-8 pt-10 text-center relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#2563eb] to-[#4f46e5] rounded-[22px] flex items-center justify-center mx-auto mb-6 shadow-[0_10px_25px_rgba(37,99,235,0.3)] transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                        <FiStar className="text-white text-4xl" />
                    </div>
                    
                    <h3 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">
                        {isLimitReached ? 'Limit Reached' : 'Upgrade to Premium'}
                    </h3>
                    
                    <p className="text-gray-600 text-lg leading-relaxed mb-8 px-4">
                        {isLimitReached 
                            ? "You've used your 1 free export. Unlock unlimited exports and premium templates today!"
                            : "Unlock the full potential of your career with premium features and unlimited downloads."}
                    </p>

                    <div className="bg-blue-50/50 rounded-2xl p-5 mb-8 border border-blue-100/50">
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white shrink-0">
                                    <FiCheck size={12} strokeWidth={4} />
                                </div>
                                <span>Unlimited Premium Template Downloads</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white shrink-0">
                                    <FiCheck size={12} strokeWidth={4} />
                                </div>
                                <span>Professional Photo Integration</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white shrink-0">
                                    <FiCheck size={12} strokeWidth={4} />
                                </div>
                                <span>Priority Support & AI Enhancements</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Button
                            variant="primary"
                            onClick={handleBuyCredits}
                            fullWidth
                            className="h-14 text-lg font-black shadow-xl shadow-blue-500/25 rounded-2xl"
                            icon={<FiZap className="fill-current" />}
                        >
                            Get Unlimited Access
                        </Button>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 font-bold text-sm py-2 transition-colors"
                        >
                            Maybe later
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default PaymentModal;
