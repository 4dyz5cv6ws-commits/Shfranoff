const OPEN_HOUR = 12;
const LAST_SEATING_HOUR = 22; // последняя посадка в 22:00, зал работает до полуночи
const STEP_MINUTES = 30;

export function generateSlotsForDate(date: string): string[] {
  const slots: string[] = [];
  for (let h = OPEN_HOUR; h <= LAST_SEATING_HOUR; h++) {
    for (let m = 0; m < 60; m += STEP_MINUTES) {
      if (h === LAST_SEATING_HOUR && m > 0) continue;
      slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    }
  }

  const todayISO = new Date().toISOString().slice(0, 10);
  if (date !== todayISO) return slots;

  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  // сегодня скрываем слоты, до которых меньше часа
  return slots.filter((slot) => {
    const [h, m] = slot.split(':').map(Number);
    return h * 60 + m - nowMinutes >= 60;
  });
}
