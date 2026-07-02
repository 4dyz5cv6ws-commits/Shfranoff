'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { GalleryData } from '../lib/get-gallery';
import { GalleryCategorySlug } from '../types';
import { Lightbox } from './Lightbox';

const DIMENSIONS = {
  portrait: { width: 800, height: 1000 },
  landscape: { width: 1000, height: 640 }
};

export function GalleryExplorer({ categories, images }: GalleryData) {
  const [active, setActive] = useState<GalleryCategorySlug | 'all'>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (active === 'all' ? images : images.filter((img) => img.categorySlug === active)),
    [active, images]
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        <Pill label="Всё" isActive={active === 'all'} onClick={() => setActive('all')} />
        {categories.map((category) => (
          <Pill
            key={category.slug}
            label={category.title}
            isActive={active === category.slug}
            onClick={() => setActive(category.slug)}
          />
        ))}
      </div>

      <div className="columns-2 gap-3 sm:columns-3 lg:columns-4">
        {filtered.map((image, i) => (
          <button
            key={image.id}
            onClick={() => setOpenIndex(i)}
            className="group mb-3 block w-full overflow-hidden rounded-2xl border border-line"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={DIMENSIONS[image.orientation].width}
              height={DIMENSIONS[image.orientation].height}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      <Lightbox
        images={filtered}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </div>
  );
}

function Pill({
  label,
  isActive,
  onClick
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm transition-colors ${
        isActive
          ? 'border-saffron bg-saffron text-bg'
          : 'border-line text-cream/80 hover:border-saffron/50 hover:text-saffron'
      }`}
    >
      {label}
    </button>
  );
}
