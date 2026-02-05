import { API_ROUTES } from '@lets-escape/shared';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

export const api = {
  themes: {
    getAll: () => fetchApi(API_ROUTES.THEMES.BASE),
    getById: (id: number) => fetchApi(API_ROUTES.THEMES.BY_ID(id)),
  },
  stores: {
    getAll: () => fetchApi(API_ROUTES.STORES.BASE),
    getById: (id: number) => fetchApi(API_ROUTES.STORES.BY_ID(id)),
  },
  reviews: {
    getAll: () => fetchApi(API_ROUTES.REVIEWS.BASE),
    getById: (id: number) => fetchApi(API_ROUTES.REVIEWS.BY_ID(id)),
    getMy: () => fetchApi(API_ROUTES.REVIEWS.MY),
  },
  crawl: {
    run: () => fetchApi(API_ROUTES.CRAWL.BASE),
  },
};
