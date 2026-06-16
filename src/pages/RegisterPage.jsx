import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const RegisterPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { register, isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    React.useEffect(() => {
        if (isAuthenticated) {
            const urlParams = new URLSearchParams(window.location.search);
            const plan = urlParams.get('plan');
            
            if (plan === 'free') {
                navigate(`${ROUTES.DASHBOARD}?start_free=true`);
            } else {
                navigate(ROUTES.DASHBOARD);
            }
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error(t('auth.passwordsDoNotMatch'));
            return;
        }

        setLoading(true);
        try {
            const response = await register(formData.email, formData.password, formData.fullName);
            
            if (!response.session && response.user) {
                toast.success(`${t('auth.registrationSuccess')} ${t('auth.checkEmail')}`);
                navigate(ROUTES.LOGIN);
            } else {
                toast.success(t('auth.registrationSuccess'));
            }
        } catch (error) {
            const errorMessage = error?.message || t('errors.serverError');
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {t('auth.registerTitle')}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        {t('auth.or')} <Link to={ROUTES.LOGIN} className="font-medium text-primary-600 hover:text-primary-500">{t('auth.signInExistingLink')}</Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <FormInput
                            label={t('auth.fullNameLabel')}
                            name="fullName"
                            type="text"
                            required
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="John Doe"
                        />
                        <FormInput
                            label={t('auth.emailLabel')}
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                        />
                        <FormInput
                            label={t('auth.passwordLabel')}
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="********"
                        />
                        <FormInput
                            label={t('auth.confirmPasswordLabel')}
                            name="confirmPassword"
                            type="password"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="********"
                        />
                    </div>

                    <div>
                        <Button
                            type="submit"
                            variant="primary"
                            fullWidth
                            disabled={loading}
                        >
                            {loading ? t('auth.creatingAccount') : t('auth.signUp')}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
