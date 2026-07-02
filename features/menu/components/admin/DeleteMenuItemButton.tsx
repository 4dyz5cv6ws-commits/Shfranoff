'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

export function DeleteMenuItemButton({ itemId, name }: { itemId: string; name: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDelete = async () => {
    if (!confirm(`Удалить «${name}» из меню?`)) return;
    setLoading(true);
    setError(null);

    const res = await fetch(`/api/admin/menu/items/${itemId}`, { method: 'DELETE' });
    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? 'Не удалось удалить');
      return;
    }

    router.refresh();
  };

  return (
    <div className="flex items-center justify-end gap-2">
      {error && <span className="text-[11px] text-ember">{error}</span>}
      <button
        onClick={onDelete}
        disabled={loading}
        aria-label={`Удалить ${name}`}
        className="text-muted hover:text-ember disabled:opacity-50"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
