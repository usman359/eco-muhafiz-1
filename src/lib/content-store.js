import { randomUUID } from 'crypto';
import { sql } from './db.js';

const TABLES = {
  'case-studies': 'case_studies',
  blogs: 'blogs',
};

function table(collection) {
  const t = TABLES[collection];
  if (!t) throw new Error(`Unknown collection: ${collection}`);
  return t;
}

export function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'item';
}

function fromRow(collection, row) {
  if (!row) return null;
  if (collection === 'case-studies') {
    return {
      id: row.id,
      slug: row.slug,
      title: row.title,
      date: row.date,
      img: row.img,
      location: row.location,
      desc: row.desc,
      tags: row.tags ?? [],
    };
  }
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    date: row.date,
    category: row.category,
    img: row.img,
    readTime: row.read_time,
    author: row.author,
    desc: row.desc,
  };
}

import { readFileSync, existsSync } from 'fs';
import path from 'path';

function readJsonFallback(collection) {
  try {
    const filePath = path.join(process.cwd(), 'data', `${collection}.json`);
    if (existsSync(filePath)) {
      return JSON.parse(readFileSync(filePath, 'utf8'));
    }
  } catch (e) {
    console.warn('JSON fallback error:', e.message);
  }
  return [];
}

export async function readCollection(collection) {
  try {
    const t = table(collection);
    const rows = await sql.query(`SELECT * FROM ${t} ORDER BY created_at DESC`);
    if (rows && rows.length > 0) {
      return rows.map((row) => fromRow(collection, row));
    }
  } catch (err) {
    console.warn(`DB read error for ${collection}, using fallback:`, err.message);
  }
  return readJsonFallback(collection);
}

export async function getById(collection, id) {
  try {
    const t = table(collection);
    const rows = await sql.query(`SELECT * FROM ${t} WHERE id = $1`, [id]);
    if (rows && rows.length > 0) {
      return fromRow(collection, rows[0]);
    }
  } catch (err) {
    console.warn(`DB getById error for ${collection}, using fallback:`, err.message);
  }
  const fallbackItems = readJsonFallback(collection);
  return fallbackItems.find((item) => item.id === id) || null;
}

export async function getBySlug(collection, slug) {
  try {
    const t = table(collection);
    const rows = await sql.query(`SELECT * FROM ${t} WHERE slug = $1`, [slug]);
    if (rows && rows.length > 0) {
      return fromRow(collection, rows[0]);
    }
  } catch (err) {
    console.warn(`DB getBySlug error for ${collection}, using fallback:`, err.message);
  }
  const fallbackItems = readJsonFallback(collection);
  return fallbackItems.find((item) => item.slug === slug) || null;
}

async function slugExists(t, slug, excludeId) {
  const rows = excludeId
    ? await sql.query(`SELECT 1 FROM ${t} WHERE slug = $1 AND id <> $2`, [slug, excludeId])
    : await sql.query(`SELECT 1 FROM ${t} WHERE slug = $1`, [slug]);
  return rows.length > 0;
}

export async function createItem(collection, data) {
  const t = table(collection);
  const slugBase = slugify(data.slug || data.title);
  let slug = slugBase;
  let n = 1;
  while (await slugExists(t, slug)) {
    slug = `${slugBase}-${n++}`;
  }

  const id = randomUUID();

  if (collection === 'case-studies') {
    await sql.query(
      `INSERT INTO case_studies (id, slug, title, date, img, location, "desc", tags)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        id,
        slug,
        data.title,
        data.date,
        data.img,
        data.location,
        data.desc,
        JSON.stringify(data.tags || []),
      ]
    );
  } else {
    await sql.query(
      `INSERT INTO blogs (id, slug, title, date, category, img, read_time, author, "desc")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [id, slug, data.title, data.date, data.category, data.img, data.readTime, data.author, data.desc]
    );
  }

  return getById(collection, id);
}

export async function updateItem(collection, id, data) {
  const t = table(collection);
  const existing = await getById(collection, id);
  if (!existing) return null;

  const nextSlugBase = data.slug ? slugify(data.slug) : existing.slug;
  const taken = await slugExists(t, nextSlugBase, id);
  const slug = taken ? `${nextSlugBase}-${id.slice(0, 8)}` : nextSlugBase;

  if (collection === 'case-studies') {
    await sql.query(
      `UPDATE case_studies
       SET slug = $1, title = $2, date = $3, img = $4, location = $5, "desc" = $6, tags = $7
       WHERE id = $8`,
      [
        slug,
        data.title ?? existing.title,
        data.date ?? existing.date,
        data.img ?? existing.img,
        data.location ?? existing.location,
        data.desc ?? existing.desc,
        JSON.stringify(data.tags ?? existing.tags),
        id,
      ]
    );
  } else {
    await sql.query(
      `UPDATE blogs
       SET slug = $1, title = $2, date = $3, category = $4, img = $5, read_time = $6, author = $7, "desc" = $8
       WHERE id = $9`,
      [
        slug,
        data.title ?? existing.title,
        data.date ?? existing.date,
        data.category ?? existing.category,
        data.img ?? existing.img,
        data.readTime ?? existing.readTime,
        data.author ?? existing.author,
        data.desc ?? existing.desc,
        id,
      ]
    );
  }

  return getById(collection, id);
}

export async function deleteItem(collection, id) {
  const t = table(collection);
  const rows = await sql.query(`DELETE FROM ${t} WHERE id = $1 RETURNING id`, [id]);
  return rows.length > 0;
}
