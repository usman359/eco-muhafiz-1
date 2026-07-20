'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', exact: true },
  { href: '/admin/blogs', label: 'Blogs' },
  { href: '/admin/case-studies', label: 'Case Studies' },
];

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === '/admin/login';

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="admin-brand-mark">EM</span>
          <div>
            <strong>Eco Muhafiz</strong>
            <small>Content Admin</small>
          </div>
        </div>
        <nav className="admin-nav">
          {navItems.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-nav-link${active ? ' active' : ''}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Button
          type="button"
          variant="outline"
          className="admin-logout"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <span>Manage site content</span>
          <Button asChild variant="link">
            <Link href="/">View site</Link>
          </Button>
        </header>
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
