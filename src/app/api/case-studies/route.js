import { NextResponse } from 'next/server';
import { createItem, readCollection } from '@/lib/content-store';
import { ADMIN_COOKIE, isValidSessionToken } from '@/lib/admin-auth';

const COLLECTION = 'case-studies';

function validateCaseStudy(body) {
  const required = ['title', 'date', 'img', 'location', 'desc'];
  for (const key of required) {
    if (!body?.[key] || typeof body[key] !== 'string' || !body[key].trim()) {
      return `${key} is required.`;
    }
  }
  if (!Array.isArray(body.metrics)) {
    return 'metrics must be an array.';
  }
  for (const metric of body.metrics) {
    if (!metric?.label?.trim() || !metric?.value?.trim()) {
      return 'Each metric needs a label and value.';
    }
  }
  return null;
}

export async function GET() {
  try {
    const items = await readCollection(COLLECTION);
    return NextResponse.json(items);
  } catch (error) {
    console.error('GET /api/case-studies error:', error);
    return NextResponse.json({ error: 'Failed to load case studies.' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const token = request.cookies.get(ADMIN_COOKIE)?.value;
    if (!(await isValidSessionToken(token))) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const body = await request.json();
    const error = validateCaseStudy(body);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const item = await createItem(COLLECTION, {
      title: body.title.trim(),
      date: body.date.trim(),
      img: body.img.trim(),
      location: body.location.trim(),
      desc: body.desc.trim(),
      slug: body.slug?.trim() || undefined,
      metrics: body.metrics.map((m) => ({
        label: m.label.trim(),
        value: m.value.trim(),
      })),
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error('POST /api/case-studies error:', error);
    return NextResponse.json({ error: 'Failed to create case study.' }, { status: 500 });
  }
}
