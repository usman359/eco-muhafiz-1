'use client';

import React, { useEffect, useState } from 'react';

export default function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/case-studies')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCaseStudies(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* Page Header */}
      <header
        className="page-header"
        style={{
          backgroundImage:
            "url('/images/view-land-plot-real-estate-business-development-min.jpg')",
        }}
      >
        <div className="inner">
          <h1>Case Studies</h1>
          <p>
            Read detailed records of how our on-ground devices and satellite
            trackers deliver proof of conservation.
          </p>
        </div>
      </header>

      {/* Case Studies Grid */}
      <section className="content-section" style={{ backgroundColor: '#fffbf7' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center" style={{ marginBottom: '50px' }}>
              <span
                style={{
                  color: 'var(--accent-green, #10b981)',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontWeight: 'bold',
                }}
              >
                Our Impact Records
              </span>
              <h2
                style={{
                  fontSize: '36px',
                  marginTop: '10px',
                  fontFamily: 'Cinzel, serif',
                  color: '#0f2c20',
                }}
              >
                Proof in the Wilderness
              </h2>
            </div>
          </div>

          {loading && (
            <p style={{ textAlign: 'center', color: '#667', padding: '40px 0' }}>
              Loading case studies…
            </p>
          )}

          {!loading && caseStudies.length === 0 && (
            <p style={{ textAlign: 'center', color: '#667', padding: '40px 0' }}>
              No case studies found.
            </p>
          )}

          <div className="row">
            {caseStudies.map((cs) => (
              <div key={cs.id || cs.slug} className="col-12 mb-5">
                <div
                  style={{
                    background: '#ffffff',
                    border: '1px solid rgba(0,0,0,0.06)',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(15,44,32,0.03)',
                  }}
                >
                  <div className="row g-0 align-items-stretch">
                    <div className="col-lg-5">
                      <div
                        style={{
                          position: 'relative',
                          height: '100%',
                          minHeight: '300px',
                        }}
                      >
                        <img
                          src={cs.img}
                          alt={cs.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                        />
                      </div>
                    </div>
                    <div
                      className="col-lg-7"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        padding: '45px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '13px',
                          color: 'var(--accent-green, #10b981)',
                          fontWeight: 'bold',
                          display: 'block',
                          marginBottom: '8px',
                        }}
                      >
                        {cs.location} | {cs.date}
                      </span>
                      <h3
                        style={{
                          color: 'var(--text-dark, #0f2c20)',
                          fontSize: '26px',
                          fontWeight: '700',
                          marginBottom: '15px',
                        }}
                      >
                        {cs.title}
                      </h3>
                      <p
                        style={{
                          color: 'rgba(30,43,37,0.8)',
                          fontSize: '15px',
                          lineHeight: '1.7',
                          marginBottom: '30px',
                        }}
                      >
                        {cs.desc}
                      </p>

                      <div
                        className="row"
                        style={{
                          borderTop: '1px solid rgba(0,0,0,0.06)',
                          paddingTop: '20px',
                        }}
                      >
                        {(cs.metrics || []).map((m, mIdx) => (
                          <div key={mIdx} className="col-4">
                            <span
                              style={{
                                display: 'block',
                                fontSize: '24px',
                                fontWeight: '800',
                                color: 'var(--accent-green, #10b981)',
                              }}
                            >
                              {m.value}
                            </span>
                            <small
                              style={{
                                display: 'block',
                                fontSize: '11px',
                                color: '#777',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                marginTop: '2px',
                              }}
                            >
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
