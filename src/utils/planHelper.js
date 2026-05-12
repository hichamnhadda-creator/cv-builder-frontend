export const getUserPlan = (user) => {
    // Determine user plan. Fallback to deriving from hasPurchased if plan isn't explicitly set.
    if (user?.plan) return user.plan;
    if (user?.hasPurchased || user?.has_purchased) return 'pro';
    return 'free';
};

export const canUseTemplate = (user, templateId, allTemplates) => {
    const plan = getUserPlan(user);
    if (plan === 'pro') return true;
    
    // For free plan, find the template and check if it's free
    const cleanId = templateId?.trim()?.toLowerCase();
    const template = allTemplates.find(t => t.id?.trim()?.toLowerCase() === cleanId);
    
    // STRICT LOGIC: Must be explicitly free
    const isFree = template?.isFree === true || template?.access === 'free' || template?.isPremium === false;
    
    console.log(`[PlanHelper] Access for ${templateId}. isFree: ${isFree}, Found: ${!!template}`);
    
    if (isFree) return true;
    
    // Otherwise, it's a premium template and user is on free plan
    return false;
};

export const getLockedMessage = () => "Upgrade to unlock premium designs";
