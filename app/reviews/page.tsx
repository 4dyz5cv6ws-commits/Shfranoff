import type { Metadata } from 'next';
import { Header } from '@/shared/layout/Header';
import { Footer } from '@/shared/layout/Footer';
import { Container } from '@/shared/ui/Container';
import { PageHero } from '@/shared/ui/PageHero';
import { getReviews } from '@/features/reviews/lib/get-reviews';
import { ReviewsSummary } from '@/features/reviews/components/ReviewsSummary';
import { ReviewCard } from '@/features/reviews/components/ReviewCard';

export const metadata: Metadata = {
  title: 'Отзывы',
  description: 'Отзывы гостей ресторана «Шафраноф» в Чите — Яндекс Карты, Google, 2ГИС.'
};

export const revalidate = 3600;

export default async function ReviewsPage() {
  const { reviews, averageRating, count } = await getReviews();

  return (
    <main>
      <Header />
      <PageHero eyebrow="Отзывы" title="Что говорят гости" />
      <Container className="pb-24">
        <ReviewsSummary averageRating={averageRating} count={count} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </Container>
      <Footer />
    </main>
  );
}
