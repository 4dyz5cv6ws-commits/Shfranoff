export type EventType = 'birthday' | 'corporate' | 'wedding' | 'anniversary' | 'other';

export type BudgetRange = 'up_50' | '50_100' | '100_200' | 'from_200';

export type BanquetRequestStatus = 'new' | 'contacted' | 'confirmed' | 'declined';

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  birthday: 'День рождения',
  corporate: 'Корпоратив',
  wedding: 'Свадьба',
  anniversary: 'Юбилей',
  other: 'Другое'
};

export const BUDGET_LABELS: Record<BudgetRange, string> = {
  up_50: 'до 50 000 ₽',
  '50_100': '50 000–100 000 ₽',
  '100_200': '100 000–200 000 ₽',
  from_200: 'от 200 000 ₽'
};

export interface BanquetRequest {
  id: string;
  createdAt: string;
  status: BanquetRequestStatus;
  eventType: EventType;
  date: string; // YYYY-MM-DD
  guests: number;
  budget?: BudgetRange;
  customerName: string;
  phone: string;
  email?: string;
  comment?: string;
}
