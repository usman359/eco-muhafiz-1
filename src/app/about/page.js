'use client';

import React from 'react';
import Link from 'next/link';
import AnimatedCounter from '../../components/AnimatedCounter';

export default function About() {
  const pillars = [
    {
      title: 'Acoustic Intelligence',
      img: '/images/eco_guardian_device.jpeg',
      icon: 'fa-broadcast-tower',
      desc: 'Deploying edge-AI bioacoustic devices that continuously monitor nature soundscapes, detecting chainsaws, gunshots, and wildfires in milliseconds.',
    },
    {
      title: 'Satellite Verification',
      img: '/images/eco_atlas_forest_monitoring.png',
      icon: 'fa-satellite',
      desc: 'Merging on-ground acoustic alerts with satellite telemetry for audit-grade carbon and canopy loss reporting across national parks.',
    },
    {
      title: 'Ranger Response Network',
      img: '/images/eco_guardian_app_map.png',
      icon: 'fa-shield-alt',
      desc: 'Empowering local wildlife rangers with immediate mobile geolocated alerts and incident verification tools to stop illegal deforestation.',
    },
  ];

  return (
    <>
      {/* Page Header */}
      <header
        className="page-header"
        style={{ backgroundImage: "url('/images/view-land-plot-real-estate-business-development-min.jpg')" }}
      >
        <div className="inner">
          <span style={{
            fontSize: '13px',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            color: '#10b981',
            fontWeight: '700',
            display: 'block',
            marginBottom: '10px'
          }}>
            Climate Intelligence Platform
          </span>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '48px', fontWeight: '700' }}>
            About Eco Muhafiz
          </h1>
          <p style={{ maxWidth: '680px', margin: '15px auto 0 auto', fontSize: '18px', opacity: 0.9 }}>
            Pakistan’s pioneer AI-powered acoustic IoT &amp; satellite monitoring system built to protect bio-reserves, halt deforestation, and audit conservation efforts.
          </p>
        </div>
      </header>

      {/* Mission & Purpose Section */}
      <section className="content-section" style={{ backgroundColor: '#fffbf7', padding: '90px 0' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="section-title" style={{ marginBottom: '30px' }}>
                <span style={{ color: '#10b981', textTransform: 'uppercase', letterSpacing: '2.5px', fontWeight: 'bold', fontSize: '13px', display: 'block', marginBottom: '8px' }}>
                  Guardians of Pakistan&apos;s Forests
                </span>
                <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '38px', color: '#0f2c20', fontWeight: '700', lineHeight: 1.2 }}>
                  Transforming Wilderness Sounds into Actionable Intelligence
                </h2>
              </div>
              <p style={{ color: 'rgba(30,43,37,0.85)', fontSize: '16px', lineHeight: 1.7, marginBottom: '20px' }}>
                Eco Muhafiz was created out of an urgent necessity: Pakistan loses thousands of hectares of forest every year without an immediate alert system, audit record, or accountability mechanism.
              </p>
              <p style={{ color: 'rgba(30,43,37,0.85)', fontSize: '16px', lineHeight: 1.7, marginBottom: '30px' }}>
                By pairing low-cost, solar-powered edge bioacoustic devices with satellite verification, we provide wildlife management, forestry departments, and ESG corporate partners with audit-grade telemetry.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
                    <i className="fas fa-check"></i>
                  </div>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#0f2c20' }}>
                    90% Edge AI Classification Accuracy for Chainsaws &amp; Gunshots
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
                    <i className="fas fa-check"></i>
                  </div>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#0f2c20' }}>
                    Real-time geolocated warden push notifications &amp; live map feeds
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
                    <i className="fas fa-check"></i>
                  </div>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#0f2c20' }}>
                    Affordable 100% solar autonomous hardware deployed in Margalla Hills
                  </span>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(15,44,32,0.12)',
                border: '1px solid rgba(15,44,32,0.08)'
              }}>
                <img
                  src="/images/Eco Asset -1.png"
                  alt="Eco Muhafiz device in Margalla Hills"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  right: '20px',
                  background: 'rgba(15,44,32,0.85)',
                  backdropFilter: 'blur(8px)',
                  padding: '20px',
                  borderRadius: '16px',
                  color: '#ffffff'
                }}>
                  <h5 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#94ffc4' }}>
                    Margalla Hills Deployment
                  </h5>
                  <p style={{ margin: '4px 0 0 0', fontSize: '13px', opacity: 0.9 }}>
                    Sensor Unit #04 actively relaying live bioacoustics &amp; threat telemetry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Pillars Section */}
      <section className="content-section" style={{ padding: '90px 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-8">
              <span style={{ color: '#10b981', textTransform: 'uppercase', letterSpacing: '2.5px', fontWeight: 'bold', fontSize: '13px', display: 'block', marginBottom: '8px' }}>
                Integrated Platform Architecture
              </span>
              <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '36px', color: '#0f2c20', fontWeight: '700' }}>
                How Eco Muhafiz Safeguards Nature
              </h2>
            </div>
          </div>

          <div className="row">
            {pillars.map((item, idx) => (
              <div key={idx} className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                <div style={{
                  background: '#fffbf7',
                  border: '1px solid rgba(15,44,32,0.08)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 10px 25px rgba(15,44,32,0.04)'
                }}>
                  <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={item.img}
                      alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '15px',
                      right: '15px',
                      width: '45px',
                      height: '45px',
                      borderRadius: '50%',
                      background: '#10b981',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px',
                      boxShadow: '0 4px 12px rgba(16,185,129,0.3)'
                    }}>
                      <i className={`fas ${item.icon}`}></i>
                    </div>
                  </div>
                  <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0f2c20', marginBottom: '12px' }}>
                      {item.title}
                    </h3>
                    <p style={{ color: 'rgba(30,43,37,0.8)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Counters Section */}
      <section className="content-section dark-section" style={{ background: '#0f2c20 !important', backgroundColor: '#0f2c20 !important', color: '#ffffff', padding: '80px 0' }}>
        <div className="container">
          <div className="row text-center">
            <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
              <div style={{ padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '42px', fontWeight: '800', color: '#10b981', fontFamily: 'var(--font-sans)', marginBottom: '8px' }}>
                  <AnimatedCounter end="90" />%
                </div>
                <p style={{ fontSize: '13px', color: '#ffffff', fontWeight: '700', margin: 0, textTransform: 'uppercase', letterSpacing: '1.5px', opacity: 0.95 }}>
                  Edge AI Classification
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
              <div style={{ padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '42px', fontWeight: '800', color: '#10b981', fontFamily: 'var(--font-sans)', marginBottom: '8px' }}>
                  <AnimatedCounter end="11000" />
                </div>
                <p style={{ fontSize: '13px', color: '#ffffff', fontWeight: '700', margin: 0, textTransform: 'uppercase', letterSpacing: '1.5px', opacity: 0.95 }}>
                  ha Lost Annually in Pak
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
              <div style={{ padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '42px', fontWeight: '800', color: '#10b981', fontFamily: 'var(--font-sans)', marginBottom: '8px' }}>
                  <AnimatedCounter end="20" /> ha/unit
                </div>
                <p style={{ fontSize: '13px', color: '#ffffff', fontWeight: '700', margin: 0, textTransform: 'uppercase', letterSpacing: '1.5px', opacity: 0.95 }}>
                  Coverage Per Device
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div style={{ padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '42px', fontWeight: '800', color: '#10b981', fontFamily: 'var(--font-sans)', marginBottom: '8px' }}>
                  <AnimatedCounter end="12" />k+
                </div>
                <p style={{ fontSize: '13px', color: '#ffffff', fontWeight: '700', margin: 0, textTransform: 'uppercase', letterSpacing: '1.5px', opacity: 0.95 }}>
                  Protected Hectares
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="content-section" style={{ backgroundColor: '#fffbf7', padding: '80px 0' }}>
        <div className="container text-center">
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '36px', color: '#0f2c20', fontWeight: '700', marginBottom: '15px' }}>
            Ready to Protect Pakistan&apos;s Natural Ecosystems?
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 30px auto', fontSize: '16px', color: 'rgba(30,43,37,0.8)' }}>
            Join our mission by deploying devices, sponsoring protected hectares, or partnering on corporate ESG initiatives.
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/products" className="custom-button" style={{ textDecoration: 'none' }}>
              Sponsor Our Mission
            </Link>
            <Link href="/contact" className="ghost-button dark" style={{ textDecoration: 'none' }}>
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
