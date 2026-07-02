import Link from 'next/link';
import { LayoutDashboard, ShoppingBag, UtensilsCrossed, CalendarCheck, PartyPopper, BarChart3 } from 'lucide-react';
import { LogoutButton } from '@/features/auth/components/LogoutButton';
import { AdminTokenPayload } from '@/features/auth/lib/jwt';

const NAV = [
  { href: '/admin', label: 'Обзор', icon: LayoutDashboard },
  { href: '/admin/orders', label: 'Заказы', icon: ShoppingBag },
  { href: '/admin/menu', label: 'Меню', icon: UtensilsCrossed },
  { href: '/admin/bookings', label: 'Брони', icon: CalendarCheck },
  { href: '/admin/banquets', label: 'Банкеты', icon: PartyPopper },
  { href: '/admin/analytics', label: 'Аналитика', icon: BarChart3 }
];

export function AdminSidebar({ admin }: { admin: AdminTokenPayload }) {
  return (
    <aside className="flex w-full shrink-0 flex-col border-line bg-surface px-5 py-6 sm:h-screen sm:w-60 sm:border-r">
      <div className="mb-8">
        <div className="font-display text-lg text-cream">Шафраноф</div>
        <p className="text-xs text-muted">Панель управления</p>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {NAV.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-cream/80 transition-colors hover:bg-surface2 hover:text-saffron"
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>

      <div className="mt-8 border-t border-line pt-5">
        <p className="mb-3 text-xs text-muted">{admin.name}</p>
        <LogoutButton />
      </div>
    </aside>
  );
}
