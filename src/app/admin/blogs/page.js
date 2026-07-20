'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadBlogs() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load');
      setBlogs(data);
    } catch (err) {
      setError(err.message || 'Failed to load blogs.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBlogs();
  }, []);

  async function handleDelete(id, title) {
    if (!window.confirm(`Delete “${title}”?`)) return;
    const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const data = await res.json();
      alert(data.error || 'Delete failed.');
      return;
    }
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  }

  return (
    <>
      <div className="admin-page-header">
        <h1>Blogs</h1>
        <Link href="/admin/blogs/new" className="admin-btn admin-btn-primary">
          New post
        </Link>
      </div>

      <div className="admin-card">
        {error && <div className="admin-error">{error}</div>}
        {loading ? (
          <p className="admin-empty">Loading…</p>
        ) : blogs.length === 0 ? (
          <p className="admin-empty">No blog posts yet.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Author</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog.id}>
                    <td>{blog.title}</td>
                    <td>{blog.category}</td>
                    <td>{blog.date}</td>
                    <td>{blog.author}</td>
                    <td>
                      <div className="admin-table-actions">
                        <Link
                          href={`/admin/blogs/${blog.id}`}
                          className="admin-btn admin-btn-secondary"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          className="admin-btn admin-btn-danger"
                          onClick={() => handleDelete(blog.id, blog.title)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
