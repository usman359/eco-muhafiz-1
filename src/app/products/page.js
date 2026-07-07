'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';

export default function Products() {
  const { addToCart, setIsCartOpen } = useApp();

  const rangerProducts = [
    {
      title: 'Margalla Audio Net',
      img: '/images/Eco Asset -1.png',
      tag: 'Active Deployment',
      desc: 'An array of solar-powered listening posts detecting chainsaws, gunshots, and fire indicators using edge AI and warning authorities.',
    },
    {
      title: 'Wildfire Sentinels',
      img: '/images/IOT.png',
      tag: 'Sensor Mesh',
      desc: 'Deployed multi-gas and thermal IoT micro-sensors inside high-risk forest zones to spot early combustion signatures and trace origin points.',
    },
  ];

  const atlasProducts = [
    {
      title: 'Satellite Compliance',
      img: '/images/view-land-plot-real-estate-business-development-min.jpg',
      tag: 'Remote Sensing',
      desc: 'Tracking land plots, canopy indices, and verified reforestation progress for real estate developers and regulatory compliance audits.',
    },
    {
      title: 'Eco Atlas Cockpit',
      img: '/images/platform/dashboard.png',
      tag: 'Platform',
      desc: 'The unified panel integrating real-time alerts from on-site IoT sensors with satellite telemetry, providing reporting and ESG certification audits.',
    },
  ];

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

      {/* AI Forest Rangers Section */}
      <section className="content-section" style={{ backgroundColor: '#fffbf7', paddingBottom: '30px' }}>
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
            {rangerProducts.map((product, idx) => (
              <div key={idx} className="col-lg-6 col-md-6 mb-4">
                <div className="exhibition-box" style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', height: '100%' }}>
                  <figure style={{ height: '300px', overflow: 'hidden' }}>
                    <img 
                      src={product.img} 
                      alt={product.title} 
                      className="img" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div className="info">
                      <span>{product.tag}</span>
                    </div>
                  </figure>
                  <div className="content-box" style={{ padding: '30px' }}>
                    <h4>{product.title}</h4>
                    <p>{product.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eco Atlas Section */}
      <section className="content-section" style={{ backgroundColor: '#ffffff', paddingBottom: '30px' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="section-title text-center">
                <figure><img src="/images/eco-f.png" alt="Eco Muhafiz logo" /></figure>
                <h6>Category 2</h6>
                <h2>Eco Atlas</h2>
                <p style={{ maxWidth: '600px', margin: '0 auto' }}>Satellite analytics, canopy verification indices, and GIS dashboards to validate carbon projects.</p>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            {atlasProducts.map((product, idx) => (
              <div key={idx} className="col-lg-6 col-md-6 mb-4">
                <div className="exhibition-box" style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', height: '100%' }}>
                  <figure style={{ height: '300px', overflow: 'hidden' }}>
                    <img 
                      src={product.img} 
                      alt={product.title} 
                      className="img" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div className="info">
                      <span>{product.tag}</span>
                    </div>
                  </figure>
                  <div className="content-box" style={{ padding: '30px' }}>
                    <h4>{product.title}</h4>
                    <p>{product.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Save Forest / Sponsorship Section */}
      <section className="content-section" style={{ backgroundColor: '#16382c', color: '#fff', padding: '80px 0' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center" style={{ marginBottom: '50px' }}>
              <span style={{ color: 'var(--accent-light, #94ffc4)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold' }}>Sponsor Our Mission</span>
              <h2 style={{ color: '#fff', fontSize: '36px', marginTop: '10px', fontFamily: 'Cinzel, serif' }}>Save Pakistan’s Forests</h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '15px auto 0 auto' }}>
                Your contributions directly fund the assembly, shipping, and installation of hardware in critical reserves like the Margalla Hills.
              </p>
            </div>
          </div>

          <div className="row justify-content-center">
            {sponsorItems.map((item) => (
              <div key={item.id} className="col-lg-4 col-md-6 mb-4">
                <div style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '24px',
                  padding: '40px',
                  textAlign: 'center',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: '0.3s ease',
                  cursor: 'default'
                }}
                className="sponsor-card"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.borderColor = '#f39c12';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
                >
                  <div>
                    <div style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '50%',
                      background: 'rgba(16, 185, 129, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 25px auto',
                      color: 'var(--accent-light, #94ffc4)',
                      fontSize: '28px'
                    }}>
                      <i className={`fas ${item.icon}`}></i>
                    </div>
                    <h4 style={{ color: '#fff', fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>{item.title}</h4>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', lineHeight: '1.6', marginBottom: '25px' }}>{item.desc}</p>
                  </div>
                  <div>
                    <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--accent-light, #94ffc4)', marginBottom: '25px' }}>
                      ${item.price} <span style={{ fontSize: '14px', fontWeight: 'normal', color: 'rgba(255,255,255,0.5)' }}>/ unit</span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        onClick={() => addToCart(item)}
                        style={{
                          flex: 1,
                          padding: '12px',
                          background: 'transparent',
                          color: '#fff',
                          border: '1.5px solid rgba(255,255,255,0.3)',
                          borderRadius: '8px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: '0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                          e.currentTarget.style.borderColor = '#fff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                        }}
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleBuyNow(item)}
                        style={{
                          flex: 1,
                          padding: '12px',
                          background: '#94ffc4',
                          color: '#080808',
                          border: 'none',
                          borderRadius: '8px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          transition: '0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#94ffc4';
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
