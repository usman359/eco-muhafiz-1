'use client';

import React, { useState } from 'react';

export default function Contact() {
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok) {
        setStatus({
          type: 'success',
          message: result.message || 'Thank you! Your message has been sent.',
        });
        e.target.reset();
      } else {
        setStatus({
          type: 'danger',
          message: result.error || 'Sorry, there was an error sending your message. Please try again later.',
        });
      }
    } catch (error) {
      setStatus({
        type: 'danger',
        message: 'Sorry, there was an error sending your message. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Page Header */}
      <header 
        className="page-header" 
        style={{ backgroundImage: "url('/images/page-header.jpg')" }}
      >
        <div className="inner">
          <h1>Contact Us</h1>
          <p>Get in touch with our team to inquire about deployments, partnerships, or environmental consulting.</p>
        </div>
      </header>

      {/* Contact Details & Form Section */}
      <section className="content-section" style={{ backgroundColor: '#fffbf7' }}>
        <div className="container">
          <div className="row">
            {/* Contact details */}
            <div className="col-lg-5">
              <div className="contact-box">
                <h6>Address</h6>
                <p>NSTP, NUST Campus,<br />H-12 Sector, Islamabad, Pakistan</p>
              </div>

              <div className="contact-box">
                <h6>Phone Number</h6>
                <p><a href="tel:+923000000000">+92 (300) 000 0000</a></p>
              </div>

              <div className="contact-box">
                <h6>Email Address</h6>
                <p><a href="mailto:info@ecomuhafiz.com">info@ecomuhafiz.com</a></p>
              </div>
            </div>

            {/* Contact form */}
            <div className="col-lg-7">
              {status.message && (
                <div 
                  className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-danger'}`}
                  style={{
                    display: 'block',
                    padding: '15px',
                    marginBottom: '25px',
                    borderRadius: '4px',
                    fontWeight: '500',
                    width: '100%',
                    background: status.type === 'success' ? '#e8fcf0' : '#fdf2f2',
                    border: status.type === 'success' ? '1px solid #94ffc4' : '1px solid #f8b4b4',
                    color: status.type === 'success' ? '#0b6623' : '#9b1c1c',
                  }}
                >
                  {status.message}
                </div>
              )}

              <form id="contactForm" className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                    style={{
                      width: '100%',
                      background: '#fff',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      color: '#080808',
                      outline: 'none',
                      transition: '0.25s ease-in-out',
                      fontSize: '15px',
                      height: '70px',
                      padding: '0 30px',
                    }}
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    style={{
                      width: '100%',
                      background: '#fff',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      color: '#080808',
                      outline: 'none',
                      transition: '0.25s ease-in-out',
                      fontSize: '15px',
                      height: '70px',
                      padding: '0 30px',
                    }}
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    required
                    style={{
                      width: '100%',
                      background: '#fff',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      color: '#080808',
                      outline: 'none',
                      transition: '0.25s ease-in-out',
                      fontSize: '15px',
                      height: '70px',
                      padding: '0 30px',
                    }}
                  />
                </div>
                <div className="form-group mb-3">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    required
                    style={{
                      width: '100%',
                      background: '#fff',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      color: '#080808',
                      outline: 'none',
                      transition: '0.25s ease-in-out',
                      fontSize: '15px',
                      height: '140px',
                      padding: '30px',
                    }}
                  ></textarea>
                </div>
                <div className="form-group mb-3">
                  <input 
                    type="submit" 
                    value={isSubmitting ? 'Sending...' : 'SEND MESSAGE'} 
                    disabled={isSubmitting}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
