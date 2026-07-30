'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AdminSelect from '@/components/admin/AdminSelect';
import {
  BLOG_CATEGORY_OPTIONS,
  FieldLabel,
  READ_TIME_OPTIONS,
} from '@/components/admin/form-options';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import DatePicker from '@/components/ui/date-picker';

const emptyBlog = {
  title: '',
  date: '',
  category: '',
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
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const readTimeOptions = useMemo(() => {
    const opts = [...READ_TIME_OPTIONS];
    if (form.readTime && !opts.some((o) => o.value === form.readTime)) {
      opts.unshift({ value: form.readTime, label: form.readTime });
    }
    return opts;
  }, [form.readTime]);

  async function handleFileUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');
    try {
      const data = new FormData();
      data.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Upload failed');

      update('img', result.url);
    } catch (err) {
      setError(err.message || 'Failed to upload image.');
    } finally {
      setUploading(false);
    }
  }

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function validate() {
    const next = {};
    if (!form.title.trim()) next.title = 'Title is required.';
    if (!form.date.trim()) next.date = 'Date is required.';
    if (!form.category.trim()) next.category = 'Category is required.';
    if (!form.readTime.trim()) next.readTime = 'Read time is required.';
    if (!form.author.trim()) next.author = 'Author is required.';
    if (!form.img.trim()) next.img = 'Image path or URL is required.';
    if (!form.desc.trim()) next.desc = 'Description is required.';
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!validate()) {
      setError('Please fill in all required fields.');
      return;
    }
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
    <form className="admin-form" onSubmit={handleSubmit} noValidate>
      {error && <div className="admin-error">{error}</div>}

      <div className="admin-field">
        <FieldLabel htmlFor="title">Title</FieldLabel>
        <Input
          id="title"
          value={form.title}
          onChange={(e) => update('title', e.target.value)}
          placeholder="e.g. How Edge AI is Stopping Illegal Logging"
          aria-invalid={Boolean(fieldErrors.title)}
        />
        {fieldErrors.title && <span className="admin-field-error">{fieldErrors.title}</span>}
      </div>

      <div className="admin-field-row">
        <div className="admin-field">
          <FieldLabel htmlFor="date" hint="Shown on the public blog card.">
            Publish date
          </FieldLabel>
          <DatePicker
            id="date"
            value={form.date}
            onChange={(v) => update('date', v)}
            placeholder="Pick a date"
            invalid={Boolean(fieldErrors.date)}
          />
          {fieldErrors.date && <span className="admin-field-error">{fieldErrors.date}</span>}
        </div>
        <div className="admin-field">
          <FieldLabel htmlFor="category" hint="Matches public blog filter tabs.">
            Category
          </FieldLabel>
          <AdminSelect
            id="category"
            value={form.category}
            onChange={(v) => update('category', v)}
            options={BLOG_CATEGORY_OPTIONS}
            placeholder="Select category"
            required
            invalid={Boolean(fieldErrors.category)}
            aria-label="Category"
          />
          {fieldErrors.category && (
            <span className="admin-field-error">{fieldErrors.category}</span>
          )}
        </div>
      </div>

      <div className="admin-field-row">
        <div className="admin-field">
          <FieldLabel htmlFor="readTime">Read time</FieldLabel>
          <AdminSelect
            id="readTime"
            value={form.readTime}
            onChange={(v) => update('readTime', v)}
            options={readTimeOptions}
            placeholder="Select read time"
            required
            invalid={Boolean(fieldErrors.readTime)}
            aria-label="Read time"
          />
          {fieldErrors.readTime && (
            <span className="admin-field-error">{fieldErrors.readTime}</span>
          )}
        </div>
        <div className="admin-field">
          <FieldLabel htmlFor="author">Author</FieldLabel>
          <Input
            id="author"
            value={form.author}
            onChange={(e) => update('author', e.target.value)}
            placeholder="e.g. Anosha Zia"
            aria-invalid={Boolean(fieldErrors.author)}
          />
          {fieldErrors.author && (
            <span className="admin-field-error">{fieldErrors.author}</span>
          )}
        </div>
      </div>

      <div className="admin-field">
        <FieldLabel htmlFor="img" hint="Upload from system or enter an image URL.">
          Cover Image
        </FieldLabel>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
          <Input
            id="img"
            value={form.img}
            onChange={(e) => update('img', e.target.value)}
            placeholder="/images/example.png or /uploads/..."
            aria-invalid={Boolean(fieldErrors.img)}
            style={{ flex: 1 }}
          />
          <label
            style={{
              padding: '8px 16px',
              backgroundColor: '#10b981',
              color: '#fff',
              borderRadius: '6px',
              cursor: uploading ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {uploading ? 'Uploading…' : '📁 Upload Image'}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
              style={{ display: 'none' }}
            />
          </label>
        </div>
        {form.img && (
          <div style={{ marginTop: '8px' }}>
            <img
              src={form.img}
              alt="Preview"
              style={{ maxHeight: '100px', borderRadius: '8px', border: '1px solid #ddd' }}
            />
          </div>
        )}
        {fieldErrors.img && <span className="admin-field-error">{fieldErrors.img}</span>}
      </div>

      <div className="admin-field">
        <FieldLabel htmlFor="slug" hint="Leave blank to auto-generate from the title.">
          Slug
        </FieldLabel>
        <Input
          id="slug"
          value={form.slug}
          onChange={(e) => update('slug', e.target.value)}
          placeholder="auto-generated-from-title"
        />
      </div>

      <div className="admin-field">
        <FieldLabel htmlFor="desc">Description</FieldLabel>
        <Textarea
          id="desc"
          value={form.desc}
          onChange={(e) => update('desc', e.target.value)}
          placeholder="Short excerpt shown on the blog listing card…"
          rows={5}
          aria-invalid={Boolean(fieldErrors.desc)}
        />
        {fieldErrors.desc && <span className="admin-field-error">{fieldErrors.desc}</span>}
      </div>

      <div className="admin-form-actions">
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving…' : blogId ? 'Update post' : 'Create post'}
        </Button>
        <Button asChild variant="outline">
          <Link href="/admin/blogs">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
