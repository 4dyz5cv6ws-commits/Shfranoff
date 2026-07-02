export type GalleryCategorySlug = 'interior' | 'food' | 'banquet' | 'atmosphere';

export interface GalleryCategory {
  slug: GalleryCategorySlug;
  title: string;
}

export interface GalleryImage {
  id: string;
  categorySlug: GalleryCategorySlug;
  src: string;
  alt: string;
  orientation: 'portrait' | 'landscape';
}
