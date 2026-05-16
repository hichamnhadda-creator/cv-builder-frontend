import React from 'react';
import LegalPageLayout from '../layouts/LegalPageLayout';
import { APP_NAME } from '../utils/constants';

const TermsOfService = () => {
    return (
        <LegalPageLayout title="Terms of Service" lastUpdated="May 16, 2026">
            <section className="mb-10">
                <h2 className="text-2xl font-bold text-primary-900 mb-4">1. Agreement to Terms</h2>
                <p>
                    By accessing or using <strong>{APP_NAME}</strong>, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
                </p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-bold text-primary-900 mb-4">2. Description of Service</h2>
                <p>
                    {APP_NAME} provides an online platform for users to build, edit, and export professional resumes (CVs) and generate cover letters using AI technology. Services include both free features and premium features accessible through a credit-based payment system.
                </p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-bold text-primary-900 mb-4">3. Accounts and Credits</h2>
                <p>
                    When you create an account with us, you must provide information that is accurate and current. You are responsible for safeguarding the password that you use to access the service.
                </p>
                <p className="mt-4">
                    Our platform uses a <strong>Credit System</strong> for certain premium features (e.g., PDF exports, premium templates, AI cover letters). Credits are purchased via Paddle and are non-transferable.
                </p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-bold text-primary-900 mb-4">4. Intellectual Property</h2>
                <p>
                    The service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of {APP_NAME}. 
                </p>
                <p className="mt-4">
                    <strong>User Content:</strong> You retain all rights to the information you input into your resumes. By using our service, you grant us a license to host and process this data solely for the purpose of providing the service to you.
                </p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-bold text-primary-900 mb-4">5. User Conduct</h2>
                <p>
                    You agree not to use the service:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                    <li>For any unlawful purpose or to solicit others to perform unlawful acts.</li>
                    <li>To upload or transmit viruses or any other type of malicious code.</li>
                    <li>To impersonate any person or entity or provide false information.</li>
                    <li>To scrape or collect data from the platform without authorization.</li>
                </ul>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-bold text-primary-900 mb-4">6. Limitation of Liability</h2>
                <p>
                    In no event shall {APP_NAME}, nor its directors, employees, or partners, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
                </p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-bold text-primary-900 mb-4">7. Termination</h2>
                <p>
                    We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the service will immediately cease.
                </p>
            </section>

            <section className="mb-10 text-center pt-8 border-t border-gray-50">
                <p className="text-gray-500">
                    For any questions regarding these terms, please contact us at <strong>legal@fastcvbuilder.com</strong>
                </p>
            </section>
        </LegalPageLayout>
    );
};

export default TermsOfService;
