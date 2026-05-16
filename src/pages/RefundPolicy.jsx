import React from 'react';
import LegalPageLayout from '../layouts/LegalPageLayout';
import { APP_NAME } from '../utils/constants';

const RefundPolicy = () => {
    return (
        <LegalPageLayout title="Refund Policy" lastUpdated="May 16, 2026">
            <section className="mb-10">
                <h2 className="text-2xl font-bold text-primary-900 mb-4">1. Overview</h2>
                <p>
                    Thank you for using <strong>{APP_NAME}</strong>. We want to ensure you have the best experience building your professional CV. Since we offer digital products (credits for resume exports and AI features), we have established this refund policy to be as fair as possible.
                </p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-bold text-primary-900 mb-4">2. Digital Products (Credits)</h2>
                <p>
                    Our platform operates on a credit-based system. Credits are used to unlock premium features such as high-quality PDF exports, premium templates, and AI-powered cover letter generation.
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                    <li><strong>Unused Credits:</strong> You may request a refund for unused credits within <strong>14 days</strong> of purchase, provided that no credits from that specific pack have been consumed.</li>
                    <li><strong>Used Credits:</strong> Once a credit has been used to export a CV or generate an AI cover letter, the service for that credit is considered rendered and is non-refundable.</li>
                </ul>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-bold text-primary-900 mb-4">3. Technical Issues</h2>
                <p>
                    If you experience a technical issue that prevents you from using your purchased credits (e.g., an export failure or AI generation error), please contact our support team immediately. If we cannot resolve the issue, we will happily refund the specific credits or the full transaction value if appropriate.
                </p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-bold text-primary-900 mb-4">4. Refund Process</h2>
                <p>
                    To request a refund, please email <strong>billing@fastcvbuilder.com</strong> with your:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                    <li>Account email address</li>
                    <li>Transaction ID (from your Paddle receipt)</li>
                    <li>Reason for the refund request</li>
                </ul>
                <p className="mt-4">
                    Refunds are processed back to the original payment method through Paddle. Processing times usually vary between 5-10 business days depending on your bank.
                </p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-bold text-primary-900 mb-4">5. Abuse of Policy</h2>
                <p>
                    {APP_NAME} reserves the right to refuse refunds if we detect abuse of this policy, such as repeated refund requests for the same user or fraudulent activity.
                </p>
            </section>

            <section className="mb-10 text-center pt-8 border-t border-gray-50">
                <p className="text-gray-500">
                    Questions about your billing? We're here to help at <strong>billing@fastcvbuilder.com</strong>
                </p>
            </section>
        </LegalPageLayout>
    );
};

export default RefundPolicy;
