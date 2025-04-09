"use client"
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const HomeContactForm = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    contact_no: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const token = 'irrv211vui9kuwn11efsb4xd4zdkuq'
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contactus`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'API-Key': token,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setResponseMessage('Thank you! Your message has been sent.');
        toast('Thank you! Your message has been sent.');
        setFormData({
          full_name: '',
          email: '',
          contact_no: '',
          subject: '',
          message: ''
        });
      } else {
        setResponseMessage('Error sending message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Error sending message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#BD98E1] py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <h2 className="text-4xl font-bold text-white mb-6">Get in touch</h2>
        <p className="text-white mb-6">Make your journey of packaging easy with us.</p>

        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-2/3 px-4">
            <form className="space-y-4 max-w-2xl" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white" htmlFor="full_name">Full name</label>
                  <input
                    className="w-full px-3 py-2 border border-white rounded-md bg-transparent text-white placeholder-gray-200"
                    id="full_name"
                    type="text"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-white" htmlFor="email">Email</label>
                  <input
                    className="w-full px-3 py-2 border border-white rounded-md bg-transparent text-white placeholder-gray-200"
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white" htmlFor="contact_no">Phone number</label>
                  <input
                    className="w-full px-3 py-2 border border-white rounded-md bg-transparent text-white placeholder-gray-200"
                    id="contact_no"
                    type="text"
                    value={formData.contact_no}
                    onChange={handleChange}
                    maxlength={10}
                    required
                  />
                </div>
                <div>
                  <label className="block text-white" htmlFor="subject">Subject</label>
                  <input
                    className="w-full px-3 py-2 border border-white rounded-md bg-transparent text-white placeholder-gray-200"
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-white" htmlFor="message">Message</label>
                <textarea
                  className="w-full px-3 py-2 border border-white rounded-md bg-transparent text-white placeholder-gray-200"
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div>
                <button
                  className="px-6 py-2 bg-[#30384E] rounded-md text-white border-[3px] border-white-2"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
            {responseMessage && <p className="mt-4 text-white">{responseMessage}</p>}
          </div>
          <div className="w-full lg:w-1/3 px-4 mt-8 lg:mt-0">
            <h3 className="text-xl font-bold text-white mb-4">Meet With Us</h3>
            <address className="text-white not-italic">
              {`Art NEXT Pvt Ltd,\n
              A/463, Ground Floor, TTC Industrial Area,\n
              Mahape, MIDC, Navi Mumbai, Thane - 400710, MH, India\n
              Call Us\n
              +91 9821045101`}
            </address>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContactForm;
