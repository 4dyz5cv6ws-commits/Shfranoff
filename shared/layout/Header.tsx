import Link from 'next/link';
import { Container } from '@/shared/ui/Container';
import { ButtonLink } from '@/shared/ui/Button';
import { CartButton } from '@/features/cart/components/CartButton';

const NAV = [
  { href: '/menu', label: 'Меню' },
  { href: '/banquet', label: 'Банкеты' },
  { href: '/gallery', label: 'Галерея' },
  { href: '/reviews', label: 'Отзывы' }
];

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <Container className="flex items-center justify-between py-6">
        <Link href="/" className="font-display text-xl tracking-wide text-cream">
          Шафраноф
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-cream/80 transition-colors hover:text-saffron"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <CartButton />
          <ButtonLink
            href="/booking"
            variant="ghost"
            className="hidden !px-5 !py-2 text-xs sm:inline-flex md:!px-6 md:!py-3 md:text-sm"
          >
            Забронировать стол
          </ButtonLink>
        </div>
      </Container>
    </header>
  );
}
