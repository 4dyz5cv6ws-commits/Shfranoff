import { getCurrentAdmin } from '@/features/auth/lib/session';
import { AdminSidebar } from '@/shared/layout/AdminSidebar';

export const metadata = {
  robots: { index: false, follow: false }
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-bg sm:flex-row">
      <AdminSidebar admin={admin} />
      <main className="flex-1 overflow-y-auto p-6 sm:p-10">{children}</main>
    </div>
  );
}
