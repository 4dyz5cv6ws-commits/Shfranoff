import { OrderInput } from '../schema';

export interface OrderLine {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export type OrderStatus = 'new' | 'confirmed' | 'preparing' | 'delivering' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  createdAt: string;
  status: OrderStatus;
  customerName: string;
  phone: string;
  deliveryType: OrderInput['deliveryType'];
  address?: string;
  comment?: string;
  lines: OrderLine[];
  subtotal: number;
  deliveryFee: number;
  total: number;
}
