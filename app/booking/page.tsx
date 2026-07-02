import type { Metadata } from 'next';
import { Header } from '@/shared/layout/Header';
import { Footer } from '@/shared/layout/Footer';
import { Container } from '@/shared/ui/Container';
import { PageHero } from '@/shared/ui/PageHero';
import { BookingForm } from '@/features/booking/components/BookingForm';

export const metadata: Metadata = {
  title: 'Бронирование стола',
  description:
    'Забронируйте стол в ресторане «Шафраноф» в Чите онлайн — выберите дату, время и число гостей.'
};

export default function BookingPage() {
  return (
    <main>
      <Header />
      <PageHero eyebrow="Бронирование" title="Стол у мангала за минуту" />
      <Container className="pb-24">
        <BookingForm />
      </Container>
      <Footer />
    </main>
  );
}
