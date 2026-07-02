import Image from 'next/image';
import { Container } from '@/shared/ui/Container';

export function BanquetHallBanner() {
  return (
    <div className="relative mb-16 overflow-hidden">
      <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
        <Image
          src="/images/banquet-hall.jpg"
          alt="Банкетный зал ресторана Шафраноф"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-transparent" />
      </div>

      <Container className="mt-8 grid grid-cols-3 gap-4 sm:max-w-md">
        <Stat value="80" label="мест в зале" />
        <Stat value="24 ч" label="ответ менеджера" />
        <Stat value="12–200" label="гостей на банкет" />
      </Container>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-2xl text-saffron">{value}</div>
      <div className="mt-1 text-xs text-muted">{label}</div>
    </div>
  );
}
