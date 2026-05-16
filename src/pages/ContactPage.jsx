import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMessageCircle, FiMapPin, FiSend, FiCheckCircle } from 'react-icons/fi';
import Button from '../components/Button';
import { APP_NAME } from '../utils/constants';
import toast from 'react-hot-toast';

const ContactPage = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setIsLoading(false);
        setIsSubmitted(true);
        toast.success('Message sent successfully!');
    };

    return (
        <div className="bg-white min-h-screen py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black text-primary-900 mb-4 tracking-tight"
                    >
                        Get in Touch
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-500 font-medium max-w-2xl mx-auto"
                    >
                        Have questions about {APP_NAME}? Our support team is here to help you build the perfect career.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {/* Contact Info */}
                    <div className="md:col-span-1 space-y-8">
                        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                            <h2 className="text-2xl font-bold text-primary-900 mb-8">Contact Info</h2>
                            
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary-600 shadow-sm border border-gray-100">
                                        <FiMail size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">Email Us</p>
                                        <p className="text-gray-500">support@fastcvbuilder.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary-600 shadow-sm border border-gray-100">
                                        <FiMessageCircle size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">Live Chat</p>
                                        <p className="text-gray-500">Available Mon-Fri, 9am-6pm</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary-600 shadow-sm border border-gray-100">
                                        <FiMapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">Our Office</p>
                                        <p className="text-gray-500">Casablanca, Morocco</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="md:col-span-2">
                        {isSubmitted ? (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-primary-50 border-2 border-primary-100 p-12 rounded-3xl text-center flex flex-col items-center justify-center h-full"
                            >
                                <FiCheckCircle className="text-primary-600 mb-6" size={64} />
                                <h3 className="text-3xl font-black text-primary-900 mb-4">Message Sent!</h3>
                                <p className="text-primary-700 font-medium mb-8 max-w-md">
                                    Thank you for reaching out. We've received your message and will get back to you within 24 hours.
                                </p>
                                <Button variant="primary" onClick={() => setIsSubmitted(false)}>
                                    Send Another Message
                                </Button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">Full Name</label>
                                        <input 
                                            required
                                            type="text" 
                                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/5 transition-all outline-none font-medium"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">Email Address</label>
                                        <input 
                                            required
                                            type="email" 
                                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/5 transition-all outline-none font-medium"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">Subject</label>
                                    <select 
                                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/5 transition-all outline-none font-medium appearance-none"
                                    >
                                        <option>General Inquiry</option>
                                        <option>Technical Support</option>
                                        <option>Billing Question</option>
                                        <option>Partnership</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">Message</label>
                                    <textarea 
                                        required
                                        rows="6"
                                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/5 transition-all outline-none font-medium resize-none"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>
                                <Button 
                                    type="submit" 
                                    variant="primary" 
                                    fullWidth 
                                    isLoading={isLoading}
                                    className="py-5 text-lg font-black tracking-tight"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        Send Message <FiSend />
                                    </span>
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
