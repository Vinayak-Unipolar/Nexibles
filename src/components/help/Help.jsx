'use client'
import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function Help() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/save-contact-message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Failed to send message');
            }
            const responseData = await response.json();
            setFormData({ name: '', email: '', message: '' });
            toast.success(responseData.message);
        } catch (error) {
            console.error('Error sending message:', error);
            alert('An error occurred while sending the message. Please try again later.');
        }
    };

    return (
        <>
            <div className="bg-white h-auto">
                <section className="container mx-auto py-12">
                    <h2 className="text-3xl font-semibold mb-6 text-black text-center">Frequently Asked Questions (FAQ)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                        {/* Add FAQ items here */}
                        <div className="p-4 border border-gray-300 rounded">
                            <h3 className="text-lg font-medium mb-2">How do I place an order?</h3>
                            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non feugiat leo.</p>
                        </div>
                        <div className="p-4 border border-gray-300 rounded">
                            <h3 className="text-lg font-medium mb-2">What payment methods do you accept?</h3>
                            <p className="text-gray-600">We accept major credit cards and PayPal for secure transactions.</p>
                        </div>
                        <div className="p-4 border border-gray-300 rounded">
                            <h3 className="text-lg font-medium mb-2">What payment methods do you accept?</h3>
                            <p className="text-gray-600">We accept major credit cards and PayPal for secure transactions.</p>
                        </div>
                    </div>
                </section>

                <section className="bg-gray-200 py-12">
                    <div className="container mx-auto lg:w-1/2">
                        <h2 className="text-3xl font-semibold mb-6 text-black text-center">Contact Us</h2>
                        <p className="text-gray-600 mb-6 text-center">Have additional questions? Reach out to our support team!</p>

                        <form className="max-w-md mx-auto px-4" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-600">Your Name</label>
                                <input type="text" id="name" name="name" className="mt-1 p-2 w-full border rounded-md text-black outline-none" value={formData.name} onChange={handleChange} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-600">Your Email</label>
                                <input type="email" id="email" name="email" className="mt-1 p-2 w-full border rounded-md text-black outline-none" value={formData.email} onChange={handleChange} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="message" className="block text-sm font-medium text-gray-600">Your Message</label>
                                <textarea id="message" name="message" rows="4" className="mt-1 p-2 w-full border rounded-md text-black outline-none" value={formData.message} onChange={handleChange}></textarea>
                            </div>
                            <button type="submit" className="bg-red-1 text-white py-2 px-4 rounded-md">Send Message</button>
                        </form>
                    </div>
                </section>
            </div>
        </>
    );
}
