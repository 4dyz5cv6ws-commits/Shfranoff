import { Container } from '@/shared/ui/Container';
import { ButtonLink } from '@/shared/ui/Button';
import { SaffronThreadDivider } from '@/shared/ui/SaffronThread';

export function BookingCta() {
  return (
    <section className="border-y border-line bg-surface py-24 md:py-32">
      <Container className="flex flex-col items-center text-center">
        <p className="eyebrow mb-5">Стол на вечер</p>
        <h2 className="max-w-xl font-display text-3xl leading-tight text-cream sm:text-4xl">
          Столик у мангала бронируют за неделю.
          <br />
          Не откладывайте.
        </h2>
        <SaffronThreadDivider className="my-8 h-3 w-40" />
        <ButtonLink href="/booking">Забронировать стол</ButtonLink>
      </Container>
    </section>
  );
}
