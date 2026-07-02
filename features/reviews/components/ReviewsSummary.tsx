import { RatingStars } from './RatingStars';
import { SaffronThreadDivider } from '@/shared/ui/SaffronThread';

export function ReviewsSummary({ averageRating, count }: { averageRating: number; count: number }) {
  return (
    <div className="mb-14 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
      <div className="font-display text-5xl text-cream">{averageRating}</div>
      <div>
        <RatingStars rating={Math.round(averageRating)} size={18} />
        <p className="mt-1 text-sm text-muted">{count} отзывов на Яндекс Картах, Google и 2ГИС</p>
      </div>
      <SaffronThreadDivider className="hidden h-3 w-24 sm:ml-auto sm:block" />
    </div>
  );
}
