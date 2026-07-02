import { prisma } from '@/shared/lib/prisma';
import { GALLERY_CATEGORIES } from './gallery-data';
import { GalleryCategory, GalleryImage, GalleryCategorySlug } from '../types';

export interface GalleryData {
  categories: GalleryCategory[];
  images: GalleryImage[];
}

const SLUG_TO_PRISMA: Record<GalleryCategorySlug, string> = {
  interior: 'INTERIOR',
  food: 'FOOD',
  banquet: 'BANQUET',
  atmosphere: 'ATMOSPHERE'
};
const PRISMA_TO_SLUG = Object.fromEntries(
  Object.entries(SLUG_TO_PRISMA).map(([slug, prismaValue]) => [prismaValue, slug])
) as Record<string, GalleryCategorySlug>;

export async function getGallery(): Promise<GalleryData> {
  const images = await prisma.galleryImage.findMany({ orderBy: { sortOrder: 'asc' } });

  return {
    categories: GALLERY_CATEGORIES, // фиксированный список категорий, не хранится отдельной таблицей
    images: images.map((img) => ({
      id: img.id,
      categorySlug: PRISMA_TO_SLUG[img.categorySlug],
      src: img.src,
      alt: img.alt,
      orientation: img.orientation as GalleryImage['orientation']
    }))
  };
}

