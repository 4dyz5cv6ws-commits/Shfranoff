import type { Metadata } from 'next';
import { Header } from '@/shared/layout/Header';
import { Footer } from '@/shared/layout/Footer';
import { Container } from '@/shared/ui/Container';
import { PageHero } from '@/shared/ui/PageHero';
import { CheckoutForm } from '@/features/orders/components/CheckoutForm';

export const metadata: Metadata = {
  title: 'Оформление заказа',
  robots: { index: false, follow: false }
};

export default function CheckoutPage() {
  return (
    <main>
      <Header />
      <PageHero eyebrow="Оформление заказа" title="Осталось подтвердить детали" />
      <Container className="pb-24">
        <CheckoutForm />
      </Container>
      <Footer />
    </main>
  );
}
