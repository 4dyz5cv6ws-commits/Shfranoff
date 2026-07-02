import { prisma } from '@/shared/lib/prisma';
import { AddMenuItemForm } from '@/features/menu/components/admin/AddMenuItemForm';
import { AvailabilityToggle } from '@/features/menu/components/admin/AvailabilityToggle';
import { PriceInlineEdit } from '@/features/menu/components/admin/PriceInlineEdit';
import { DeleteMenuItemButton } from '@/features/menu/components/admin/DeleteMenuItemButton';

export default async function AdminMenuPage() {
  const categories = await prisma.menuCategory.findMany({
    orderBy: { sortOrder: 'asc' },
    include: { items: { orderBy: { name: 'asc' } } }
  });

  return (
    <div>
      <h1 className="font-display text-2xl text-cream">Меню</h1>
      <p className="mt-1 text-sm text-muted">
        {categories.reduce((sum, c) => sum + c.items.length, 0)} блюд в {categories.length} категориях
      </p>

      <div className="mt-6">
        <AddMenuItemForm categories={categories.map((c) => ({ id: c.id, title: c.title }))} />
      </div>

      <div className="space-y-8">
        {categories.map((category) => (
          <div key={category.id}>
            <h2 className="mb-3 font-display text-lg text-cream">{category.title}</h2>
            <div className="overflow-x-auto rounded-2xl border border-line">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-surface text-xs uppercase tracking-wide text-muted">
                  <tr>
                    <th className="px-4 py-3">Название</th>
                    <th className="px-4 py-3">Цена</th>
                    <th className="px-4 py-3">Вес</th>
                    <th className="px-4 py-3">Доступно</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {category.items.map((item) => (
                    <tr key={item.id} className="border-t border-line">
                      <td className="px-4 py-3 text-cream/80">{item.name}</td>
                      <td className="px-4 py-3">
                        <PriceInlineEdit itemId={item.id} price={item.price} />
                      </td>
                      <td className="px-4 py-3 text-muted">{item.weightGrams} г</td>
                      <td className="px-4 py-3">
                        <AvailabilityToggle itemId={item.id} isAvailable={item.isAvailable} />
                      </td>
                      <td className="px-4 py-3">
                        <DeleteMenuItemButton itemId={item.id} name={item.name} />
                      </td>
                    </tr>
                  ))}
                  {category.items.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-6 text-center text-muted">
                        В категории пока нет блюд
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
