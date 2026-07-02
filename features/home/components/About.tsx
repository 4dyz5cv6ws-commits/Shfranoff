import { Container } from '@/shared/ui/Container';
import { SaffronThreadDivider } from '@/shared/ui/SaffronThread';

export function About() {
  return (
    <section className="py-24 md:py-32">
      <Container className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-center">
        <div>
          <p className="eyebrow mb-5">О ресторане</p>
          <h2 className="font-display text-3xl leading-tight text-cream sm:text-4xl">
            Забайкалье встречает Восток —
            <br />в центре Читы
          </h2>
          <p className="mt-6 max-w-md text-muted">
            «Шафраноф» — это открытая кухня, мангал во всю стену и специи,
            которые мы обжариваем сами перед подачей. Локальная дичь и рыба
            Забайкалья, восточные пряности и восемь лет опыта в одном зале
            на 60 гостей.
          </p>
          <SaffronThreadDivider className="mt-8 h-3 w-40" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <StatCard value="60" label="мест в зале" />
          <StatCard value="8" label="лет в Чите" />
          <StatCard value="120+" label="блюд в меню" />
          <StatCard value="4.9" label="рейтинг гостей" />
        </div>
      </Container>
    </section>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-6">
      <div className="font-display text-3xl text-saffron">{value}</div>
      <div className="mt-1 text-sm text-muted">{label}</div>
    </div>
  );
}
