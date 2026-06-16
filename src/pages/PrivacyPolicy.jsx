import React from 'react';
import LegalPageLayout from '../layouts/LegalPageLayout';
import { APP_NAME } from '../utils/constants';

const PrivacyPolicy = () => {
    return (
        <LegalPageLayout title="Privacy Policy" lastUpdated="May 16, 2026">
            <section className="mb-10">
                <h2 className="text-2xl font-bold text-primary-900 mb-4">1. Introduction</h2>
                <p>
                    At <strong>{APP_NAME}</strong>, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                </p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-bold text-primary-900 mb-4">2. The Data We Collect</h2>
                <p>
                    We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                    <li><strong>Identity Data:</strong> includes first name, last name, and professional title.</li>
                    <li><strong>Contact Data:</strong> includes email address and phone number.</li>
                    <li><strong>Professional Data:</strong> includes your work history, education, skills, and any other information you choose to include in your resumes.</li>
                    <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, and platform.</li>
                    <li><strong>Usage Data:</strong> includes information about how you use our website and services.</li>
                </ul>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-bold text-primary-900 mb-4">3. How We Use Your Data</h2>
                <p>
                    We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                    <li>To provide the CV building services you requested.</li>
                    <li>To process your credit purchases and payments via Polar.</li>
                    <li>To improve our AI-powered features, such as cover letter generation.</li>
                    <li>To notify you about changes to our service.</li>
                    <li>To provide customer support.</li>
                </ul>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-bold text-primary-900 mb-4">4. Data Security</h2>
                <p>
                    We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. Your resumes and personal information are stored securely using Supabase's encrypted infrastructure.
                </p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-bold text-primary-900 mb-4">5. AI and Automation</h2>
                <p>
                    Our platform uses AI to assist in creating resumes and generating cover letters. While we use advanced models to provide high-quality content, we do not use your personal resume data to train third-party AI models without your explicit consent. The data sent to AI services (like Google Gemini) is processed according to their strict privacy standards.
                </p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-bold text-primary-900 mb-4">6. Third-Party Services</h2>
                <p>
                    We use several third-party services to provide our platform:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                    <li><strong>Supabase:</strong> For database management and authentication.</li>
                    <li><strong>Polar:</strong> For secure payment processing and billing.</li>
                    <li><strong>Google Gemini:</strong> For AI-powered content generation.</li>
                </ul>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-bold text-primary-900 mb-4">7. Your Legal Rights</h2>
                <p>
                    Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, or restriction of your personal data.
                </p>
            </section>

            <section className="mb-10 text-center pt-8 border-t border-gray-50">
                <p className="text-gray-500">
                    If you have any questions about this privacy policy, please contact us at <strong>hichamnhadda@gmail.com</strong>
                </p>
            </section>
        </LegalPageLayout>
    );
};

export default PrivacyPolicy;
