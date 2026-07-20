'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const emptyCaseStudy = {
  title: '',
  date: '',
  img: '',
  location: '',
  desc: '',
  slug: '',
  metrics: [
    { label: '', value: '' },
    { label: '', value: '' },
    { label: '', value: '' },
  ],
};

export default function CaseStudyForm({ initialData = null, caseStudyId = null }) {
  const router = useRouter();
  const [form, setForm] = useState({
    ...emptyCaseStudy,
    ...initialData,
    metrics: initialData?.metrics?.length
      ? initialData.metrics.map((m) => ({ label: m.label, value: m.value }))
      : emptyCaseStudy.metrics,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function updateMetric(index, field, value) {
    setForm((prev) => {
      const metrics = prev.metrics.map((m, i) =>
        i === index ? { ...m, [field]: value } : m
      );
      return { ...prev, metrics };
    });
  }

  function addMetric() {
    setForm((prev) => ({
      ...prev,
      metrics: [...prev.metrics, { label: '', value: '' }],
    }));
  }

  function removeMetric(index) {
    setForm((prev) => ({
      ...prev,
      metrics: prev.metrics.filter((_, i) => i !== index),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
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
          <label htmlFor="date">Status / date</label>
          <input
            id="date"
            value={form.date}
            onChange={(e) => update('date', e.target.value)}
            placeholder="Active Deployment (2025 - Present)"
            required
          />
        </div>
        <div className="admin-field">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            value={form.location}
            onChange={(e) => update('location', e.target.value)}
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

      <div className="admin-field">
        <label>Metrics</label>
        <div className="admin-metrics">
          {form.metrics.map((metric, index) => (
            <div key={index} className="admin-metric-row">
              <input
                value={metric.label}
                onChange={(e) => updateMetric(index, 'label', e.target.value)}
                placeholder="Label"
                required
              />
              <input
                value={metric.value}
                onChange={(e) => updateMetric(index, 'value', e.target.value)}
                placeholder="Value"
                required
              />
              <button
                type="button"
                className="admin-btn admin-btn-danger"
                onClick={() => removeMetric(index)}
                disabled={form.metrics.length <= 1}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" className="admin-btn admin-btn-secondary" onClick={addMetric}>
            Add metric
          </button>
        </div>
      </div>

      <div className="admin-form-actions">
        <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
          {loading ? 'Saving…' : caseStudyId ? 'Update case study' : 'Create case study'}
        </button>
        <Link href="/admin/case-studies" className="admin-btn admin-btn-secondary">
          Cancel
        </Link>
      </div>
    </form>
  );
}
