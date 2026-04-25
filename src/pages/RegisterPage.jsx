import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import toast from 'react-hot-toast';

const RegisterPage = () => {
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
            navigate(ROUTES.DASHBOARD);
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setLoading(true);
        console.log('--- REGISTRATION REQUEST ---');
        console.log('Payload:', { email: formData.email, fullName: formData.fullName });
        try {
            const response = await register(formData.email, formData.password, formData.fullName);
            console.log('--- REGISTRATION RESPONSE ---');
            console.log('Success:', response);
            
            if (!response.session && response.user) {
                // Supabase requires email confirmation
                toast.success('Registration successful! Please check your email to verify your account.');
                // Navigate to login so they can login after verifying
                navigate(ROUTES.LOGIN);
            } else {
                toast.success('Registration successful!');
                // Navigation to dashboard handled by useEffect if authenticated
            }
        } catch (error) {
            console.error('--- REGISTRATION ERROR ---');
            console.error('Full Error Object:', error);
            const errorMessage = error?.message || 'Unknown error occurred';
            toast.error('Registration failed: ' + errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or <Link to={ROUTES.LOGIN} className="font-medium text-primary-600 hover:text-primary-500">sign in to existing account</Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <FormInput
                            label="Full Name"
                            name="fullName"
                            type="text"
                            required
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="John Doe"
                        />
                        <FormInput
                            label="Email address"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                        />
                        <FormInput
                            label="Password"
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="********"
                        />
                        <FormInput
                            label="Confirm Password"
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
                            {loading ? 'Creating account...' : 'Sign up'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
