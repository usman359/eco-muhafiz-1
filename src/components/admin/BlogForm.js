'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const CATEGORIES = ['AI & IoT', 'Satellite Telemetry', 'Conservation', 'Community'];

const emptyBlog = {
  title: '',
  date: '',
  category: 'AI & IoT',
  img: '',
  readTime: '',
  author: '',
  desc: '',
  slug: '',
};

export default function BlogForm({ initialData = null, blogId = null }) {
  const router = useRouter();
  const [form, setForm] = useState({ ...emptyBlog, ...initialData });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const url = blogId ? `/api/blogs/${blogId}` : '/api/blogs';
      const method = blogId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Save failed.');
        return;
      }
      router.push('/admin/blogs');
      router.refresh();
    } catch {
      setError('Save failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      {error && <div className="admin-error">{error}</div>}

      <div className="admin-field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={form.title}
          onChange={(e) => update('title', e.target.value)}
          required
        />
      </div>

      <div className="admin-field-row">
        <div className="admin-field">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            value={form.date}
            onChange={(e) => update('date', e.target.value)}
            placeholder="June 28, 2026"
            required
          />
        </div>
        <div className="admin-field">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={form.category}
            onChange={(e) => update('category', e.target.value)}
            required
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="admin-field-row">
        <div className="admin-field">
          <label htmlFor="readTime">Read time</label>
          <input
            id="readTime"
            value={form.readTime}
            onChange={(e) => update('readTime', e.target.value)}
            placeholder="5 min read"
            required
          />
        </div>
        <div className="admin-field">
          <label htmlFor="author">Author</label>
          <input
            id="author"
            value={form.author}
            onChange={(e) => update('author', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="admin-field">
        <label htmlFor="img">Image path / URL</label>
        <input
          id="img"
          value={form.img}
          onChange={(e) => update('img', e.target.value)}
          placeholder="/images/example.png"
          required
        />
      </div>

      <div className="admin-field">
        <label htmlFor="slug">Slug (optional)</label>
        <input
          id="slug"
          value={form.slug}
          onChange={(e) => update('slug', e.target.value)}
          placeholder="auto-generated from title if empty"
        />
      </div>

      <div className="admin-field">
        <label htmlFor="desc">Description</label>
        <textarea
          id="desc"
          value={form.desc}
          onChange={(e) => update('desc', e.target.value)}
          required
        />
      </div>

      <div className="admin-form-actions">
        <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
          {loading ? 'Saving…' : blogId ? 'Update post' : 'Create post'}
        </button>
        <Link href="/admin/blogs" className="admin-btn admin-btn-secondary">
          Cancel
        </Link>
      </div>
    </form>
  );
}
