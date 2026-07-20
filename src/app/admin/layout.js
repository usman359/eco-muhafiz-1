import '../../css/admin.css';
import '../../css/ui.css';
import AdminShell from '@/components/admin/AdminShell';

export const metadata = {
  title: 'Admin | Eco Muhafiz',
  description: 'Content admin for blogs and case studies',
};

export default function AdminLayout({ children }) {
  return <AdminShell>{children}</AdminShell>;
}
