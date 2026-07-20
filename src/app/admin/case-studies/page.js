'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog';

export default function AdminCaseStudiesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadItems() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/case-studies');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load');
      setItems(data);
    } catch (err) {
      setError(err.message || 'Failed to load case studies.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  async function handleDelete(id) {
    const res = await fetch(`/api/case-studies/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || 'Delete failed.');
      throw new Error(data.error || 'Delete failed.');
    }
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <>
      <div className="admin-page-header">
        <h1>Case Studies</h1>
        <Button asChild>
          <Link href="/admin/case-studies/new">New case study</Link>
        </Button>
      </div>

      <div className="admin-card">
        {error && <div className="admin-error">{error}</div>}
        {loading ? (
          <p className="admin-empty">Loading…</p>
        ) : items.length === 0 ? (
          <p className="admin-empty">No case studies yet.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Location</th>
                  <th>Date / status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.location}</td>
                    <td>{item.date}</td>
                    <td>
                      <div className="admin-table-actions">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/admin/case-studies/${item.id}`}>Edit</Link>
                        </Button>
                        <DeleteConfirmDialog
                          title="Delete case study?"
                          description={`This will permanently remove “${item.title}” from the site. This action cannot be undone.`}
                          onConfirm={() => handleDelete(item.id)}
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
