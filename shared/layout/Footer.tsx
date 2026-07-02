import Link from 'next/link';
import { Container } from '@/shared/ui/Container';

export function Footer() {
  return (
    <footer className="py-16">
      <Container className="flex flex-col gap-10 md:flex-row md:justify-between">
        <div>
          <div className="font-display text-xl text-cream">Шафраноф</div>
          <p className="mt-3 max-w-xs text-sm text-muted">
            г. Чита, ул. Ленина, 62
            <br />
            Ежедневно, 12:00 — 00:00
          </p>
        </div>

        <div className="flex gap-16">
          <div>
            <p className="eyebrow mb-4">Ресторан</p>
            <ul className="space-y-2 text-sm text-cream/80">
              <li><Link href="/menu" className="hover:text-saffron">Меню</Link></li>
              <li><Link href="/booking" className="hover:text-saffron">Бронирование</Link></li>
              <li><Link href="/banquet" className="hover:text-saffron">Банкеты</Link></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4">Контакты</p>
            <ul className="space-y-2 text-sm text-cream/80">
              <li><a href="tel:+79141234567" className="hover:text-saffron">+7 914 123-45-67</a></li>
              <li><a href="mailto:info@shafranoff.ru" className="hover:text-saffron">info@shafranoff.ru</a></li>
            </ul>
          </div>
        </div>
      </Container>

      <Container className="mt-12 border-t border-line pt-6 text-xs text-muted">
        © {new Date().getFullYear()} Шафраноф, Чита
      </Container>
    </footer>
  );
}
