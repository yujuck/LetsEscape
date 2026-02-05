'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { Store } from '@lets-escape/shared';

export function useStores() {
  return useQuery<Store[]>({
    queryKey: ['stores'],
    queryFn: () => api.stores.getAll() as Promise<Store[]>,
  });
}

export function useStore(id: number) {
  return useQuery<Store>({
    queryKey: ['stores', id],
    queryFn: () => api.stores.getById(id) as Promise<Store>,
    enabled: !!id,
  });
}
