'use client';

import { Label } from '@/components/ui/label';

export function FieldLabel({ htmlFor, children, hint }) {
  return (
    <div className="admin-label-row">
      <Label htmlFor={htmlFor}>{children}</Label>
      {hint ? <p className="admin-field-hint">{hint}</p> : null}
    </div>
  );
}

export const BLOG_CATEGORIES = [
  'AI & IoT',
  'Satellite Telemetry',
  'Conservation',
  'Community',
];

export const BLOG_CATEGORY_OPTIONS = BLOG_CATEGORIES.map((c) => ({
  value: c,
  label: c,
}));

export const READ_TIME_OPTIONS = [
  '3 min read',
  '4 min read',
  '5 min read',
  '6 min read',
  '7 min read',
  '8 min read',
  '10 min read',
].map((t) => ({ value: t, label: t }));

export const CASE_STUDY_STATUS_OPTIONS = [
  {
    value: 'Active Deployment (2025 - Present)',
    label: 'Active Deployment (2025 - Present)',
  },
  {
    value: 'Completed Project (2025)',
    label: 'Completed Project (2025)',
  },
  {
    value: 'Upcoming Pilot (Launching Q3 2026)',
    label: 'Upcoming Pilot (Launching Q3 2026)',
  },
  {
    value: '__custom__',
    label: 'Custom status…',
  },
];
