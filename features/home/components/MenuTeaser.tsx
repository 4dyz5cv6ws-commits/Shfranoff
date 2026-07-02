import Image from 'next/image';
import { Container } from '@/shared/ui/Container';
import { ButtonLink } from '@/shared/ui/Button';

const DISHES = [
  {
    name: 'Баранина на углях с шафраном',
    price: '890 ₽',
    image: '/images/dish-lamb.jpg'
  },
  {
    name: 'Плов с айвой и барбарисом',
    price: '540 ₽',
    image: '/images/dish-plov.jpg'
  },
  {
    name: 'Омуль холодного копчения',
    price: '620 ₽',
    image: '/images/dish-omul.jpg'
  }
];

export function MenuTeaser() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-5">Меню</p>
            <h2 className="font-display text-3xl leading-tight text-cream sm:text-4xl">
              Три блюда, ради которых
              <br />возвращаются
            </h2>
          </div>
          <ButtonLink href="/menu" variant="ghost">
            Всё меню
          </ButtonLink>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DISHES.map((dish) => (
            <article
              key={dish.name}
              className="group overflow-hidden rounded-2xl border border-line bg-surface"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between p-5">
                <h3 className="font-display text-lg text-cream">{dish.name}</h3>
                <span className="shrink-0 pl-4 text-saffron">{dish.price}</span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
