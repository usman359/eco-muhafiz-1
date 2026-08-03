'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Blog() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blogs')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setBlogPosts(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', 'AI & IoT', 'Satellite Telemetry', 'Conservation', 'Community'];

  const filteredPosts =
    activeFilter === 'All'
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeFilter);

  return (
    <>
      <header
        className="page-header"
        style={{
          backgroundImage:
            "url('/images/view-land-plot-real-estate-business-development-min.jpg')",
        }}
      >
        <div className="inner">
          <h1>Eco Blog</h1>
          <p>
            Read news, engineering updates, and project highlights regarding
            Pakistan’s climate technology initiatives.
          </p>
        </div>
      </header>

      <section className="content-section" style={{ backgroundColor: '#fffbf7' }}>
        <div className="container">
          <div className="row justify-content-center" style={{ marginBottom: '40px' }}>
            <div className="col-12 text-center">
              <div
                className="filter-tabs-scroll"
                style={{
                  background: '#fff',
                  padding: '10px 16px',
                  borderRadius: '40px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                  maxWidth: '100%',
                }}
              >
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
                      background:
                        activeFilter === cat
                          ? 'var(--accent-green, #10b981)'
                          : 'transparent',
                      color: activeFilter === cat ? '#fff' : '#666',
                      transition: '0.2s',
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {loading && (
            <p style={{ textAlign: 'center', color: '#667', padding: '40px 0' }}>
              Loading posts…
            </p>
          )}

          {!loading && filteredPosts.length === 0 && (
            <p style={{ textAlign: 'center', color: '#667', padding: '40px 0' }}>
              No posts found.
            </p>
          )}

          <div className="row">
            {filteredPosts.map((post) => {
              const href = post.slug ? `/blog/${post.slug}` : '/blog';
              return (
                <div key={post.id || post.slug} className="col-lg-6 col-md-6 mb-4">
                  <Link
                    href={href}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'block',
                      height: '100%',
                    }}
                  >
                    <div
                      style={{
                        background: '#ffffff',
                        border: '1px solid rgba(0,0,0,0.06)',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: '0 10px 35px rgba(15,44,32,0.02)',
                        transition: '0.3s',
                        cursor: 'pointer',
                      }}
                      className="blog-card"
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = 'translateY(-5px)')
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = 'translateY(0)')
                      }
                    >
                      <div>
                        <div
                          style={{
                            height: '260px',
                            overflow: 'hidden',
                            position: 'relative',
                          }}
                        >
                          <img
                            src={post.img}
                            alt={post.title}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                          <span
                            style={{
                              position: 'absolute',
                              top: '20px',
                              left: '20px',
                              background: 'var(--accent-green, #10b981)',
                              color: '#fff',
                              padding: '6px 14px',
                              borderRadius: '20px',
                              fontSize: '12px',
                              fontWeight: '700',
                            }}
                          >
                            {post.category}
                          </span>
                        </div>

                        <div style={{ padding: '30px' }}>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              color: '#888',
                              fontSize: '13px',
                              marginBottom: '12px',
                            }}
                          >
                            <span>{post.date}</span>
                            <span>{post.readTime}</span>
                          </div>
                          <h4
                            style={{
                              color: 'var(--text-dark, #0f2c20)',
                              fontSize: '20px',
                              fontWeight: '700',
                              lineHeight: '1.4',
                              marginBottom: '15px',
                            }}
                          >
                            {post.title}
                          </h4>
                          <p
                            style={{
                              color: 'rgba(30,43,37,0.7)',
                              fontSize: '14px',
                              lineHeight: '1.6',
                            }}
                          >
                            {post.desc}
                          </p>
                        </div>
                      </div>

                      <div
                        style={{
                          padding: '0 30px 30px 30px',
                          borderTop: '1px solid rgba(0,0,0,0.04)',
                          paddingTop: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                          }}
                        >
                          <div
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              background: 'var(--accent-green, #10b981)',
                              color: '#fff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold',
                              fontSize: '12px',
                            }}
                          >
                            {post.author?.[0] || '?'}
                          </div>
                          <span
                            style={{
                              fontSize: '13px',
                              fontWeight: '600',
                              color: '#555',
                            }}
                          >
                            {post.author}
                          </span>
                        </div>
                        <span
                          style={{
                            color: 'var(--accent-green, #10b981)',
                            fontWeight: '700',
                            fontSize: '13px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                          }}
                        >
                          Read Article{' '}
                          <i
                            className="fas fa-arrow-right"
                            style={{ fontSize: '11px' }}
                          ></i>
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
