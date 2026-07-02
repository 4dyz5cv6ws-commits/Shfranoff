import type { Metadata } from 'next';
import { Header } from '@/shared/layout/Header';
import { Footer } from '@/shared/layout/Footer';
import { Container } from '@/shared/ui/Container';
import { PageHero } from '@/shared/ui/PageHero';
import { getGallery } from '@/features/gallery/lib/get-gallery';
import { GalleryExplorer } from '@/features/gallery/components/GalleryExplorer';

export const metadata: Metadata = {
  title: 'Галерея',
  description: 'Интерьер, блюда и атмосфера ресторана «Шафраноф» в Чите — фотогалерея.'
};

export const revalidate = 3600;

export default async function GalleryPage() {
  const { categories, images } = await getGallery();

  return (
    <main>
      <Header />
      <PageHero eyebrow="Галерея" title="Атмосфера, которую хочется вернуть" />
      <Container className="pb-24">
        <GalleryExplorer categories={categories} images={images} />
      </Container>
      <Footer />
    </main>
  );
}
