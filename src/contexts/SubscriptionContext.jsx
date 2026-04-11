import React, { createContext, useContext } from 'react';

const SubscriptionContext = createContext(null);

export const SubscriptionProvider = ({ children }) => {
    return (
        <SubscriptionContext.Provider value={{ isPremium: false, downloadCount: 0 }}>
            {children}
        </SubscriptionContext.Provider>
    );
};

export const useSubscription = () => {
    const context = useContext(SubscriptionContext);
    if (!context) {
        throw new Error('useSubscription must be used within SubscriptionProvider');
    }
    return context;
};
