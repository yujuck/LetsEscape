'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { Review } from '@lets-escape/shared';

export function useReviews() {
  return useQuery<Review[]>({
    queryKey: ['reviews'],
    queryFn: () => api.reviews.getAll() as Promise<Review[]>,
  });
}

export function useReview(id: number) {
  return useQuery<Review>({
    queryKey: ['reviews', id],
    queryFn: () => api.reviews.getById(id) as Promise<Review>,
    enabled: !!id,
  });
}

export function useMyReviews() {
  return useQuery<Review[]>({
    queryKey: ['reviews', 'my'],
    queryFn: () => api.reviews.getMy() as Promise<Review[]>,
  });
}
