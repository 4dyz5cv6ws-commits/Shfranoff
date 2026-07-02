'use client';

import { useState } from 'react';
import { Review } from '../types';
import { RatingStars } from './RatingStars';

export function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > 160;

  return (
    <article className="rounded-2xl border border-line bg-surface p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface2 font-display text-sm text-saffron">
            {initials(review.author)}
          </div>
          <div>
            <div className="text-sm text-cream">{review.author}</div>
            <div className="text-xs text-muted">{formatDateRu(review.date)} · {review.source}</div>
          </div>
        </div>
        <RatingStars rating={review.rating} />
      </div>

      <p className={`mt-4 text-sm text-cream/80 ${!expanded && isLong ? 'line-clamp-3' : ''}`}>
        {review.text}
      </p>

      {isLong && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 text-xs text-saffron hover:underline"
        >
          {expanded ? 'Свернуть' : 'Читать полностью'}
        </button>
      )}
    </article>
  );
}

function initials(name: string): string {
  return name.slice(0, 1).toUpperCase();
}

function formatDateRu(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
}
