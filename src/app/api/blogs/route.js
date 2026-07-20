import { NextResponse } from 'next/server';
import { createItem, readCollection } from '@/lib/content-store';
import { ADMIN_COOKIE, isValidSessionToken } from '@/lib/admin-auth';

const COLLECTION = 'blogs';

const REQUIRED = ['title', 'date', 'category', 'img', 'readTime', 'author', 'desc'];

function validateBlog(body) {
  for (const key of REQUIRED) {
    if (!body?.[key] || typeof body[key] !== 'string' || !body[key].trim()) {
      return `${key} is required.`;
    }
  }
  return null;
}

export async function GET() {
  try {
    const items = await readCollection(COLLECTION);
    return NextResponse.json(items);
  } catch (error) {
    console.error('GET /api/blogs error:', error);
    return NextResponse.json({ error: 'Failed to load blogs.' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const token = request.cookies.get(ADMIN_COOKIE)?.value;
    if (!(await isValidSessionToken(token))) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const body = await request.json();
    const error = validateBlog(body);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const item = await createItem(COLLECTION, {
      title: body.title.trim(),
      date: body.date.trim(),
      category: body.category.trim(),
      img: body.img.trim(),
      readTime: body.readTime.trim(),
      author: body.author.trim(),
      desc: body.desc.trim(),
      slug: body.slug?.trim() || undefined,
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error('POST /api/blogs error:', error);
    return NextResponse.json({ error: 'Failed to create blog.' }, { status: 500 });
  }
}
