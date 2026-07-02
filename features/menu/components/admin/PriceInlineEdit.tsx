'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function PriceInlineEdit({ itemId, price }: { itemId: string; price: number }) {
  const router = useRouter();
  const [value, setValue] = useState(price);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const save = async () => {
    setEditing(false);
    if (!value || value === price) {
      setValue(price);
      return;
    }

    setLoading(true);
    const res = await fetch(`/api/admin/menu/items/${itemId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price: value })
    });
    setLoading(false);

    if (res.ok) {
      router.refresh();
    } else {
      setValue(price);
    }
  };

  if (!editing) {
    return (
      <button
        onClick={() => setEditing(true)}
        disabled={loading}
        className="text-saffron hover:underline disabled:opacity-50"
      >
        {loading ? '…' : `${value} ₽`}
      </button>
    );
  }

  return (
    <input
      type="number"
      autoFocus
      value={value}
      onChange={(e) => setValue(Number(e.target.value))}
      onBlur={save}
      onKeyDown={(e) => e.key === 'Enter' && save()}
      className="w-20 rounded border border-saffron bg-bg px-2 py-1 text-sm text-cream focus:outline-none"
    />
  );
}
