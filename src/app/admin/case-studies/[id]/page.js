'use client';

import { useEffect, useState, use } from 'react';
import CaseStudyForm from '@/components/admin/CaseStudyForm';

export default function EditCaseStudyPage({ params }) {
  const { id } = use(params);
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/case-studies/${id}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Not found');
        setItem(data);
      })
      .catch((err) => setError(err.message || 'Failed to load'))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      <div className="admin-page-header">
        <h1>Edit case study</h1>
      </div>
      <div className="admin-card">
        {loading && <p className="admin-empty">Loading…</p>}
        {error && <div className="admin-error">{error}</div>}
        {item && <CaseStudyForm initialData={item} caseStudyId={item.id} />}
      </div>
    </>
  );
}
