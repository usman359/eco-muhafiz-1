'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/blogs').then((r) => r.json()),
      fetch('/api/case-studies').then((r) => r.json()),
    ])
      .then(([b, c]) => {
        setBlogs(Array.isArray(b) ? b : []);
        setCaseStudies(Array.isArray(c) ? c : []);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="admin-page-header">
        <h1>Dashboard</h1>
      </div>

      <div className="admin-stats">
        <div className="admin-stat">
          <span>Blog posts</span>
          <strong>{loading ? '—' : blogs.length}</strong>
        </div>
        <div className="admin-stat">
          <span>Case studies</span>
          <strong>{loading ? '—' : caseStudies.length}</strong>
        </div>
      </div>

      <div className="admin-card" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button asChild>
          <Link href="/admin/blogs/new">New blog post</Link>
        </Button>
        <Button asChild>
          <Link href="/admin/case-studies/new">New case study</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/admin/blogs">Manage blogs</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/admin/case-studies">Manage case studies</Link>
        </Button>
      </div>
    </>
  );
}
