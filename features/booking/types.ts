export type BookingStatus = 'confirmed' | 'cancelled';

export interface Booking {
  id: string;
  createdAt: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  guests: number;
  customerName: string;
  phone: string;
  comment?: string;
  status: BookingStatus;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}
