'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { Theme } from '@lets-escape/shared';

export function useThemes() {
  return useQuery<Theme[]>({
    queryKey: ['themes'],
    queryFn: () => api.themes.getAll() as Promise<Theme[]>,
  });
}

export function useTheme(id: number) {
  return useQuery<Theme>({
    queryKey: ['themes', id],
    queryFn: () => api.themes.getById(id) as Promise<Theme>,
    enabled: !!id,
  });
}
