import type { Metadata } from 'next';
import { Header } from '@/shared/layout/Header';
import { Footer } from '@/shared/layout/Footer';
import { Container } from '@/shared/ui/Container';
import { PageHero } from '@/shared/ui/PageHero';
import { BanquetHallBanner } from '@/features/banquet/components/BanquetHallBanner';
import { BanquetForm } from '@/features/banquet/components/BanquetForm';

export const metadata: Metadata = {
  title: 'Банкеты',
  description:
    'Банкетный зал ресторана «Шафраноф» в Чите: дни рождения, корпоративы, свадьбы на 12–200 гостей. Оставьте заявку — менеджер свяжется в течение дня.'
};

export default function BanquetPage() {
  return (
    <main>
      <Header />
      <PageHero eyebrow="Банкеты" title="Ваш праздник в банкетном зале Шафраноф" />
      <BanquetHallBanner />
      <Container className="pb-24">
        <BanquetForm />
      </Container>
      <Footer />
    </main>
  );
}
