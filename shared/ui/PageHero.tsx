import { Container } from '@/shared/ui/Container';

export function PageHero({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="pb-4 pt-32 md:pt-40">
      <Container>
        <p className="eyebrow mb-4">{eyebrow}</p>
        <h1 className="max-w-2xl font-display text-4xl leading-tight text-cream sm:text-5xl">
          {title}
        </h1>
      </Container>
    </div>
  );
}
