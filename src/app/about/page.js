'use client';

import React from 'react';
import AnimatedCounter from '../../components/AnimatedCounter';

export default function About() {
  return (
    <>
      {/* Page Header */}
      <header 
        className="page-header" 
        style={{ backgroundImage: "url('/images/placeholder.jpg')" }}
      >
        <div className="inner">
          <h1>About Us</h1>
          <p>Saving Pakistan’s forests through AI-driven acoustics, IoT monitoring, and environmental compliance.</p>
        </div>
      </header>

      {/* Mission & Purpose Section */}
      <section className="content-section" style={{ backgroundColor: '#fffbf7' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="section-title">
                <figure><img src="/images/eco-f.png" alt="Eco Muhafiz logo" /></figure>
                <h6>Guardian of Margalla Hills</h6>
                <h2>Our Mission & Purpose</h2>
              </div>
              <p>
                Eco Muhafiz is Pakistan’s pioneer AI-powered Climate Intelligence Platform. Our goal is to counter rapid environmental degradation and lack of transparency in conservation efforts. Through cutting-edge audio detection device nets and remote sensing, we provide immediate alerts and auditable validation.
              </p>
              <p>
                By combining technology with a community-first approach, we empower local wildlife management, forestry rangers, and corporate ESG programs. Our solutions translate ambient wilderness signals into actionable analytics, ensuring compliance and halting illicit deforestation.
              </p>
            </div>
            <div className="col-lg-6">
              <figure className="image-box" data-scroll data-scroll-speed="0.5">
                <img src="/images/Eco Asset -1.png" alt="Eco Muhafiz device in Margalla Hills" />
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Details Columns Section */}
      <section className="content-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="image-content-box">
                <figure>
                  <img src="/images/about-image01.jpg" alt="Acoustic Intelligence" />
                </figure>
                <div className="content-box">
                  <h3>Acoustic Nets</h3>
                  <p>Equipping forests with solar-powered microphones that detect illegal timber cutting, gunshot patterns, and wildfire crackles instantly.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="image-content-box">
                <figure>
                  <img src="/images/about-image02.jpg" alt="Remote Sensing" />
                </figure>
                <div className="content-box">
                  <h3>Satellite Verification</h3>
                  <p>Applying state-of-the-art satellite data classification to measure forest canopy changes and track real plantation survival rates.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="image-content-box">
                <figure>
                  <img src="/images/about-image03.jpg" alt="Ranger Ecosystem" />
                </figure>
                <div className="content-box">
                  <h3>Ranger Response</h3>
                  <p>Deploying targeted alerts directly via mobile apps to ranger networks, allowing quick intervention with low response times.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Counters Section */}
      <section className="content-section" style={{ backgroundColor: '#fffbf7' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="counter-box">
                <AnimatedCounter end="98" />
                <span className="value">%</span>
                <p>Detection Accuracy</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="counter-box">
                <AnimatedCounter end="1250" />
                <span className="value"></span>
                <p>Hectares Monitored</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="counter-box">
                <AnimatedCounter end="45" />
                <span className="value"></span>
                <p>Muhafiz Devices</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="counter-box">
                <AnimatedCounter end="12" />
                <span className="value">k+</span>
                <p>Trees Planted</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
