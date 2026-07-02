import { prisma } from '@/shared/lib/prisma';
import { Review } from '../types';

export interface ReviewsData {
  reviews: Review[];
  averageRating: number;
  count: number;
}

export async function getReviews(): Promise<ReviewsData> {
  const rows = await prisma.review.findMany({ orderBy: { date: 'desc' } });

  const count = rows.length;
  const averageRating = count
    ? Math.round((rows.reduce((sum, r) => sum + r.rating, 0) / count) * 10) / 10
    : 0;

  const reviews: Review[] = rows.map((r) => ({
    id: r.id,
    author: r.author,
    rating: r.rating as Review['rating'],
    text: r.text,
    date: r.date,
    source: r.source as Review['source']
  }));

  return { reviews, averageRating, count };
}

