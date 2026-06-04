'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SatelliteSlider from '../components/SatelliteSlider';

export default function Home() {
  // 1. Solution Tabs Accordion State
  const [activeSolutionTab, setActiveSolutionTab] = useState(0);
  const solutionTabs = [
    {
      icon: 'fa-feather-alt',
      title: 'Primary biodiversity insights',
      desc: 'Collect raw bioacoustic signatures of birds, mammals, and insects to establish a biological baseline index for environmental compliance reporting.',
      img: '/images/muhafiz_biot_device.png'
    },
    {
      icon: 'fa-desktop',
      title: 'Real-time, on-ground monitoring',
      desc: 'Continuous audio streams analyzed at the edge to alert wardens immediately upon gunshot, chainsaw, or vehicle detection in remote regions.',
      img: '/images/vertical-shot-lonely-tree-with-cut-branches-growing-forest-gloomy-day.jpg'
    },
    {
      icon: 'fa-shield-alt',
      title: 'AI species detection',
      desc: 'Recognize key indicator species in real-time, mapping migration patterns and population changes to measure reforestation project success.',
      img: '/images/Eco Asset -1.png'
    }
  ];

  // 2. Audio Equalizer Stream State
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [barHeights, setBarHeights] = useState(Array(24).fill(4));
  
  useEffect(() => {
    if (!isAudioPlaying) {
      setBarHeights(Array(24).fill(4));
      return;
    }
    
    const interval = setInterval(() => {
      setBarHeights(
        Array.from({ length: 24 }, () => Math.floor(Math.random() * 26) + 4) // 4px to 30px
      );
    }, 120);
    
    return () => clearInterval(interval);
  }, [isAudioPlaying]);

  const toggleAudioVisualizer = () => {
    setIsAudioPlaying(!isAudioPlaying);
  };

  return (
    <>
      {/* Hero Section */}
      <header 
        className="hero-misty" 
        style={{ backgroundImage: "url('/images/hero_misty_forest.png')" }}
      >
        <div className="hero-topo-overlay">
          <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 100 C 150 150, 200 80, 350 180 C 450 250, 480 320, 500 450" stroke="#d1ece0" strokeWidth="1.5" />
            <path d="M100 120 C 180 180, 250 120, 380 220 C 460 280, 490 350, 520 480" stroke="#d1ece0" strokeWidth="1.5" />
            <path d="M150 140 C 220 200, 300 160, 410 260 C 480 320, 510 390, 540 510" stroke="#d1ece0" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-md-12">
              <h1>Where the forest speaks —<br /><span>and AI protects</span></h1>
              <p>Pakistan’s first AI-powered Climate Intelligence Platform. We combine on-ground bioacoustic IoT sensors with satellite telemetry for real-time forest monitoring and auditable ESG compliance.</p>
              <div className="hero-actions">
                <a href="#cockpit" className="custom-button">Live Demo</a>
                <Link href="/contact" className="ghost-button">Contact us</Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Metrics Bar */}
      <section className="metrics-bar">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4">
              <div className="metric-item">
                <div className="metric-number">&gt; 12,500 ha</div>
                <div className="metric-label">area under real-time monitoring and threat prevention</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="metric-item">
                <div className="metric-number">73%</div>
                <div className="metric-label">decline in illegal logging alerts within active pilot zones</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="metric-item">
                <div className="metric-number">&gt; 98.6%</div>
                <div className="metric-label">accuracy in edge AI sound classification (chainsaws, gunshots)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="content-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center section-title">
              <h6>Industries</h6>
              <h2>How we make environmental data actionable across sectors</h2>
              <p>Whether for carbon validation, real estate risk management, or governmental conservation — we deliver biodiversity telemetry that makes projects measurably more sustainable.</p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-lg-4 col-md-6">
              <div className="industries-card">
                <figure>
                  <img src="/images/view-land-plot-real-estate-business-development-min.jpg" alt="Solar & Wind Parks" />
                </figure>
                <div className="content-box">
                  <h4><a href="#" onClick={(e) => e.preventDefault()}>Smart monitoring for solar & wind parks</a></h4>
                  <p>Measuring biodiversity impacts and verifying acoustic health indices around large-scale green energy infrastructure deployments.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="industries-card">
                <figure>
                  <img src="/images/cover-image-270220-1.jpg" alt="ESG & Reforestation" />
                </figure>
                <div className="content-box">
                  <h4><a href="#" onClick={(e) => e.preventDefault()}>Carbon & Reforestation Verification</a></h4>
                  <p>Using autonomous telemetry and canopy tracking to provide auditable verification of tree survival rates for corporate ESG programs.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="industries-card">
                <figure>
                  <img src="/images/Asian-leopard.webp" alt="Wildlife agencies" />
                </figure>
                <div className="content-box">
                  <h4><a href="#" onClick={(e) => e.preventDefault()}>Support for Conservation Agencies</a></h4>
                  <p>Arming forest rangers and wildlife wardens with real-time acoustic threat alerts (chainsaws, vehicles, gunshots) to halt illegal logging.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners strip */}
      <section className="partners-strip">
        <div className="container">
          <div className="row align-items-center justify-content-between text-center">
            <div className="col-md-2 col-6 my-2">
              <div className="partner-logo">
                <img src="/images/pak84.webp" alt="Partner" style={{ maxHeight: '44px', filter: 'grayscale(1) opacity(0.5)' }} />
              </div>
            </div>
            <div className="col-md-2 col-6 my-2">
              <div className="partner-logo">
                <h5 style={{ fontFamily: 'var(--font-serif)', fontWeight: 'bold', opacity: 0.45, margin: 0 }}>FABER</h5>
              </div>
            </div>
            <div className="col-md-2 col-6 my-2">
              <div className="partner-logo">
                <h5 style={{ fontFamily: 'var(--font-serif)', fontWeight: 'bold', opacity: 0.45, margin: 0 }}>ENERPARC</h5>
              </div>
            </div>
            <div className="col-md-2 col-6 my-2">
              <div className="partner-logo">
                <h5 style={{ fontFamily: 'var(--font-serif)', fontWeight: 'bold', opacity: 0.45, margin: 0 }}>DKB</h5>
              </div>
            </div>
            <div className="col-md-2 col-6 my-2">
              <div className="partner-logo">
                <h5 style={{ fontFamily: 'var(--font-serif)', fontWeight: 'bold', opacity: 0.45, margin: 0 }}>METAVOLT</h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="content-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center section-title">
              <h6>Our Solution</h6>
              <h2>Introducing: The most comprehensive forest monitoring</h2>
              <p>The Muhafiz BioT — a low-cost, low-power, solar-powered IoT device designed for national-scale autonomous forest guard deployment.</p>
            </div>
          </div>
          
          <div className="row align-items-center mt-5">
            <div className="col-lg-6">
              <div className="solution-accordion">
                {solutionTabs.map((tab, idx) => (
                  <div 
                    key={idx} 
                    className={`solution-tab ${activeSolutionTab === idx ? 'active' : ''}`}
                    onClick={() => setActiveSolutionTab(idx)}
                  >
                    <div className="solution-tab-header">
                      <div className="solution-tab-icon"><i className={`fas ${tab.icon}`}></i></div>
                      <h4>{tab.title}</h4>
                    </div>
                    <div className="solution-tab-content">
                      <p>{tab.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="solution-image-container mt-4 mt-lg-0">
                <img 
                  id="solutionImage" 
                  src={solutionTabs[activeSolutionTab].img} 
                  alt={solutionTabs[activeSolutionTab].title} 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Stream / Bioacoustic Stream Section */}
      <section className="content-section dark-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="section-title mb-lg-0">
                <h6 style={{ color: 'var(--accent-light)' }}>Our Products</h6>
                <h2 style={{ color: '#ffffff' }}>How do we measure nature?</h2>
                <p style={{ color: 'rgba(255,255,255,0.85)' }}>
                  Eco Muhafiz stands at the forefront of advanced, data-driven monitoring, reporting, and verification (MRV) solutions, instilling confidence in every phase of forest protection.
                </p>
                
                <div className={`audio-visualizer-card ${isAudioPlaying ? 'playing' : ''}`} id="visualizerCard">
                  <button 
                    className="audio-play-btn" 
                    id="playBtn" 
                    onClick={toggleAudioVisualizer}
                  >
                    <i className={`fas ${isAudioPlaying ? 'fa-pause' : 'fa-play'}`} id="playIcon"></i>
                  </button>
                  <div>
                    <h5 style={{ margin: 0, fontSize: '16px', fontWeight: 600, fontFamily: 'var(--font-sans) !important', color: 'var(--text-dark) !important' }}>
                      Live Bioacoustic Stream
                    </h5>
                    <small style={{ color: 'rgba(30,43,37,0.6)', display: 'block', marginTop: '2px' }}>
                      Margalla Hills National Park - Sensor #04
                    </small>
                  </div>
                  <div className="audio-bars">
                    {barHeights.map((height, i) => (
                      <div 
                        key={i} 
                        className="audio-bar" 
                        style={{ height: `${height}px` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="solution-image-container">
                <img src="/images/IOT.png" alt="Acoustic Sensors Deployed" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Earth Observation (Copernicus Compare Slider) */}
      <section className="content-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <div className="section-title">
                <h6>Satellite data + AI analytics</h6>
                <h2>Earth observation</h2>
                <p>Our earth observation layer combines high-resolution satellite imagery with real-time field telemetry to deliver scalable, accurate biodiversity and canopy insights across entire landscapes.</p>
                <p>We empower forestry groups, real estate compliance managers, and governments to monitor, report, and protect ecosystems with unmatched precision.</p>
              </div>
            </div>
            <div className="col-lg-7">
              <SatelliteSlider />
            </div>
          </div>
        </div>
      </section>

      {/* Cockpit Section */}
      <section className="content-section dark-section" id="cockpit">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 order-lg-2">
              <div className="section-title mb-lg-0 pl-lg-4">
                <h6 style={{ color: 'var(--accent-light)' }}>The Muhafiz Platform</h6>
                <h2 style={{ color: '#ffffff' }}>Monitor, manage, and report with your cockpit</h2>
                <p style={{ color: 'rgba(255,255,255,0.85)' }}>
                  The Eco Muhafiz Platform integrates real-time alerts from on-site IoT sensors with satellite telemetry, providing a unified panel for reporting, alert dispatching, and ESG certification audits.
                </p>
                <Link href="/contact" className="custom-button mt-4">Schedule a Demo</Link>
              </div>
            </div>
            <div className="col-lg-6 order-lg-1">
              <div className="dashboard-display-container">
                <img src="/images/dashboard_mockup.png" alt="Eco Muhafiz Cockpit Dashboard UI" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founders testimonials section */}
      <section className="content-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center section-title">
              <h6>Founders&apos; Messages</h6>
              <h2>Voices of Eco Muhafiz</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
              <div className="testimonial-box" style={{ background: '#ffffff', border: '1px solid rgba(15,44,32,0.06)', padding: '40px', borderRadius: '20px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', maxWidth: '100%' }}>
                <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'rgba(30,43,37,0.8)', marginBottom: '25px' }}>
                  &quot;Every 19 minutes, Pakistan loses a hectare of forest. We built Eco Muhafiz because silence is not an option when ecosystems are collapsing in real time. We are building the system that measures, monitors, and protects them.&quot;
                </p>
                <h6 style={{ fontFamily: 'var(--font-sans) !important', fontSize: '16px !important', fontWeight: 700, color: 'var(--text-dark) !important', margin: 0 }}>
                  Anosha Zia<br /><small style={{ fontWeight: 500, color: 'var(--accent-green)' }}>Founder & CEO, Eco Muhafiz</small>
                </h6>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
              <div className="testimonial-box" style={{ background: '#ffffff', border: '1px solid rgba(15,44,32,0.06)', padding: '40px', borderRadius: '20px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', maxWidth: '100%' }}>
                <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'rgba(30,43,37,0.8)', marginBottom: '25px' }}>
                  &quot;By transforming forest sounds into actionable intelligence, we help protect ecosystems, detect threats, and preserve biodiversity. Our vision is simple: a world where technology works in harmony with nature.&quot;
                </p>
                <h6 style={{ fontFamily: 'var(--font-sans) !important', fontSize: '16px !important', fontWeight: 700, color: 'var(--text-dark) !important', margin: 0 }}>
                  Aniqa Gulraiz<br /><small style={{ fontWeight: 500, color: 'var(--accent-green)' }}>Co-founder and CGO</small>
                </h6>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
              <div className="testimonial-box" style={{ background: '#ffffff', border: '1px solid rgba(15,44,32,0.06)', padding: '40px', borderRadius: '20px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', maxWidth: '100%' }}>
                <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'rgba(30,43,37,0.8)', marginBottom: '25px' }}>
                  &quot;As Co-Founder of Eco Muhafiz, I’m committed to empowering communities through environmental awareness, sustainable action, and collective responsibility for a greener future.&quot;
                </p>
                <h6 style={{ fontFamily: 'var(--font-sans) !important', fontSize: '16px !important', fontWeight: 700, color: 'var(--text-dark) !important', margin: 0 }}>
                  Aqsa Sarfraz<br /><small style={{ fontWeight: 500, color: 'var(--accent-green)' }}>Co-Founder, Eco Muhafiz</small>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
