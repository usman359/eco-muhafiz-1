import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { sql } from '@/lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, amount, paymentMethod, trxId, paymentProof, items } = body;

    if (!name || !email || !amount) {
      return NextResponse.json(
        { error: 'Name, email, and amount are required.' },
        { status: 400 }
      );
    }

    const id = randomUUID();
    const certCode = `EM-CERT-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      await sql.query(
        `INSERT INTO sponsorships (id, contributor_name, contributor_email, contributor_phone, amount, payment_method, trx_id, payment_proof, items, certificate_code)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          id,
          name,
          email.toLowerCase().trim(),
          phone || '',
          amount,
          paymentMethod || 'easypaisa',
          trxId || '',
          paymentProof || '',
          JSON.stringify(items || []),
          certCode,
        ]
      );
    } catch (dbErr) {
      console.warn('DB insert fallback:', dbErr.message);
    }

    return NextResponse.json({
      success: true,
      sponsorship: {
        id,
        contributorName: name,
        contributorEmail: email,
        amount,
        paymentMethod,
        trxId,
        certificateCode: certCode,
        date: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Sponsorship API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email parameter required.' }, { status: 400 });
    }

    try {
      const rows = await sql.query(
        `SELECT * FROM sponsorships WHERE LOWER(contributor_email) = $1 ORDER BY created_at DESC`,
        [email.toLowerCase().trim()]
      );

      const sponsorships = rows.map((r) => ({
        id: r.id,
        contributorName: r.contributor_name,
        contributorEmail: r.contributor_email,
        contributorPhone: r.contributor_phone,
        amount: r.amount,
        paymentMethod: r.payment_method,
        trxId: r.trx_id,
        paymentProof: r.payment_proof,
        items: r.items,
        certificateCode: r.certificate_code,
        createdAt: r.created_at,
      }));

      return NextResponse.json({ sponsorships });
    } catch (dbErr) {
      console.warn('DB query error:', dbErr.message);
      return NextResponse.json({ sponsorships: [] });
    }
  } catch (error) {
    console.error('Fetch sponsorships error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
