'use client';

import React from 'react';
import Link from 'next/link';
import { PRODUCTS_DATA } from '@/data/products';
import { useApp } from '../../context/AppContext';

export default function Products() {
  const { addToCart, setIsCartOpen } = useApp();

  const sponsorItems = [
    {
      id: 'device',
      title: 'Muhafiz IoT Acoustic Device',
      price: 149,
      desc: 'Sponsor one solar-powered edge-AI bioacoustic sensor for real-time threat detection.',
      icon: 'fa-microchip',
    },
    {
      id: 'hectare',
      title: 'Forest Hectare Protection',
      price: 15,
      desc: 'Sponsor a full hectare of forest telemetry and satellite canopy auditing for 1 year.',
      icon: 'fa-tree',
    },
    {
      id: 'kit',
      title: 'Ranger Response Kit',
      price: 49,
      desc: 'Sponsor a communications radio and first-aid response gear for a local forest guard.',
      icon: 'fa-shield-alt',
    },
  ];

  const handleBuyNow = (item) => {
    addToCart(item);
    setIsCartOpen(true);
  };

  return (
    <>
      {/* Page Header */}
      <header 
        className="page-header" 
        style={{ backgroundImage: "url('/images/view-land-plot-real-estate-business-development-min.jpg')" }}
      >
        <div className="inner">
          <h1>Our Products</h1>
          <p>Real-time products deployed to safeguard biodiversity and track environmental compliance across Pakistan.</p>
        </div>
      </header>

      {/* AI Forest Rangers / Category 1 Section */}
      <section className="content-section" style={{ backgroundColor: '#fffbf7', paddingBottom: '60px' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="section-title text-center">
                <figure><img src="/images/eco-f.png" alt="Eco Muhafiz logo" /></figure>
                <h6>Category 1</h6>
                <h2>AI Forest Rangers</h2>
                <p style={{ maxWidth: '600px', margin: '0 auto' }}>Edge bioacoustic IoT monitoring networks deployed on-site to intercept ecological degradation.</p>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            {PRODUCTS_DATA.map((product) => (
              <div key={product.id} className="col-lg-6 col-md-6 mb-4">
                <div className="exhibition-box" style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', height: '100%', border: '1px solid rgba(15,44,32,0.08)', boxShadow: '0 8px 25px rgba(15,44,32,0.04)' }}>
                  <Link href={`/products/${product.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                    <figure style={{ height: '300px', overflow: 'hidden', margin: 0, position: 'relative', cursor: 'pointer' }}>
                      <img 
                        src={product.img} 
                        alt={product.title} 
                        className="img" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                      />
                      <div className="info" style={{ position: 'absolute', bottom: '15px', left: '15px' }}>
                        <span>{product.tag}</span>
                      </div>
                    </figure>
                  </Link>

                  <div className="content-box" style={{ padding: '30px' }}>
                    <Link href={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                      <h4 style={{ fontSize: '24px', fontWeight: '700', color: '#0f2c20', marginBottom: '4px', cursor: 'pointer' }}>
                        {product.title} <span style={{ fontSize: '16px', color: '#10b981' }}>↗</span>
                      </h4>
                    </Link>
                    <h6 style={{ color: '#10b981', fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>{product.subtitle}</h6>
                    <p style={{ fontStyle: 'italic', fontWeight: '600', color: '#2c4c3e', fontSize: '13px', marginBottom: '12px' }}>"{product.tagline}"</p>
                    <p style={{ color: 'rgba(30,43,37,0.85)', fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>{product.desc}</p>
                    
                    {/* Key Features */}
                    <div style={{ marginBottom: '16px' }}>
                      <strong style={{ fontSize: '13px', color: '#0f2c20', display: 'block', marginBottom: '6px' }}>Key Features:</strong>
                      <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
                        {product.features.map((f, fIdx) => (
                          <li key={fIdx} style={{ fontSize: '12px', color: 'rgba(30,43,37,0.85)', marginBottom: '5px', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                            <span style={{ color: '#10b981', fontWeight: 'bold' }}>•</span> <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Ideal For */}
                    <div style={{ marginBottom: '20px' }}>
                      <strong style={{ fontSize: '13px', color: '#0f2c20', display: 'block', marginBottom: '6px' }}>Ideal For:</strong>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                        {product.idealFor.map((item, iIdx) => (
                          <span key={iIdx} style={{ background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', padding: '3px 9px', borderRadius: '10px', fontSize: '11px', fontWeight: '500' }}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link 
                      href={`/products/${product.id}`} 
                      style={{ 
                        display: 'inline-block', 
                        width: '100%', 
                        textAlign: 'center', 
                        padding: '10px', 
                        backgroundColor: '#10b981', 
                        color: '#ffffff', 
                        borderRadius: '8px', 
                        fontWeight: '700', 
                        fontSize: '14px',
                        textDecoration: 'none',
                        transition: 'background 0.2s ease'
                      }}
                    >
                      View Product Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Save Forest / Sponsorship Section - Dark high-contrast visible text */}
      <section className="content-section" style={{ backgroundColor: '#fffbf7', padding: '80px 0', borderTop: '1px solid rgba(15,44,32,0.08)' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center" style={{ marginBottom: '50px' }}>
              <span style={{ color: '#10b981', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold', fontSize: '13px', display: 'block' }}>
                Sponsor Our Mission
              </span>
              <h2 style={{ color: '#0f2c20', fontSize: '36px', marginTop: '10px', fontFamily: 'Cinzel, serif', fontWeight: '700' }}>
                Save Pakistan’s Forests
              </h2>
              <p style={{ color: '#2c4c3e', maxWidth: '600px', margin: '15px auto 0 auto', fontSize: '15px', lineHeight: '1.6', fontWeight: '500' }}>
                Your contributions directly fund the assembly, shipping, and installation of hardware in critical reserves like the Margalla Hills.
              </p>
            </div>
          </div>

          <div className="row justify-content-center">
            {sponsorItems.map((item) => (
              <div key={item.id} className="col-lg-4 col-md-6 mb-4">
                <div style={{
                  background: '#ffffff',
                  border: '1px solid rgba(15, 44, 32, 0.12)',
                  borderRadius: '24px',
                  padding: '40px 30px',
                  textAlign: 'center',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 10px 30px rgba(15,44,32,0.06)',
                  transition: '0.3s ease',
                  cursor: 'default'
                }}
                className="sponsor-card"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = '#10b981';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(16,185,129,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(15, 44, 32, 0.12)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(15,44,32,0.06)';
                }}
                >
                  <div>
                    <div style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '50%',
                      background: 'rgba(16, 185, 129, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 25px auto',
                      color: '#10b981',
                      fontSize: '28px'
                    }}>
                      <i className={`fas ${item.icon}`}></i>
                    </div>
                    <h4 style={{ color: '#0f2c20', fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>{item.title}</h4>
                    <p style={{ color: '#2c4c3e', fontSize: '14px', lineHeight: '1.6', marginBottom: '25px', fontWeight: '400' }}>{item.desc}</p>
                  </div>
                  <div>
                    <div style={{ fontSize: '32px', fontWeight: '800', color: '#10b981', marginBottom: '25px' }}>
                      ${item.price} <span style={{ fontSize: '14px', fontWeight: 'normal', color: '#555555' }}>/ unit</span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        onClick={() => addToCart(item)}
                        style={{
                          flex: 1,
                          padding: '12px 6px',
                          background: 'transparent',
                          color: '#0f2c20',
                          border: '2px solid #10b981',
                          borderRadius: '8px',
                          fontWeight: '700',
                          fontSize: '13px',
                          cursor: 'pointer',
                          transition: '0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(16,185,129,0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleBuyNow(item)}
                        style={{
                          flex: 1,
                          padding: '12px 6px',
                          background: '#10b981',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '8px',
                          fontWeight: '700',
                          fontSize: '13px',
                          cursor: 'pointer',
                          transition: '0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#059669';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#10b981';
                        }}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
