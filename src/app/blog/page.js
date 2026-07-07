'use client';

import React, { useState } from 'react';

export default function Blog() {
  const [activeFilter, setActiveFilter] = useState('All');

  const blogPosts = [
    {
      title: 'How Edge AI is Stopping Illegal Logging in Margalla Hills',
      date: 'June 28, 2026',
      category: 'AI & IoT',
      img: '/images/Eco Asset -1.png',
      readTime: '5 min read',
      author: 'Anosha Zia',
      desc: 'Discover how edge-computed bioacoustic devices detect the acoustic frequency of chainsaws in real-time, sending immediate alerts to wildlife managers and forest guards.',
    },
    {
      title: 'Copernicus & Sentinel-2: A New Era of Canopy Monitoring',
      date: 'May 14, 2026',
      category: 'Satellite Telemetry',
      img: '/images/view-land-plot-real-estate-business-development-min.jpg',
      readTime: '7 min read',
      author: 'Aniqa Gulraiz',
      desc: 'An exploration of how high-resolution remote sensing imagery lets developers, project managers, and regulatory compliance agencies audit reforestation growth indices.',
    },
    {
      title: 'The Silent Sentinel: Protecting Wildlife from Poachers',
      date: 'April 02, 2026',
      category: 'Conservation',
      img: '/images/IOT.png',
      readTime: '6 min read',
      author: 'Aqsa Sarfraz',
      desc: 'Spotlighting poacher tracking inside national parks. Our bioacoustic nets intercept vehicle engine patterns and gunshot frequencies, dispatching telemetry coordinates.',
    },
    {
      title: 'Empowering Local Communities: The Role of Muhafiz Rangers',
      date: 'March 18, 2026',
      category: 'Community',
      img: '/images/ranger_response.png',
      readTime: '4 min read',
      author: 'Team Eco Muhafiz',
      desc: 'How on-ground wildlife warden mobile interfaces connect local volunteers with AI detection nets, creating a community-led biosphere monitoring structure.',
    },
  ];

  const categories = ['All', 'AI & IoT', 'Satellite Telemetry', 'Conservation', 'Community'];

  const filteredPosts = activeFilter === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeFilter);

  return (
    <>
      {/* Page Header */}
      <header 
        className="page-header" 
        style={{ backgroundImage: "url('/images/view-land-plot-real-estate-business-development-min.jpg')" }}
      >
        <div className="inner">
          <h1>Eco Blog</h1>
          <p>Read news, engineering updates, and project highlights regarding Pakistan’s climate technology initiatives.</p>
        </div>
      </header>

      {/* Blog Section */}
      <section className="content-section" style={{ backgroundColor: '#fffbf7' }}>
        <div className="container">
          
          {/* Category Filter */}
          <div className="row justify-content-center" style={{ marginBottom: '40px' }}>
            <div className="col-12 text-center">
              <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', background: '#fff', padding: '10px 20px', borderRadius: '40px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    style={{
                      border: 'none',
                      padding: '8px 20px',
                      borderRadius: '30px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      background: activeFilter === cat ? 'var(--accent-green, #10b981)' : 'transparent',
                      color: activeFilter === cat ? '#fff' : '#666',
                      transition: '0.2s'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="row">
            {filteredPosts.map((post, idx) => (
              <div key={idx} className="col-lg-6 col-md-6 mb-4">
                <div style={{
                  background: '#ffffff',
                  border: '1px solid rgba(0,0,0,0.06)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 10px 35px rgba(15,44,32,0.02)',
                  transition: '0.3s'
                }}
                className="blog-card"
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div>
                    <div style={{ height: '260px', overflow: 'hidden', position: 'relative' }}>
                      <img 
                        src={post.img} 
                        alt={post.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <span style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        background: 'var(--accent-green, #10b981)',
                        color: '#fff',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '700'
                      }}>
                        {post.category}
                      </span>
                    </div>

                    <div style={{ padding: '30px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888', fontSize: '13px', marginBottom: '12px' }}>
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h4 style={{ color: 'var(--text-dark, #0f2c20)', fontSize: '20px', fontWeight: '700', lineHeight: '1.4', marginBottom: '15px' }}>
                        {post.title}
                      </h4>
                      <p style={{ color: 'rgba(30,43,37,0.7)', fontSize: '14px', lineHeight: '1.6' }}>
                        {post.desc}
                      </p>
                    </div>
                  </div>

                  <div style={{ padding: '0 30px 30px 30px', borderTop: '1px solid rgba(0,0,0,0.04)', paddingTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'var(--accent-green, #10b981)',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '12px'
                      }}>
                        {post.author[0]}
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#555' }}>
                        {post.author}
                      </span>
                    </div>
                    <span style={{ color: 'var(--accent-green, #10b981)', fontWeight: '700', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                      Read Article <i className="fas fa-arrow-right" style={{ fontSize: '11px' }}></i>
                    </span>
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
