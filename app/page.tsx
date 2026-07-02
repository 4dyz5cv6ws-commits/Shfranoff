import { Header } from '@/shared/layout/Header';
import { Hero } from '@/features/home/components/Hero';
import { About } from '@/features/home/components/About';
import { MenuTeaser } from '@/features/home/components/MenuTeaser';
import { BookingCta } from '@/features/home/components/BookingCta';
import { Footer } from '@/shared/layout/Footer';

export default function HomePage() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <About />
      <MenuTeaser />
      <BookingCta />
      <Footer />
    </main>
  );
}
