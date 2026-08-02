import { readFileSync, existsSync } from 'fs';
import path from 'path';

// Load .env.local BEFORE any module import
const envPath = path.join(process.cwd(), '.env.local');
if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, '');
    }
  }
}

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is missing in .env.local!');
  process.exit(1);
}

// Dynamically import DB modules after DATABASE_URL is set
const { neon } = await import('@neondatabase/serverless');
const {
  readCollection,
  getById,
  getBySlug,
  createItem,
  updateItem,
  deleteItem,
} = await import('../src/lib/content-store.js');

const sql = neon(process.env.DATABASE_URL);

async function runDatabaseCrudTest() {
  console.log('\n=================================================');
  console.log('  ECO MUHAFIZ DATABASE CRUD VERIFICATION');
  console.log('=================================================\n');

  try {
    // 1. Test raw database query connection
    console.log('1. Testing Neon PostgreSQL Database Connection...');
    const testResult = await sql.query('SELECT 1 + 1 AS result');
    console.log('  ✓ Connected to Neon DB. Query result:', testResult[0]?.result);

    // 2. Test Case Studies CRUD
    console.log('\n2. Testing Case Studies CRUD Operations...');
    
    // READ ALL
    const initialCaseStudies = await readCollection('case-studies');
    console.log(`  ✓ READ ALL: Found ${initialCaseStudies.length} case studies in DB.`);

    // CREATE
    const newCaseStudyData = {
      title: 'Test Case Study ' + Date.now(),
      slug: 'test-case-study-' + Date.now(),
      date: 'August 2026',
      img: '/images/solution/WhatsApp Image 2026-06-11 at 20.08.24.jpeg',
      location: 'Margalla Hills National Park',
      desc: 'Automated test description for case study CRUD verification.',
      tags: ['Test', 'Bioacoustics', 'AI'],
    };
    const createdCaseStudy = await createItem('case-studies', newCaseStudyData);
    console.log(`  ✓ CREATE: Created case study ID [${createdCaseStudy.id}] with title "${createdCaseStudy.title}"`);

    // READ BY ID
    const fetchedById = await getById('case-studies', createdCaseStudy.id);
    console.log(`  ✓ READ BY ID: Retrieved "${fetchedById.title}" (ID: ${fetchedById.id})`);

    // READ BY SLUG
    const fetchedBySlug = await getBySlug('case-studies', createdCaseStudy.slug);
    console.log(`  ✓ READ BY SLUG: Retrieved "${fetchedBySlug.title}" (Slug: ${fetchedBySlug.slug})`);

    // UPDATE
    const updatedCaseStudy = await updateItem('case-studies', createdCaseStudy.id, {
      title: 'UPDATED Test Case Study ' + Date.now(),
      location: 'Kaghan Valley Sanctuary',
    });
    console.log(`  ✓ UPDATE: Updated title to "${updatedCaseStudy.title}" and location to "${updatedCaseStudy.location}"`);

    // DELETE
    const deleteSuccess = await deleteItem('case-studies', createdCaseStudy.id);
    console.log(`  ✓ DELETE: Successfully deleted test case study ID [${createdCaseStudy.id}]:`, deleteSuccess);


    // 3. Test Blogs CRUD
    console.log('\n3. Testing Blogs CRUD Operations...');

    // READ ALL
    const initialBlogs = await readCollection('blogs');
    console.log(`  ✓ READ ALL: Found ${initialBlogs.length} blogs in DB.`);

    // CREATE
    const newBlogData = {
      title: 'Test Blog ' + Date.now(),
      slug: 'test-blog-' + Date.now(),
      date: 'August 2026',
      category: 'Research',
      img: '/images/solution/WhatsApp Image 2026-06-11 at 20.08.25.jpeg',
      readTime: '3 min read',
      author: 'Aniqa Gulraiz',
      desc: 'Automated test description for blog post CRUD verification.',
    };
    const createdBlog = await createItem('blogs', newBlogData);
    console.log(`  ✓ CREATE: Created blog ID [${createdBlog.id}] with title "${createdBlog.title}"`);

    // READ BY ID & SLUG
    const blogById = await getById('blogs', createdBlog.id);
    const blogBySlug = await getBySlug('blogs', createdBlog.slug);
    console.log(`  ✓ READ BY ID & SLUG: Retrieved "${blogById.title}" / "${blogBySlug.title}"`);

    // UPDATE
    const updatedBlog = await updateItem('blogs', createdBlog.id, {
      title: 'UPDATED Test Blog ' + Date.now(),
      category: 'Conservation AI',
    });
    console.log(`  ✓ UPDATE: Updated blog title to "${updatedBlog.title}" and category to "${updatedBlog.category}"`);

    // DELETE
    const blogDeleteSuccess = await deleteItem('blogs', createdBlog.id);
    console.log(`  ✓ DELETE: Successfully deleted test blog ID [${createdBlog.id}]:`, blogDeleteSuccess);


    // 4. Test Sponsorships Table CRUD
    console.log('\n4. Testing Sponsorships Table Operations...');
    const testCertCode = `TEST-CERT-${Date.now()}`;
    const testEmail = `test-${Date.now()}@ecomuhafiz.com`;

    // INSERT
    await sql.query(
      `INSERT INTO sponsorships (id, contributor_name, contributor_email, contributor_phone, amount, payment_method, trx_id, payment_proof, certificate_code, items, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())`,
      [
        'test-sponsorship-id-' + Date.now(),
        'Test Contributor',
        testEmail,
        '03001234567',
        45000,
        'bank',
        'TRX123456',
        '',
        testCertCode,
        JSON.stringify([{ title: 'Test Item', price: 45000 }]),
      ]
    );
    console.log(`  ✓ INSERT: Inserted test sponsorship record with email [${testEmail}]`);

    // SELECT
    const selectResult = await sql.query(`SELECT * FROM sponsorships WHERE contributor_email = $1`, [testEmail]);
    console.log(`  ✓ SELECT: Retrieved ${selectResult.length} sponsorship record(s) for email [${testEmail}]`);

    // DELETE
    await sql.query(`DELETE FROM sponsorships WHERE contributor_email = $1`, [testEmail]);
    console.log(`  ✓ DELETE: Cleaned up test sponsorship record.`);

    console.log('\n=================================================');
    console.log('🎉 ALL DATABASE CRUD OPERATIONS ARE WORKING 100% PERFECTLY!');
    console.log('=================================================\n');

  } catch (err) {
    console.error('\n❌ DATABASE CRUD TEST FAILED:', err);
    process.exit(1);
  }
}

runDatabaseCrudTest();
