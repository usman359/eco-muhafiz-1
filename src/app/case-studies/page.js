'use client';

import React from 'react';

export default function CaseStudies() {
  const caseStudies = [
    {
      title: 'Margalla Hills Reserve AI Safeguard',
      date: 'Active Deployment (2025 - Present)',
      img: '/images/Eco Asset -1.png',
      location: 'Islamabad, Pakistan',
      metrics: [
        { label: 'Deforestation Alerts Reduced', value: '73%' },
        { label: 'Audio Detection Accuracy', value: '98.6%' },
        { label: 'Monitored Hectares', value: '12,500 ha' },
      ],
      desc: 'Collaborating with wildlife management, Eco Muhafiz deployed an array of 45 solar-powered acoustic monitoring devices in high-risk zones. The edge AI processor captures chainsaws, vehicles, and gunshot frequencies, dispatching instant SMS/Internet telemetry coordinates directly to ranger response teams. Response times plummeted from 3+ hours to under 12 minutes, effectively halting commercial wood cutting inside the reserve.',
    },
    {
      title: 'Karakoram Plantation Canopy Verification',
      date: 'Completed Project (2025)',
      img: '/images/view-land-plot-real-estate-business-development-min.jpg',
      location: 'Gilgit-Baltistan, Pakistan',
      metrics: [
        { label: 'Planted Saplings Tracked', value: '12,000+' },
        { label: 'Survival Rate Audited', value: '88%' },
        { label: 'Satellite Revisit Rate', value: '5 Days' },
      ],
      desc: 'Partnering with Catalyst Foundation, Eco Muhafiz provided third-party audit validation for a community plantation drive. Using Sentinel-2 satellite canopy data alongside on-ground verification telemetry, we established a carbon sequestration baseline and audited tree growth indices, resolving issues regarding plantation survival tracking and providing compliance logs for ESG audit files.',
    },
    {
      title: 'Indus Delta Mangroves acoustic mesh',
      date: 'Upcoming Pilot (Launching Q3 2026)',
      img: '/images/IOT.png',
      location: 'Sindh Coastal Reserve, Pakistan',
      metrics: [
        { label: 'Planned Devices', value: '25 Units' },
        { label: 'Species Focus', value: 'Aquatic/Avian' },
        { label: 'Partner Organisation', value: 'WWF Pakistan' },
      ],
      desc: 'Focusing on the delta wetlands, this pilot aims to intercept marine poachers and illegal timber clearing in mangrove channels. The devices will feature custom waterproof chassis and edge algorithms optimized for motorboat propeller frequencies, ensuring coastal guards receive instant notices of remote intrusions.',
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
          <h1>Case Studies</h1>
          <p>Read detailed records of how our on-ground devices and satellite trackers deliver proof of conservation.</p>
        </div>
      </header>

      {/* Case Studies Grid */}
      <section className="content-section" style={{ backgroundColor: '#fffbf7' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center" style={{ marginBottom: '50px' }}>
              <span style={{ color: 'var(--accent-green, #10b981)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold' }}>Our Impact Records</span>
              <h2 style={{ fontSize: '36px', marginTop: '10px', fontFamily: 'Cinzel, serif', color: '#0f2c20' }}>Proof in the Wilderness</h2>
            </div>
          </div>

          <div className="row">
            {caseStudies.map((cs, idx) => (
              <div key={idx} className="col-12 mb-5">
                <div style={{
                  background: '#ffffff',
                  border: '1px solid rgba(0,0,0,0.06)',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(15,44,32,0.03)'
                }}>
                  <div className="row g-0 align-items-stretch">
                    <div className="col-lg-5">
                      <div style={{ position: 'relative', height: '100%', minHeight: '300px' }}>
                        <img 
                          src={cs.img} 
                          alt={cs.title} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      </div>
                    </div>
                    <div className="col-lg-7" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '45px' }}>
                      <span style={{ fontSize: '13px', color: 'var(--accent-green, #10b981)', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                        {cs.location} | {cs.date}
                      </span>
                      <h3 style={{ color: 'var(--text-dark, #0f2c20)', fontSize: '26px', fontWeight: '700', marginBottom: '15px' }}>
                        {cs.title}
                      </h3>
                      <p style={{ color: 'rgba(30,43,37,0.8)', fontSize: '15px', lineHeight: '1.7', marginBottom: '30px' }}>
                        {cs.desc}
                      </p>
                      
                      <div className="row" style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '20px' }}>
                        {cs.metrics.map((m, mIdx) => (
                          <div key={mIdx} className="col-4">
                            <span style={{ display: 'block', fontSize: '24px', fontWeight: '800', color: 'var(--accent-green, #10b981)' }}>
                              {m.value}
                            </span>
                            <small style={{ display: 'block', fontSize: '11px', color: '#777', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '2px' }}>
                              {m.label}
                            </small>
                          </div>
                        ))}
                      </div>
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
