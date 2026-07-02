import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { MENU_CATEGORIES, MENU_ITEMS } from '../features/menu/lib/menu-data';
import { GALLERY_CATEGORIES, GALLERY_IMAGES } from '../features/gallery/lib/gallery-data';
import { REVIEWS } from '../features/reviews/lib/reviews-data';

const prisma = new PrismaClient();

const GALLERY_SLUG_MAP: Record<string, string> = {
  interior: 'INTERIOR',
  food: 'FOOD',
  banquet: 'BANQUET',
  atmosphere: 'ATMOSPHERE'
};

async function main() {
  console.log('Сидирование меню…');
  for (const [index, category] of MENU_CATEGORIES.entries()) {
    await prisma.menuCategory.upsert({
      where: { slug: category.slug },
      update: { title: category.title, description: category.description, sortOrder: index },
      create: { ...category, sortOrder: index }
    });
  }

  for (const item of MENU_ITEMS) {
    const category = await prisma.menuCategory.findUniqueOrThrow({
      where: { slug: item.categorySlug }
    });

    await prisma.menuItem.upsert({
      where: { id: item.id },
      update: {
        name: item.name,
        description: item.description,
        price: item.price,
        weightGrams: item.weightGrams,
        image: item.image,
        spiceLevel: item.spiceLevel,
        tags: item.tags ?? [],
        allergens: item.allergens ?? [],
        categoryId: category.id
      },
      create: {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        weightGrams: item.weightGrams,
        image: item.image,
        spiceLevel: item.spiceLevel,
        tags: item.tags ?? [],
        allergens: item.allergens ?? [],
        categoryId: category.id
      }
    });
  }

  console.log('Сидирование галереи…');
  await prisma.galleryImage.deleteMany();
  await prisma.galleryImage.createMany({
    data: GALLERY_IMAGES.map((img, index) => ({
      categorySlug: GALLERY_SLUG_MAP[img.categorySlug] as never,
      src: img.src,
      alt: img.alt,
      orientation: img.orientation,
      sortOrder: index
    }))
  });

  console.log('Сидирование отзывов…');
  await prisma.review.deleteMany();
  await prisma.review.createMany({
    data: REVIEWS.map((r) => ({
      author: r.author,
      rating: r.rating,
      text: r.text,
      date: r.date,
      source: r.source
    }))
  });

  console.log('Сидирование админ-пользователя…');
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? 'admin@shafranoff.ru';
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? 'shafranoff2026';
  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash: await bcrypt.hash(adminPassword, 10),
      name: 'Администратор',
      role: 'admin'
    }
  });
  console.log(`  Логин: ${adminEmail} / Пароль: ${adminPassword} (смените после первого входа)`);

  console.log(
    `Готово: ${MENU_CATEGORIES.length} категорий, ${MENU_ITEMS.length} блюд, ` +
      `${GALLERY_IMAGES.length} фото, ${REVIEWS.length} отзывов.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
