'use client';

import { useEffect, useState, use } from 'react';
import BlogForm from '@/components/admin/BlogForm';

export default function EditBlogPage({ params }) {
  const { id } = use(params);
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/blogs/${id}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Not found');
        setBlog(data);
      })
      .catch((err) => setError(err.message || 'Failed to load'))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      <div className="admin-page-header">
        <h1>Edit blog post</h1>
      </div>
      <div className="admin-card">
        {loading && <p className="admin-empty">Loading…</p>}
        {error && <div className="admin-error">{error}</div>}
        {blog && <BlogForm initialData={blog} blogId={blog.id} />}
      </div>
    </>
  );
}
