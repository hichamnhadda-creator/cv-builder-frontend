import React from 'react';
import Navbar from '../components/Navbar';

const MainLayout = ({ children, noPadding = false }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar isTransparent={noPadding} />
            {/* 
                Add padding-top to prevent content from hiding behind the fixed navbar.
                Navbar height is approx 80px (py-6 + content), so pt-24 (6rem/96px) checks out comfortably.
                If noPadding is true, we don't add the padding (useful for hero sections).
            */}
            <main className={`flex-grow ${noPadding ? '' : 'pt-20'}`}>
                {children}
            </main>
        </div>
    );
};

export default MainLayout;
