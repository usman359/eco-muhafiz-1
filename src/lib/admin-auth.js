export const ADMIN_COOKIE = 'eco_admin_session';

export async function getExpectedSessionToken() {
  const password = process.env.ADMIN_PASSWORD || 'change-me';
  const data = new TextEncoder().encode(`eco-muhafiz-admin:${password}`);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function isValidSessionToken(token) {
  if (!token) return false;
  const expected = await getExpectedSessionToken();
  return token === expected;
}

export function verifyPassword(password) {
  const expected = process.env.ADMIN_PASSWORD || 'change-me';
  return typeof password === 'string' && password === expected;
}
