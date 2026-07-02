import { prisma } from '@/shared/lib/prisma';
import { BanquetStatusSelect } from '@/features/banquet/components/admin/BanquetStatusSelect';

const EVENT_LABELS: Record<string, string> = {
  BIRTHDAY: 'День рождения',
  CORPORATE: 'Корпоратив',
  WEDDING: 'Свадьба',
  ANNIVERSARY: 'Юбилей',
  OTHER: 'Другое'
};

export default async function AdminBanquetsPage() {
  const requests = await prisma.banquetRequest.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50
  });

  return (
    <div>
      <h1 className="font-display text-2xl text-cream">Банкетные заявки</h1>
      <p className="mt-1 text-sm text-muted">Последние 50 заявок</p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="bg-surface text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3">Мероприятие</th>
              <th className="px-4 py-3">Дата</th>
              <th className="px-4 py-3">Гостей</th>
              <th className="px-4 py-3">Клиент</th>
              <th className="px-4 py-3">Статус</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id} className="border-t border-line">
                <td className="px-4 py-3 text-cream/80">{EVENT_LABELS[r.eventType]}</td>
                <td className="px-4 py-3 text-cream/80">{formatDateRu(r.date)}</td>
                <td className="px-4 py-3 text-cream/80">{r.guests}</td>
                <td className="px-4 py-3 text-cream/80">
                  {r.customerName}
                  <div className="text-xs text-muted">{r.phone}</div>
                </td>
                <td className="px-4 py-3">
                  <BanquetStatusSelect requestId={r.id} status={r.status} />
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted">
                  Заявок пока нет
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function formatDateRu(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
}
