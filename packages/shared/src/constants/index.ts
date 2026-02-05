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
    BY_ID: (id: number) => `/users/${id}`,
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
  EASY: 1,
  NORMAL: 2,
  HARD: 3,
  VERY_HARD: 4,
  EXTREME: 5,
} as const;

export const RATING_RANGE = {
  MIN: 1,
  MAX: 5,
} as const;
