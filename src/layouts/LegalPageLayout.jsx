import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const LegalPageLayout = ({ title, lastUpdated, children }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white min-h-screen py-12 md:py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="mb-12 border-b border-gray-100 pb-8 text-center">
                        <h1 className="text-4xl md:text-5xl font-black text-primary-900 mb-4 tracking-tight">
                            {title}
                        </h1>
                        {lastUpdated && (
                            <p className="text-gray-400 font-medium italic">
                                Last updated: {lastUpdated}
                            </p>
                        )}
                    </div>
                    
                    <div className="space-y-6 text-gray-600 font-medium leading-relaxed">
                        {children}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default LegalPageLayout;
