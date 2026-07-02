import { GalleryCategory, GalleryImage } from '../types';

// GALLERY_CATEGORIES — фиксированный справочник, используется и в рантайме, и для сидирования.
// GALLERY_IMAGES — используется только для сидирования БД (prisma/seed.ts).

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  { slug: 'interior', title: 'Интерьер' },
  { slug: 'food', title: 'Блюда' },
  { slug: 'banquet', title: 'Банкеты' },
  { slug: 'atmosphere', title: 'Атмосфера' }
];

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 'g1', categorySlug: 'interior', src: '/images/gallery/interior-1.jpg', alt: 'Основной зал ресторана Шафраноф', orientation: 'landscape' },
  { id: 'g2', categorySlug: 'interior', src: '/images/gallery/interior-2.jpg', alt: 'Мангальная зона у открытой кухни', orientation: 'portrait' },
  { id: 'g3', categorySlug: 'interior', src: '/images/gallery/interior-3.jpg', alt: 'Барная стойка', orientation: 'portrait' },
  { id: 'g4', categorySlug: 'food', src: '/images/gallery/food-1.jpg', alt: 'Подача баранины на углях', orientation: 'portrait' },
  { id: 'g5', categorySlug: 'food', src: '/images/gallery/food-2.jpg', alt: 'Плов с айвой крупным планом', orientation: 'landscape' },
  { id: 'g6', categorySlug: 'food', src: '/images/gallery/food-3.jpg', alt: 'Сервировка стола', orientation: 'portrait' },
  { id: 'g7', categorySlug: 'food', src: '/images/gallery/food-4.jpg', alt: 'Десерты на подносе', orientation: 'landscape' },
  { id: 'g8', categorySlug: 'banquet', src: '/images/gallery/banquet-1.jpg', alt: 'Банкетный зал, сервировка на праздник', orientation: 'landscape' },
  { id: 'g9', categorySlug: 'banquet', src: '/images/gallery/banquet-2.jpg', alt: 'Банкет — вид сверху на накрытые столы', orientation: 'portrait' },
  { id: 'g10', categorySlug: 'atmosphere', src: '/images/gallery/atmosphere-1.jpg', alt: 'Вечерний свет в зале', orientation: 'portrait' },
  { id: 'g11', categorySlug: 'atmosphere', src: '/images/gallery/atmosphere-2.jpg', alt: 'Живой огонь мангала', orientation: 'landscape' },
  { id: 'g12', categorySlug: 'atmosphere', src: '/images/gallery/atmosphere-3.jpg', alt: 'Гости за ужином', orientation: 'portrait' }
];
