import { randomUUID } from 'crypto';
import { prisma } from '@/shared/lib/prisma';
import { BudgetRange as PrismaBudgetRange, EventType as PrismaEventType } from '@prisma/client';
import { BanquetInput } from '../schema';
import { BanquetRequest } from '../types';
import { notifyNewBanquetRequest } from '@/features/notifications/lib/notify';

const EVENT_TYPE_MAP: Record<BanquetInput['eventType'], PrismaEventType> = {
  birthday: 'BIRTHDAY',
  corporate: 'CORPORATE',
  wedding: 'WEDDING',
  anniversary: 'ANNIVERSARY',
  other: 'OTHER'
};

const BUDGET_MAP: Record<NonNullable<BanquetInput['budget']>, PrismaBudgetRange> = {
  up_50: 'UP_50',
  '50_100': 'FROM_50_100',
  '100_200': 'FROM_100_200',
  from_200: 'FROM_200'
};

export async function createBanquetRequest(input: BanquetInput): Promise<BanquetRequest> {
  const created = await prisma.banquetRequest.create({
    data: {
      publicId: randomUUID().slice(0, 8).toUpperCase(),
      status: 'NEW',
      eventType: EVENT_TYPE_MAP[input.eventType],
      date: input.date,
      guests: input.guests,
      budget: input.budget ? BUDGET_MAP[input.budget] : undefined,
      customerName: input.customerName,
      phone: input.phone,
      email: input.email || undefined,
      comment: input.comment
    }
  });

  const result: BanquetRequest = {
    id: created.publicId,
    createdAt: created.createdAt.toISOString(),
    status: 'new',
    eventType: input.eventType,
    date: created.date,
    guests: created.guests,
    budget: input.budget,
    customerName: created.customerName,
    phone: created.phone,
    email: created.email ?? undefined,
    comment: created.comment ?? undefined
  };

  await notifyNewBanquetRequest(result);

  return result;
}

