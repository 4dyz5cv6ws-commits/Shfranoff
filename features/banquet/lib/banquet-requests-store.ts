import { prisma } from '@/shared/lib/prisma';

// Используется будущей admin panel для просмотра заявок
export async function listBanquetRequests() {
  return prisma.banquetRequest.findMany({ orderBy: { createdAt: 'desc' } });
}

