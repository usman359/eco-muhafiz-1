import { NextResponse } from 'next/server';
import { deleteItem, getById, getBySlug, updateItem } from '@/lib/content-store';
import { ADMIN_COOKIE, isValidSessionToken } from '@/lib/admin-auth';

const COLLECTION = 'blogs';

export const dynamic = 'force-dynamic';

const REQUIRED = ['title', 'date', 'category', 'img', 'readTime', 'author', 'desc'];

function validateBlog(body) {
  for (const key of REQUIRED) {
    if (!body?.[key] || typeof body[key] !== 'string' || !body[key].trim()) {
      return `${key} is required.`;
    }
  }
  return null;
}

async function requireAdmin(request) {
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  return isValidSessionToken(token);
}

async function findBlog(idOrSlug) {
  return (await getById(COLLECTION, idOrSlug)) || (await getBySlug(COLLECTION, idOrSlug));
}

export async function GET(_request, { params }) {
  try {
    const { id } = await params;
    const item = await findBlog(id);
    if (!item) {
      return NextResponse.json({ error: 'Blog not found.' }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    console.error('GET /api/blogs/[id] error:', error);
    return NextResponse.json({ error: 'Failed to load blog.' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    if (!(await requireAdmin(request))) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const error = validateBlog(body);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const item = await updateItem(COLLECTION, id, {
      title: body.title.trim(),
      date: body.date.trim(),
      category: body.category.trim(),
      img: body.img.trim(),
      readTime: body.readTime.trim(),
      author: body.author.trim(),
      desc: body.desc.trim(),
      slug: body.slug?.trim() || undefined,
    });

    if (!item) {
      return NextResponse.json({ error: 'Blog not found.' }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error('PUT /api/blogs/[id] error:', error);
    return NextResponse.json({ error: 'Failed to update blog.' }, { status: 500 });
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
      return NextResponse.json({ error: 'Blog not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/blogs/[id] error:', error);
    return NextResponse.json({ error: 'Failed to delete blog.' }, { status: 500 });
  }
}
