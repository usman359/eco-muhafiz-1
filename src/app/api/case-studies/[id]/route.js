import { NextResponse } from 'next/server';
import { deleteItem, getById, updateItem } from '@/lib/content-store';
import { ADMIN_COOKIE, isValidSessionToken } from '@/lib/admin-auth';

const COLLECTION = 'case-studies';

export const dynamic = 'force-dynamic';

function validateCaseStudy(body) {
  const required = ['title', 'date', 'img', 'location', 'desc'];
  for (const key of required) {
    if (!body?.[key] || typeof body[key] !== 'string' || !body[key].trim()) {
      return `${key} is required.`;
    }
  }
  if (body.tags && !Array.isArray(body.tags)) {
    return 'tags must be an array.';
  }
  return null;
}

async function requireAdmin(request) {
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  return isValidSessionToken(token);
}

export async function GET(_request, { params }) {
  try {
    const { id } = await params;
    const item = await getById(COLLECTION, id);
    if (!item) {
      return NextResponse.json({ error: 'Case study not found.' }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    console.error('GET /api/case-studies/[id] error:', error);
    return NextResponse.json({ error: 'Failed to load case study.' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    if (!(await requireAdmin(request))) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const error = validateCaseStudy(body);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const item = await updateItem(COLLECTION, id, {
      title: body.title.trim(),
      date: body.date.trim(),
      img: body.img.trim(),
      location: body.location.trim(),
      desc: body.desc.trim(),
      slug: body.slug?.trim() || undefined,
      tags: Array.isArray(body.tags) ? body.tags.map((t) => String(t).trim()).filter(Boolean) : [],
    });

    if (!item) {
      return NextResponse.json({ error: 'Case study not found.' }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error('PUT /api/case-studies/[id] error:', error);
    return NextResponse.json({ error: 'Failed to update case study.' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    if (!(await requireAdmin(request))) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { id } = await params;
    const ok = await deleteItem(COLLECTION, id);
    if (!ok) {
      return NextResponse.json({ error: 'Case study not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/case-studies/[id] error:', error);
    return NextResponse.json({ error: 'Failed to delete case study.' }, { status: 500 });
  }
}
