export const getUserPlan = (user) => {
    // Determine user plan. Fallback to deriving from hasPurchased if plan isn't explicitly set.
    if (user?.plan) return user.plan;
    if (user?.hasPurchased) return 'pro';
    return 'free';
};

export const canUseTemplate = (user, templateId, allTemplates) => {
    const plan = getUserPlan(user);
    if (plan === 'pro') return true;
    
    // For free plan, find the template and check if it's free
    const template = allTemplates.find(t => t.id === templateId);
    return template?.access === 'free';
};

export const getLockedMessage = () => "Upgrade to unlock";
