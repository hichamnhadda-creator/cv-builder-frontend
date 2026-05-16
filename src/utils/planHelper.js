export const getUserPlan = (user, credits = 0, hasPurchased = false) => {
    // Determine user plan strictly.
    if (user?.plan === 'pro') return 'pro';
    if (hasPurchased) return 'pro';
    if (Number(credits) > 0) return 'pro';
    
    // Fallback check on user object properties
    if (user?.hasPurchased || user?.has_purchased) return 'pro';
    if (Number(user?.credits || 0) > 0) return 'pro';

    return 'free';
};

export const canUseTemplate = (user, templateId, allTemplates, credits = 0, hasPurchased = false) => {
    const plan = getUserPlan(user, credits, hasPurchased);
    
    // For free plan, ONLY allow the default template (modern-1)
    const cleanId = templateId?.trim()?.toLowerCase();
    const isFree = cleanId === 'modern-1';
    
    if (plan === 'pro') return true;
    return isFree;
};

export const getLockedMessage = () => "Upgrade to unlock premium designs";
