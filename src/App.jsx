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
import DashboardLayout from './layouts/DashboardLayout';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy load pages
const HomePage = React.lazy(() => import('./pages/HomePage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));
const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));
const EditorPage = React.lazy(() => import('./pages/EditorPage'));
const TemplatesPage = React.lazy(() => import('./pages/TemplatesPage'));
const PricingPage = React.lazy(() => import('./pages/PricingPage'));
const PreviewPage = React.lazy(() => import('./pages/PreviewPage'));
const CoverLettersPage = React.lazy(() => import('./pages/CoverLettersPage'));
const StatisticsPage = React.lazy(() => import('./pages/StatisticsPage'));
const ImportCVPage = React.lazy(() => import('./pages/ImportCVPage'));
const SettingsPage = React.lazy(() => import('./pages/SettingsPage'));
const SupportDashboardPage = React.lazy(() => import('./pages/SupportDashboardPage'));
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import RefundPolicy from './pages/RefundPolicy';
import ContactPage from './pages/ContactPage';

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
                                <ErrorBoundary>
                                    <Suspense fallback={<LoadingFallback />}>
                                        <Routes>
                                            <Route path={ROUTES.HOME} element={<MainLayout noPadding={true}><HomePage /></MainLayout>} />
                                            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                                            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
                                            <Route path={ROUTES.DASHBOARD} element={
                                                <ProtectedRoute>
                                                    <DashboardLayout><DashboardPage /></DashboardLayout>
                                                </ProtectedRoute>
                                            } />
                                            <Route path={ROUTES.COVER_LETTERS} element={
                                                <ProtectedRoute>
                                                    <DashboardLayout><CoverLettersPage /></DashboardLayout>
                                                </ProtectedRoute>
                                            } />
                                            <Route path={ROUTES.STATISTICS} element={
                                                <ProtectedRoute>
                                                    <DashboardLayout><StatisticsPage /></DashboardLayout>
                                                </ProtectedRoute>
                                            } />
                                            <Route path={ROUTES.IMPORT_CV} element={
                                                <ProtectedRoute>
                                                    <DashboardLayout><ImportCVPage /></DashboardLayout>
                                                </ProtectedRoute>
                                            } />
                                            <Route path={ROUTES.SETTINGS} element={
                                                <ProtectedRoute>
                                                    <DashboardLayout><SettingsPage /></DashboardLayout>
                                                </ProtectedRoute>
                                            } />
                                            <Route path={ROUTES.SUPPORT} element={
                                                <ProtectedRoute>
                                                    <DashboardLayout><SupportDashboardPage /></DashboardLayout>
                                                </ProtectedRoute>
                                            } />
                                            <Route path={ROUTES.EDITOR} element={
                                                <ProtectedRoute>
                                                    <EditorPage />
                                                </ProtectedRoute>
                                            } />
                                            <Route path={`${ROUTES.EDITOR}/:cvId`} element={
                                                <ProtectedRoute>
                                                    <EditorPage />
                                                </ProtectedRoute>
                                            } />
                                            <Route path={ROUTES.TEMPLATES} element={
                                                <ProtectedRoute>
                                                    <MainLayout>
                                                        <TemplatesPage />
                                                    </MainLayout>
                                                </ProtectedRoute>
                                            } />
                                            <Route path={ROUTES.PRICING} element={<MainLayout><PricingPage /></MainLayout>} />
                                            <Route path={ROUTES.PREVIEW} element={<PreviewPage />} />
                                            <Route path={ROUTES.PRIVACY} element={<MainLayout><PrivacyPolicy /></MainLayout>} />
                                            <Route path={ROUTES.TERMS} element={<MainLayout><TermsOfService /></MainLayout>} />
                                            <Route path={ROUTES.REFUND} element={<MainLayout><RefundPolicy /></MainLayout>} />
                                            <Route path={ROUTES.CONTACT} element={<MainLayout><ContactPage /></MainLayout>} />
                                        </Routes>
                                    </Suspense>
                                </ErrorBoundary>
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
