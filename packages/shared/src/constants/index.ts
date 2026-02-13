export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  USERS: {
    BASE: '/users',
    ME: '/users/me',
    BY_ID: (id: string) => `/users/${id}`,
  },
  STORES: {
    BASE: '/stores',
    BY_ID: (id: number) => `/stores/${id}`,
    THEMES: (id: number) => `/stores/${id}/themes`,
  },
  THEMES: {
    BASE: '/themes',
    BY_ID: (id: number) => `/themes/${id}`,
    REVIEWS: (id: number) => `/themes/${id}/reviews`,
  },
  REVIEWS: {
    BASE: '/reviews',
    BY_ID: (id: number) => `/reviews/${id}`,
    MY: '/reviews/my',
  },
  CRAWL: {
    BASE: '/crawl',
  },
} as const;

export const DIFFICULTY_LEVELS = {
  VERY_EASY: 'very_easy',
  EASY: 'easy',
  NORMAL: 'normal',
  HARD: 'hard',
  VERY_HARD: 'very_hard',
} as const;

export const RATING_RANGE = {
  MIN: 1,
  MAX: 5,
} as const;
