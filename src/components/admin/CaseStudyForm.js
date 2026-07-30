'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AdminSelect from '@/components/admin/AdminSelect';
import {
  CASE_STUDY_STATUS_OPTIONS,
  FieldLabel,
} from '@/components/admin/form-options';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const emptyCaseStudy = {
  title: '',
  date: '',
  img: '',
  location: '',
  desc: '',
  slug: '',
  tags: [],
};

function initialStatusMode(date) {
  if (!date) return '';
  const preset = CASE_STUDY_STATUS_OPTIONS.find(
    (o) => o.value !== '__custom__' && o.value === date
  );
  return preset ? date : '__custom__';
}

export default function CaseStudyForm({ initialData = null, caseStudyId = null }) {
  const router = useRouter();
  const [form, setForm] = useState({
    ...emptyCaseStudy,
    ...initialData,
    tags: initialData?.tags?.length
      ? [...initialData.tags]
      : initialData?.metrics?.length
      ? initialData.metrics.map((m) => m.label || m.value).filter(Boolean)
      : [],
  });
  const [tagInput, setTagInput] = useState('');
  const [statusMode, setStatusMode] = useState(() =>
    initialStatusMode(initialData?.date || '')
  );
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const statusOptions = useMemo(() => CASE_STUDY_STATUS_OPTIONS, []);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function handleStatusChange(value) {
    setStatusMode(value);
    setFieldErrors((prev) => {
      if (!prev.date) return prev;
      const next = { ...prev };
      delete next.date;
      return next;
    });
    if (value === '__custom__') {
      if (
        CASE_STUDY_STATUS_OPTIONS.some(
          (o) => o.value !== '__custom__' && o.value === form.date
        )
      ) {
        update('date', '');
      }
      return;
    }
    update('date', value);
  }

  function addTag() {
    const trimmed = tagInput.trim();
    if (!trimmed) return;
    if (!form.tags.includes(trimmed)) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, trimmed] }));
    }
    setTagInput('');
  }

  function removeTag(tagToRemove) {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToRemove),
    }));
  }

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

  function validate() {
    const next = {};
    if (!form.title.trim()) next.title = 'Title is required.';
    if (!form.date.trim()) next.date = 'Status is required.';
    if (!form.location.trim()) next.location = 'Location is required.';
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
      const url = caseStudyId
        ? `/api/case-studies/${caseStudyId}`
        : '/api/case-studies';
      const method = caseStudyId ? 'PUT' : 'POST';
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
      router.push('/admin/case-studies');
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
          placeholder="e.g. Margalla Hills Reserve AI Safeguard"
          aria-invalid={Boolean(fieldErrors.title)}
        />
        {fieldErrors.title && <span className="admin-field-error">{fieldErrors.title}</span>}
      </div>

      <div className="admin-field-row">
        <div className="admin-field">
          <FieldLabel htmlFor="status" hint="Shown next to location on the public card.">
            Status
          </FieldLabel>
          <AdminSelect
            id="status"
            value={statusMode}
            onChange={handleStatusChange}
            options={statusOptions}
            placeholder="Select status"
            required
            invalid={Boolean(fieldErrors.date)}
            aria-label="Status"
          />
          {statusMode === '__custom__' && (
            <Input
              id="date"
              value={form.date}
              onChange={(e) => update('date', e.target.value)}
              placeholder="e.g. Pilot Phase (2026)"
              aria-invalid={Boolean(fieldErrors.date)}
            />
          )}
          {fieldErrors.date && <span className="admin-field-error">{fieldErrors.date}</span>}
        </div>
        <div className="admin-field">
          <FieldLabel htmlFor="location">Location</FieldLabel>
          <Input
            id="location"
            value={form.location}
            onChange={(e) => update('location', e.target.value)}
            placeholder="e.g. Islamabad, Pakistan"
            aria-invalid={Boolean(fieldErrors.location)}
          />
          {fieldErrors.location && (
            <span className="admin-field-error">{fieldErrors.location}</span>
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
          placeholder="Full case study summary shown on the public page…"
          rows={6}
          aria-invalid={Boolean(fieldErrors.desc)}
        />
        {fieldErrors.desc && <span className="admin-field-error">{fieldErrors.desc}</span>}
      </div>

      <div className="admin-field">
        <FieldLabel hint="Add tags to highlight technology, scope, or partners.">
          Tags
        </FieldLabel>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Add a tag (e.g. Bioacoustics)"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addTag();
              }
            }}
          />
          <Button type="button" onClick={addTag} variant="outline">
            Add Tag
          </Button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {form.tags.map((tag, idx) => (
            <span
              key={idx}
              style={{
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                color: '#10b981',
                padding: '4px 12px',
                borderRadius: '16px',
                fontSize: '13px',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              #{tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                style={{
                  border: 'none',
                  background: 'none',
                  color: '#ef4444',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="admin-form-actions">
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving…' : caseStudyId ? 'Update case study' : 'Create case study'}
        </Button>
        <Button asChild variant="outline">
          <Link href="/admin/case-studies">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
