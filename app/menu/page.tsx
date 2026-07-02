import type { Metadata } from 'next';
import { Header } from '@/shared/layout/Header';
import { Footer } from '@/shared/layout/Footer';
import { Container } from '@/shared/ui/Container';
import { PageHero } from '@/shared/ui/PageHero';
import { getMenu } from '@/features/menu/lib/get-menu';
import { MenuExplorer } from '@/features/menu/components/MenuExplorer';

export const metadata: Metadata = {
  title: 'Меню',
  description:
    'Меню ресторана «Шафраноф» в Чите: блюда на углях, плов с шафраном, байкальский омуль, супы и десерты. Цены, вес порций, острота.'
};

// Данные меню меняются нечасто — обновляем раз в час без полного редеплоя
export const revalidate = 3600;

export default async function MenuPage() {
  const { categories, items } = await getMenu();

  return (
    <main>
      <Header />
      <PageHero eyebrow="Меню" title="120+ блюд. Готовим на живом огне каждый день" />
      <Container>
        <MenuExplorer categories={categories} items={items} />
      </Container>
      <Footer />
    </main>
  );
}
