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
    <section className="py-24 bg-gray-50">
      <div className="container max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <h2 className="mb-6 text-4xl font-bold text-[#103b60]">Get in touch</h2>
        <p className="mb-6 text-[[#103b60]">Make your journey of packaging easy with us.</p>

        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4 lg:w-2/3">
            <form className="max-w-2xl space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[#103b60]" htmlFor="full_name">Full name</label>
                  <input
                    className="w-full px-3 py-2 text-[#103b60] placeholder-black bg-transparent border border-black rounded-md"
                    id="full_name"
                    type="text"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#103b60]" htmlFor="email">Email</label>
                  <input
                    className="w-full px-3 py-2 text-[#103b60] placeholder-black bg-transparent border border-black rounded-md"
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[#103b60]" htmlFor="contact_no">Phone number</label>
                  <input
                    className="w-full px-3 py-2 text-[#103b60] placeholder-black bg-transparent border border-black rounded-md"
                    id="contact_no"
                    type="text"
                    value={formData.contact_no}
                    onChange={handleChange}
                    maxlength={10}
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#103b60]" htmlFor="subject">Subject</label>
                  <input
                    className="w-full px-3 py-2 text-[#103b60] placeholder-black bg-transparent border border-black rounded-md"
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#103b60]" htmlFor="message">Message</label>
                <textarea
                  className="w-full px-3 py-2 text-[#103b60] placeholder-black bg-transparent border border-black rounded-md"
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div>
                <button
                  className="px-6 py-2 bg-[#103b60] rounded-md text-white border-[3px] border-black-2"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
            {responseMessage && <p className="mt-4 text-white">{responseMessage}</p>}
          </div>
          <div className="w-full px-4 mt-8 lg:w-1/3 lg:mt-0">
            <h3 className="mb-4 text-xl font-bold text-[#103b60]">Meet With Us</h3>
            <address className="not-italic text-[#103b60]">
              {`Art NEXT Pvt Ltd | Nexibles®,\n
      Unit A6C, Lodha Industrial & Logistics Park - II, Usatane\n
      Village, Navi Mumbai, Taloja Bypass Road, Palava,\n
      Maharashtra - 421306 `}
            </address>
            <p className='not-italic text-[#103b60] mt-4'> +91 9821045101</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContactForm;
