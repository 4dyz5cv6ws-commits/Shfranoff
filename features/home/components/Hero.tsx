'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from '@/shared/ui/Container';
import { ButtonLink } from '@/shared/ui/Button';
import { SaffronThreadHero } from '@/shared/ui/SaffronThread';

export function Hero() {
  return (
    <section className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-poster.jpg"
      >
        <source src="/videos/hero-shafran.mp4" type="video/mp4" />
      </video>

      {/* сумеречный тёплый оверлей + виньетка снизу для читаемости текста */}
      <div className="absolute inset-0 bg-bg/35" />
      <div className="absolute inset-0 bg-scrim-bottom" />

      <Container className="relative z-10 pb-16 md:pb-24">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="eyebrow mb-5"
        >
          Чита · Кухня на открытом огне · С 2014 года
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-3xl font-display text-4xl leading-[1.05] text-cream sm:text-5xl md:text-6xl"
        >
          Шафран рождается медленно.
          <br />
          Мы готовим так же.
        </motion.h1>

        <SaffronThreadHero className="mt-7 h-4 w-56 sm:w-72" />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 max-w-md text-base text-muted"
        >
          Авторская кухня Читы: живой огонь, редкие специи и продукты
          Забайкалья на одной тарелке.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <ButtonLink href="/menu">Смотреть меню</ButtonLink>
          <Link
            href="/booking"
            className="text-sm text-cream/80 underline decoration-saffron/40 underline-offset-4 transition-colors hover:text-saffron"
          >
            Забронировать стол →
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
