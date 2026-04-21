export const getUserPlan = (user) => {
    // Determine user plan. Fallback to deriving from hasPurchased if plan isn't explicitly set.
    if (user?.plan) return user.plan;
    if (user?.hasPurchased) return 'pro';
    return 'free';
};

export const canUseTemplate = (user, templateId, allTemplates) => {
    const plan = getUserPlan(user);
    if (plan === 'pro') return true;
    
    // For free plan, only first template is unlocked
    return allTemplates && allTemplates.length > 0 && templateId === allTemplates[0].id;
};

export const getLockedMessage = () => "Upgrade to unlock";
