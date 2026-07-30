import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { neon } from '@neondatabase/serverless';

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), '.env.local');
  if (!existsSync(envPath)) return;
  const lines = readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvLocal();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set (checked process.env and .env.local).');
}

const sql = neon(process.env.DATABASE_URL);

async function main() {
  await sql.query(`
    CREATE TABLE IF NOT EXISTS case_studies (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      img TEXT NOT NULL,
      location TEXT NOT NULL,
      "desc" TEXT NOT NULL,
      tags JSONB NOT NULL DEFAULT '[]',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);

  await sql.query(`
    ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS tags JSONB NOT NULL DEFAULT '[]'
  `);

  await sql.query(`
    CREATE TABLE IF NOT EXISTS blogs (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      category TEXT NOT NULL,
      img TEXT NOT NULL,
      read_time TEXT NOT NULL,
      author TEXT NOT NULL,
      "desc" TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);

  console.log('Tables ready: case_studies, blogs');

  const caseStudiesPath = path.join(process.cwd(), 'data', 'case-studies.json');
  if (existsSync(caseStudiesPath)) {
    const items = JSON.parse(readFileSync(caseStudiesPath, 'utf8'));
    for (const item of items) {
      await sql.query(
        `INSERT INTO case_studies (id, slug, title, date, img, location, "desc", tags)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (id) DO UPDATE SET
           tags = EXCLUDED.tags,
           title = EXCLUDED.title,
           "desc" = EXCLUDED.desc,
           location = EXCLUDED.location,
           date = EXCLUDED.date,
           img = EXCLUDED.img`,
        [item.id, item.slug, item.title, item.date, item.img, item.location, item.desc, JSON.stringify(item.tags || [])]
      );
    }
    console.log(`Synced ${items.length} case studies into database.`);
  }

  const [{ count: blogCount }] = await sql.query('SELECT COUNT(*)::int AS count FROM blogs');
  if (blogCount === 0) {
    const blogsPath = path.join(process.cwd(), 'data', 'blogs.json');
    if (existsSync(blogsPath)) {
      const items = JSON.parse(readFileSync(blogsPath, 'utf8'));
      for (const item of items) {
        await sql.query(
          `INSERT INTO blogs (id, slug, title, date, category, img, read_time, author, "desc")
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
           ON CONFLICT (id) DO NOTHING`,
          [item.id, item.slug, item.title, item.date, item.category, item.img, item.readTime, item.author, item.desc]
        );
      }
      console.log(`Seeded ${items.length} blogs.`);
    }
  } else {
    console.log(`blogs already has ${blogCount} rows, skipping seed.`);
  }
}

main()
  .then(() => {
    console.log('Migration complete.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Migration failed:', err);
    process.exit(1);
  });
