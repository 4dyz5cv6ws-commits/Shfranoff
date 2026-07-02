import { prisma } from '@/shared/lib/prisma';
import { getOrSetCache } from '@/shared/lib/redis';
import { MenuCategory, MenuItem, SpiceLevel } from '../types';

export interface MenuData {
  categories: MenuCategory[];
  items: MenuItem[];
}

const CACHE_KEY = 'menu:v1';
const CACHE_TTL_SECONDS = 300; // 5 минут — меню меняется нечасто, но не статично

/**
 * Источник данных меню. Читает из Postgres через Prisma, результат кэшируется
 * в Redis по паттерну cache-aside. При изменении меню в админке нужно вызвать
 * invalidateCache('menu:v1'), иначе кэш обновится сам по истечении TTL.
 */
export async function getMenu(): Promise<MenuData> {
  return getOrSetCache(CACHE_KEY, CACHE_TTL_SECONDS, async () => {
    const categories = await prisma.menuCategory.findMany({
      orderBy: { sortOrder: 'asc' }
    });

    const items = await prisma.menuItem.findMany({
      where: { isAvailable: true },
      include: { category: true },
      orderBy: { name: 'asc' }
    });

    return {
      categories: categories.map((c) => ({
        slug: c.slug as MenuCategory['slug'],
        title: c.title,
        description: c.description
      })),
      items: items.map((item) => ({
        id: item.id,
        categorySlug: item.category.slug as MenuItem['categorySlug'],
        name: item.name,
        description: item.description,
        price: item.price,
        weightGrams: item.weightGrams,
        image: item.image,
        spiceLevel: item.spiceLevel as SpiceLevel,
        tags: item.tags as MenuItem['tags'],
        allergens: item.allergens
      }))
    };
  });
}

