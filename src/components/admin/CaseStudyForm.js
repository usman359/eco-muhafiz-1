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
  metrics: [
    { label: '', value: '' },
    { label: '', value: '' },
    { label: '', value: '' },
  ],
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
    metrics: initialData?.metrics?.length
      ? initialData.metrics.map((m) => ({ label: m.label, value: m.value }))
      : emptyCaseStudy.metrics,
  });
  const [statusMode, setStatusMode] = useState(() =>
    initialStatusMode(initialData?.date || '')
  );
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

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

  function updateMetric(index, field, value) {
    setForm((prev) => {
      const metrics = prev.metrics.map((m, i) =>
        i === index ? { ...m, [field]: value } : m
      );
      return { ...prev, metrics };
    });
    setFieldErrors((prev) => {
      if (!prev.metrics) return prev;
      const next = { ...prev };
      delete next.metrics;
      return next;
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

  function validate() {
    const next = {};
    if (!form.title.trim()) next.title = 'Title is required.';
    if (!form.date.trim()) next.date = 'Status is required.';
    if (!form.location.trim()) next.location = 'Location is required.';
    if (!form.img.trim()) next.img = 'Image path or URL is required.';
    if (!form.desc.trim()) next.desc = 'Description is required.';
    if (!form.metrics.length) {
      next.metrics = 'Add at least one metric.';
    } else if (form.metrics.some((m) => !m.label.trim() || !m.value.trim())) {
      next.metrics = 'Each metric needs both a label and a value.';
    }
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
        <FieldLabel htmlFor="img" hint="Use a public path like /images/photo.png or a full URL.">
          Cover image
        </FieldLabel>
        <Input
          id="img"
          value={form.img}
          onChange={(e) => update('img', e.target.value)}
          placeholder="/images/example.png"
          aria-invalid={Boolean(fieldErrors.img)}
        />
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
        <FieldLabel hint="Usually three impact metrics work best on the card.">
          Metrics
        </FieldLabel>
        <div className="admin-metrics">
          {form.metrics.map((metric, index) => (
            <div key={index} className="admin-metric-row">
              <Input
                value={metric.label}
                onChange={(e) => updateMetric(index, 'label', e.target.value)}
                placeholder="Label"
                aria-label={`Metric ${index + 1} label`}
              />
              <Input
                value={metric.value}
                onChange={(e) => updateMetric(index, 'value', e.target.value)}
                placeholder="Value"
                aria-label={`Metric ${index + 1} value`}
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeMetric(index)}
                disabled={form.metrics.length <= 1}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addMetric}>
            Add metric
          </Button>
        </div>
        {fieldErrors.metrics && (
          <span className="admin-field-error">{fieldErrors.metrics}</span>
        )}
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
