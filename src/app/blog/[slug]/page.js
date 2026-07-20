'use client';

import React, { useEffect, useMemo, useState, use } from 'react';
import Link from 'next/link';

function splitIntoParagraphs(text = '') {
  const trimmed = text.trim();
  if (!trimmed) return [];

  const byBreaks = trimmed.split(/\n+/).map((p) => p.trim()).filter(Boolean);
  if (byBreaks.length > 1) return byBreaks;

  // Soft-split long single blocks into readable paragraphs
  const sentences = trimmed.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [trimmed];
  const paragraphs = [];
  let bucket = '';
  sentences.forEach((sentence, index) => {
    bucket = `${bucket}${sentence}`.trim();
    if (bucket.length > 180 || index === sentences.length - 1) {
      paragraphs.push(bucket);
      bucket = '';
    }
  });
  return paragraphs.filter(Boolean);
}

export default function BlogDetailPage({ params }) {
  const { slug } = use(params);
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError('');

    Promise.all([
      fetch(`/api/blogs/${encodeURIComponent(slug)}`).then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Post not found');
        return data;
      }),
      fetch('/api/blogs').then((res) => res.json()),
    ])
      .then(([detail, all]) => {
        setPost(detail);
        const others = Array.isArray(all)
          ? all.filter((p) => p.slug !== detail.slug && p.id !== detail.id)
          : [];
        const sameCategory = others.filter((p) => p.category === detail.category);
        setRelated((sameCategory.length ? sameCategory : others).slice(0, 3));
      })
      .catch((err) => setError(err.message || 'Failed to load post'))
      .finally(() => setLoading(false));
  }, [slug]);

  const paragraphs = useMemo(() => splitIntoParagraphs(post?.desc), [post?.desc]);
  const lead = paragraphs[0] || '';
  const rest = paragraphs.slice(1);

  return (
    <>
      <header
        className="blog-article-hero"
        style={{
          backgroundImage: `linear-gradient(120deg, rgba(15,44,32,0.92) 0%, rgba(15,44,32,0.55) 48%, rgba(15,44,32,0.35) 100%), url('${
            post?.img ||
            '/images/view-land-plot-real-estate-business-development-min.jpg'
          }')`,
        }}
      >
        <div className="container blog-article-hero-inner">
          <Link href="/blog" className="blog-article-back">
            <i className="fas fa-arrow-left" />
            Back to Blog
          </Link>

          {loading ? (
            <p className="blog-article-loading">Loading article…</p>
          ) : error ? (
            <div className="blog-article-error">{error}</div>
          ) : post ? (
            <>
              <div className="blog-article-meta-top">
                <span className="blog-article-category">{post.category}</span>
                <span className="blog-article-dot" />
                <span>{post.date}</span>
                <span className="blog-article-dot" />
                <span>{post.readTime}</span>
              </div>
              <h1 className="blog-article-title">{post.title}</h1>
              <div className="blog-article-author-hero">
                <div className="blog-article-avatar" aria-hidden="true">
                  {post.author?.[0] || '?'}
                </div>
                <div>
                  <strong>{post.author}</strong>
                  <span>Eco Muhafiz Insights</span>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </header>

      {!loading && !error && post && (
        <section className="content-section blog-article-section">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-8">
                <article className="blog-article-body">
                  <figure className="blog-article-figure">
                    <img src={post.img} alt={post.title} />
                    <figcaption>
                      {post.category} · Field notes from Pakistan’s climate tech frontline
                    </figcaption>
                  </figure>

                  {lead && (
                    <p className="blog-article-lead">{lead}</p>
                  )}

                  {rest.map((paragraph, index) => (
                    <p key={index} className="blog-article-paragraph">
                      {paragraph}
                    </p>
                  ))}

                  <aside className="blog-article-callout">
                    <span className="blog-article-callout-label">Why it matters</span>
                    <p>
                      Eco Muhafiz connects on-ground sensing with satellite intelligence so
                      conservation teams can act faster, prove impact, and protect forests
                      with auditable evidence.
                    </p>
                  </aside>

                  <div className="blog-article-author-card">
                    <div className="blog-article-avatar lg" aria-hidden="true">
                      {post.author?.[0] || '?'}
                    </div>
                    <div>
                      <span className="blog-article-author-label">Written by</span>
                      <h3>{post.author}</h3>
                      <p>
                        Sharing engineering updates, conservation outcomes, and field stories
                        from Eco Muhafiz’s climate intelligence work across Pakistan.
                      </p>
                    </div>
                  </div>
                </article>
              </div>

              <div className="col-lg-4">
                <aside className="blog-article-sidebar">
                  <div className="blog-article-side-card">
                    <h4>Article details</h4>
                    <ul>
                      <li>
                        <span>Category</span>
                        <strong>{post.category}</strong>
                      </li>
                      <li>
                        <span>Published</span>
                        <strong>{post.date}</strong>
                      </li>
                      <li>
                        <span>Reading time</span>
                        <strong>{post.readTime}</strong>
                      </li>
                      <li>
                        <span>Author</span>
                        <strong>{post.author}</strong>
                      </li>
                    </ul>
                  </div>

                  <div className="blog-article-side-card">
                    <h4>Explore more</h4>
                    <p className="blog-article-side-copy">
                      Dive into satellite monitoring, edge AI, and community-led conservation
                      stories.
                    </p>
                    <Link href="/blog" className="blog-article-side-link">
                      View all articles
                      <i className="fas fa-arrow-right" />
                    </Link>
                  </div>

                  {related.length > 0 && (
                    <div className="blog-article-side-card">
                      <h4>Related reading</h4>
                      <div className="blog-related-list">
                        {related.map((item) => (
                          <Link
                            key={item.id || item.slug}
                            href={`/blog/${item.slug}`}
                            className="blog-related-item"
                          >
                            <div
                              className="blog-related-thumb"
                              style={{ backgroundImage: `url('${item.img}')` }}
                            />
                            <div>
                              <span>{item.category}</span>
                              <strong>{item.title}</strong>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </aside>
              </div>
            </div>

            {related.length > 0 && (
              <div className="blog-more-section">
                <div className="blog-more-header">
                  <span>Continue reading</span>
                  <h2>More from the Eco Blog</h2>
                </div>
                <div className="row">
                  {related.map((item) => (
                    <div key={`more-${item.id || item.slug}`} className="col-md-4 mb-4">
                      <Link href={`/blog/${item.slug}`} className="blog-more-card">
                        <div
                          className="blog-more-image"
                          style={{ backgroundImage: `url('${item.img}')` }}
                        >
                          <span>{item.category}</span>
                        </div>
                        <div className="blog-more-content">
                          <small>
                            {item.date} · {item.readTime}
                          </small>
                          <h3>{item.title}</h3>
                          <p>{item.desc}</p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {!loading && error && (
        <section className="content-section" style={{ backgroundColor: '#fffbf7' }}>
          <div className="container">
            <div className="blog-article-error">{error}</div>
            <Link href="/blog" className="blog-article-back" style={{ marginTop: 20 }}>
              <i className="fas fa-arrow-left" />
              Back to Blog
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
