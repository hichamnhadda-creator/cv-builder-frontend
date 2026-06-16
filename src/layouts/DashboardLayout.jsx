import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';

const DashboardLayout = ({ children }) => {
    // We only show the sidebar if the user is authenticated, otherwise we might fallback to regular layout
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar />
                <main className="flex-1 pt-[76px]">
                    {children}
                </main>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
            {/* Sidebar for Desktop */}
            <div className="hidden md:block">
                <Sidebar />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col md:ml-[280px] h-screen overflow-y-auto">
                {/* Mobile Navbar just for toggling sidebar or showing basic info if needed on mobile. For now, hiding sidebar on mobile entirely and just showing content, but typically we'd have a mobile header. Let's just render children for simplicity */}
                <main className="flex-1 p-6 lg:p-8 flex flex-col min-h-full">
                    <div className="flex-1">
                        {children}
                    </div>
                    <div className="mt-8 border-t border-gray-100 pt-4">
                        <Footer />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
