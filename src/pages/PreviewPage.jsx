import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/constants';

const PreviewPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Preview is integrated into the editor, redirect to dashboard
        navigate(ROUTES.DASHBOARD);
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Redirecting to dashboard...</p>
            </div>
        </div>
    );
};

export default PreviewPage;
