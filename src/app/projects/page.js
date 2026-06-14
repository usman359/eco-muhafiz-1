'use client';

import React from 'react';

export default function Projects() {
  const projects = [
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
        style={{ backgroundImage: "url('/images/view-land-plot-real-estate-business-development-min.jpg')" }}
      >
        <div className="inner">
          <h1>Our Projects</h1>
          <p>Real-time initiatives deployed to safeguard biodiversity and track environmental compliance across Pakistan.</p>
        </div>
      </header>

      {/* Projects list section */}
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
            {projects.map((project, idx) => (
              <div key={idx} className="col-lg-4 col-md-6">
                <div className="exhibition-box">
                  <figure>
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      <img 
                        src={project.img} 
                        alt={project.title} 
                        className="img" 
                      />
                    </a>
                    <div className="info">
                      <figure className="i">
                        <img src="/images/icon-info.png" alt="Info icon" />
                      </figure>
                      <span>{project.tag}</span>
                    </div>
                  </figure>
                  <div className="content-box">
                    <h4>
                      <a href="#" onClick={(e) => e.preventDefault()}>{project.title}</a>
                    </h4>
                    <p>{project.desc}</p>
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
