import React from 'react';
import { FiAlertCircle, FiCreditCard } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import Button from './Button';
import { ROUTES } from '../utils/constants';

const PaymentModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    const handleBuyCredits = () => {
        onClose();
        navigate(ROUTES.PRICING); // Now redirects to the new Buy Credits page
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Not Enough Credits"
            size="md"
        >
            <div className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100">
                    <FiAlertCircle className="text-blue-500 text-3xl" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">Needs 5 Credits</h3>
                <p className="text-gray-600 mb-6">
                    Exporting a high-quality PDF of your CV costs 5 credits. Purchase a credit pack to download your CV instantly.
                </p>
                <div className="flex gap-4">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        fullWidth
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleBuyCredits}
                        fullWidth
                        icon={<FiCreditCard />}
                    >
                        Buy Credits
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default PaymentModal;
