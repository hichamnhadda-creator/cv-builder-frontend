import React, { Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import { CVProvider } from './contexts/CVContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ROUTES } from './utils/constants';
import MainLayout from './layouts/MainLayout';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load pages
const HomePage = React.lazy(() => import('./pages/HomePage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));
const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));
const EditorPage = React.lazy(() => import('./pages/EditorPage'));
const TemplatesPage = React.lazy(() => import('./pages/TemplatesPage'));
const PricingPage = React.lazy(() => import('./pages/PricingPage'));
const PreviewPage = React.lazy(() => import('./pages/PreviewPage'));

// Create QueryClient
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 5 * 60 * 1000, // 5 minutes
        },
    },
});

// Loading component
const LoadingFallback = () => (
    <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
    </div>
);

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <AuthProvider>
                    <SubscriptionProvider>
                        <CVProvider>
                            <Router>
                                <Suspense fallback={<LoadingFallback />}>
                                    <Routes>
                                        <Route path={ROUTES.HOME} element={<MainLayout noPadding={true}><HomePage /></MainLayout>} />
                                        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                                        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
                                        <Route path={ROUTES.DASHBOARD} element={<MainLayout><DashboardPage /></MainLayout>} />
                                        <Route path={ROUTES.EDITOR} element={
                                            <ErrorBoundary>
                                                <EditorPage />
                                            </ErrorBoundary>
                                        } />
                                        <Route path={`${ROUTES.EDITOR}/:cvId`} element={
                                            <ErrorBoundary>
                                                <EditorPage />
                                            </ErrorBoundary>
                                        } />
                                        <Route path={ROUTES.TEMPLATES} element={
                                            <MainLayout>
                                                <ErrorBoundary>
                                                    <TemplatesPage />
                                                </ErrorBoundary>
                                            </MainLayout>
                                        } />
                                        <Route path={ROUTES.PRICING} element={<MainLayout><PricingPage /></MainLayout>} />
                                        <Route path={ROUTES.PREVIEW} element={<PreviewPage />} />
                                    </Routes>
                                </Suspense>
                            </Router>

                            {/* Toast Notifications */}
                            <Toaster
                                position="top-right"
                                toastOptions={{
                                    duration: 3000,
                                    style: {
                                        background: '#363636',
                                        color: '#fff',
                                    },
                                    success: {
                                        iconTheme: {
                                            primary: '#10b981',
                                            secondary: '#fff',
                                        },
                                    },
                                    error: {
                                        iconTheme: {
                                            primary: '#ef4444',
                                            secondary: '#fff',
                                        },
                                    },
                                }}
                            />
                        </CVProvider>
                    </SubscriptionProvider>
                </AuthProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
