import { API_ROUTES } from '@lets-escape/shared';
import { createClient } from './supabase/client';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function getAuthToken(): Promise<string | null> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session?.access_token ?? null;
}

interface FetchApiOptions extends RequestInit {
  requireAuth?: boolean;
}

async function fetchApi<T>(
  endpoint: string,
  options?: FetchApiOptions,
): Promise<T> {
  const { requireAuth = false, ...fetchOptions } = options || {};

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...fetchOptions?.headers,
  };

  if (requireAuth) {
    const token = await getAuthToken();
    if (!token) {
      throw new Error('Authentication required');
    }
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
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
    getMy: () => fetchApi(API_ROUTES.REVIEWS.MY, { requireAuth: true }),
    create: (data: unknown) =>
      fetchApi(API_ROUTES.REVIEWS.BASE, {
        method: 'POST',
        body: JSON.stringify(data),
        requireAuth: true,
      }),
    update: (id: number, data: unknown) =>
      fetchApi(API_ROUTES.REVIEWS.BY_ID(id), {
        method: 'PATCH',
        body: JSON.stringify(data),
        requireAuth: true,
      }),
    delete: (id: number) =>
      fetchApi(API_ROUTES.REVIEWS.BY_ID(id), {
        method: 'DELETE',
        requireAuth: true,
      }),
  },
  crawl: {
    run: () => fetchApi(API_ROUTES.CRAWL.BASE),
  },
};
