'use client';

import React from 'react';

export default function Team() {
  const teamMembers = [
    {
      name: 'Anosha Zia',
      img: '/images/team/anosha.jpeg',
      role: 'Founder & CEO',
      scrollSpeed: '-0.5',
      desc: 'Every 19 minutes, Pakistan loses a hectare of forest. No alarm. No record. No accountability. We built EcoMuhafiz because silence is not an option when ecosystems are collapsing in real time. Our forests are not a lost cause they are an unmeasured asset. We are building the system that finally measures, monitors, and protects them. The world didn\'t build this for us. So we built it ourselves.',
    },
    {
      name: 'Aniqa Gulraiz',
      img: '/images/team/aniqa.jpeg',
      role: 'Co-Founder & CSO, Eco Muhafiz',
      scrollSpeed: '0',
      desc: '“At Eco Muhafiz, we believe the future of conservation lies in understanding nature before it is lost. By transforming forest sounds into actionable intelligence, we help protect ecosystems, detect threats, and preserve biodiversity. Our vision is simple: a world where technology works in harmony with nature, not against it.”',
    },
    {
      name: 'Aqsa Sarfraz',
      img: '/images/team/aqsa.jpeg',
      role: 'Co-Founder',
      scrollSpeed: '0.5',
      desc: '"As Co-Founder of Eco Muhafiz, I’m committed to empowering communities through environmental awareness, sustainable action, and collective responsibility for a greener future."',
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
          <h1>Our Team</h1>
          <p>A diverse group of technologists, engineers, and conservationists united to protect our biosphere.</p>
        </div>
      </header>

      {/* Team list section */}
      <section className="content-section" style={{ backgroundColor: '#fffbf7' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="section-title text-center">
                <figure><img src="/images/eco-f.png" alt="Eco Muhafiz logo" /></figure>
                <h6>Experts in AI, IoT & Forestry</h6>
                <h2>The Guardians</h2>
              </div>
            </div>
          </div>

          <div className="row">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="col-lg-4 col-md-6">
                <div className="exhibition-box">
                  <figure>
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      <img 
                        src={member.img} 
                        alt={member.name} 
                        className="img" 
                      />
                    </a>
                    <div className="info">
                      <figure className="i">
                        <img src="/images/icon-info.png" alt="Info icon" />
                      </figure>
                      <span>{member.role}</span>
                    </div>
                  </figure>
                  <div className="content-box">
                    <h4>
                      <a href="#" onClick={(e) => e.preventDefault()}>{member.name}</a>
                    </h4>
                    <p>{member.desc}</p>
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
