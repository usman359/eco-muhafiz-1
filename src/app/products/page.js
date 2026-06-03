'use client';

import React from 'react';

export default function Products() {
  const products = [
    {
      title: 'Margalla Audio Net',
      img: '/images/Eco Asset -1.png',
      tag: 'Active Deployment',
      scrollSpeed: '-0.5',
      desc: 'An array of solar-powered listening posts detecting chainsaws, gunshots, and fire indicators using edge AI and warning authorities.',
    },
    {
      title: 'Satellite Compliance',
      img: '/images/view-land-plot-real-estate-business-development-min.jpg',
      tag: 'Remote Sensing',
      scrollSpeed: '0',
      desc: 'Tracking land plots, canopy indices, and verified reforestation progress for real estate developers and regulatory compliance audits.',
    },
    {
      title: 'Wildfire Sentinels',
      img: '/images/IOT.png',
      tag: 'Sensor Mesh',
      scrollSpeed: '0.5',
      desc: 'Deployed multi-gas and thermal IoT micro-sensors inside high-risk forest zones to spot early combustion signatures and trace origin points.',
    },
  ];

  return (
    <>
      {/* Page Header */}
      <header 
        className="page-header" 
        style={{ backgroundImage: "url('/images/page-header.jpg')" }}
      >
        <div className="inner">
          <h1>Our Products</h1>
          <p>Real-time products deployed to safeguard biodiversity and track environmental compliance across Pakistan.</p>
        </div>
      </header>

      {/* Products list section */}
      <section className="content-section" style={{ backgroundColor: '#fffbf7' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="section-title text-center">
                <figure><img src="/images/eco-f.png" alt="Eco Muhafiz logo" /></figure>
                <h6>Active Deployments & Technology Solutions</h6>
                <h2>Initiatives In Action</h2>
              </div>
            </div>
          </div>

          <div className="row">
            {products.map((product, idx) => (
              <div key={idx} className="col-lg-4 col-md-6">
                <div 
                  className="exhibition-box" 
                  data-scroll 
                  data-scroll-speed={product.scrollSpeed}
                >
                  <figure>
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      <img 
                        src={product.img} 
                        alt={product.title} 
                        className="img" 
                      />
                    </a>
                    <div className="info">
                      <figure className="i">
                        <img src="/images/icon-info.png" alt="Info icon" />
                      </figure>
                      <span>{product.tag}</span>
                    </div>
                  </figure>
                  <div className="content-box">
                    <h4>
                      <a href="#" onClick={(e) => e.preventDefault()}>{product.title}</a>
                    </h4>
                    <p>{product.desc}</p>
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
