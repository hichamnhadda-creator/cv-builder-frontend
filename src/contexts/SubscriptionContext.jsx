import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const SubscriptionContext = createContext();

export const useSubscription = () => {
    const context = useContext(SubscriptionContext);
    if (!context) {
        throw new Error('useSubscription must be used within a SubscriptionProvider');
    }
    return context;
};

export const SubscriptionProvider = ({ children }) => {
    const [isPremium, setIsPremium] = useState(false);
    const [loading, setLoading] = useState(true);
    const [downloadCount, setDownloadCount] = useState(0);

    useEffect(() => {
        try {
            // Check local storage for settings
            const savedStatus = localStorage.getItem('isPremium');
            if (savedStatus === 'true') {
                setIsPremium(true);
            }

            const savedDownloads = localStorage.getItem('download_count');
            if (savedDownloads) {
                setDownloadCount(parseInt(savedDownloads, 10));
            }
        } catch (error) {
            console.error('Failed to load subscription data:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const upgradeToPremium = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                setIsPremium(true);
                localStorage.setItem('isPremium', 'true');
                toast.success('Successfully upgraded to Premium!');
                resolve();
            }, 1000);
        });
    };

    const incrementDownloadCount = () => {
        const newCount = downloadCount + 1;
        setDownloadCount(newCount);
        localStorage.setItem('download_count', newCount.toString());
    };

    const value = {
        isPremium,
        upgradeToPremium,
        loading,
        downloadCount,
        incrementDownloadCount
    };

    return (
        <SubscriptionContext.Provider value={value}>
            {loading ? (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                </div>
            ) : (
                children
            )}
        </SubscriptionContext.Provider>
    );
};
