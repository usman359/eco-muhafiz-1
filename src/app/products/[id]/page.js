'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { getProductById } from '@/data/products';
import { useApp } from '@/context/AppContext';

export default function ProductDetailPage({ params }) {
  const resolvedParams = use(params);
  const productId = resolvedParams?.id;
  const product = getProductById(productId);
  const { addToCart, setIsCartOpen } = useApp();

  if (!product) {
    return (
      <div style={{ padding: '120px 20px', textAlign: 'center', backgroundColor: '#fffbf7' }}>
        <h2 style={{ color: '#0f2c20', fontFamily: 'Cinzel, serif' }}>Product Not Found</h2>
        <p style={{ color: '#555', marginTop: '10px' }}>The requested product could not be located.</p>
        <Link href="/products" style={{ display: 'inline-block', marginTop: '20px', padding: '10px 24px', backgroundColor: '#10b981', color: '#fff', borderRadius: '8px', fontWeight: 'bold' }}>
          ← Back to Products
        </Link>
      </div>
    );
  }

  const handleSponsor = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.id === 'eco-guardian' ? 45000 : 15000,
      desc: product.subtitle,
    });
    setIsCartOpen(true);
  };

  return (
    <>
      {/* Page Header */}
      <header 
        className="page-header" 
        style={{ backgroundImage: `url('${product.img}')` }}
      >
        <div className="inner">
          <span style={{ background: 'rgba(16,185,129,0.2)', color: '#94ffc4', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {product.tag}
          </span>
          <h1 style={{ marginTop: '10px' }}>{product.title}</h1>
          <p>{product.subtitle}</p>
        </div>
      </header>

      {/* Main Details Section */}
      <section className="content-section" style={{ backgroundColor: '#fffbf7', padding: '80px 0' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '45px', border: '1px solid rgba(15,44,32,0.08)', boxShadow: '0 15px 40px rgba(15,44,32,0.04)' }}>
                <Link href="/products" style={{ color: '#10b981', fontWeight: 'bold', display: 'inline-block', marginBottom: '20px' }}>
                  ← Back to All Products
                </Link>

                <div className="row align-items-center mb-5">
                  <div className="col-lg-6 mb-4 mb-lg-0">
                    <div style={{ borderRadius: '16px', overflow: 'hidden', height: '350px', border: '1px solid rgba(0,0,0,0.08)' }}>
                      <img src={product.img} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <h2 style={{ fontSize: '36px', color: '#0f2c20', fontFamily: 'Cinzel, serif', fontWeight: '700' }}>{product.title}</h2>
                    <h5 style={{ color: '#10b981', fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>{product.subtitle}</h5>
                    <p style={{ fontStyle: 'italic', fontWeight: '600', color: '#2c4c3e', fontSize: '15px', marginBottom: '18px' }}>
                      "{product.tagline}"
                    </p>
                    <p style={{ color: 'rgba(30,43,37,0.85)', fontSize: '15px', lineHeight: '1.7', marginBottom: '24px' }}>
                      {product.desc}
                    </p>
                    <button 
                      disabled
                      style={{ padding: '12px 28px', backgroundColor: '#e5e7eb', color: '#6b7280', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'not-allowed', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    >
                      <i className="fas fa-clock"></i> Sponsorship Opening Soon
                    </button>
                  </div>
                </div>

                <hr style={{ margin: '40px 0', borderColor: 'rgba(0,0,0,0.08)' }} />

                <div className="row">
                  <div className="col-lg-7 mb-4 mb-lg-0">
                    <h4 style={{ fontSize: '22px', color: '#0f2c20', fontWeight: '700', marginBottom: '20px' }}>
                      Key Features & Technical Capabilities
                    </h4>
                    <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
                      {product.features.map((f, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '15px', color: 'rgba(30,43,37,0.85)', marginBottom: '12px' }}>
                          <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '18px' }}>✓</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="col-lg-5">
                    <h4 style={{ fontSize: '22px', color: '#0f2c20', fontWeight: '700', marginBottom: '20px' }}>
                      Ideal Target Audience
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {product.idealFor.map((item, idx) => (
                        <span key={idx} style={{ background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', padding: '8px 16px', borderRadius: '16px', fontSize: '13px', fontWeight: '600' }}>
                          {item}
                        </span>
                      ))}
                    </div>

                    {product.secondaryImgs && (
                      <div style={{ marginTop: '30px' }}>
                        <h5 style={{ fontSize: '16px', color: '#0f2c20', fontWeight: '700', marginBottom: '12px' }}>On-Ground Technology Telemetry</h5>
                        <div style={{ display: 'flex', gap: '12px' }}>
                          {product.secondaryImgs.map((sImg, sIdx) => (
                            <div key={sIdx} style={{ flex: 1, height: '100px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #ddd' }}>
                              <img src={sImg} alt={`${product.title} preview ${sIdx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
