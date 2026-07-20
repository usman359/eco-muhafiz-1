'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog';

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

  async function handleDelete(id) {
    const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || 'Delete failed.');
      throw new Error(data.error || 'Delete failed.');
    }
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  }

  return (
    <>
      <div className="admin-page-header">
        <h1>Blogs</h1>
        <Button asChild>
          <Link href="/admin/blogs/new">New post</Link>
        </Button>
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
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/admin/blogs/${blog.id}`}>Edit</Link>
                        </Button>
                        <DeleteConfirmDialog
                          title="Delete blog post?"
                          description={`This will permanently remove “${blog.title}” from the site. This action cannot be undone.`}
                          onConfirm={() => handleDelete(blog.id)}
                        />
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
