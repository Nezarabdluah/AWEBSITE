// عنوان API الرئيسي
export const API_BASE_URL = 'http://localhost:8000/api';

// نقاط الوصول للـ API
export const API_ENDPOINTS = {
  // المصادقة
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },

  // الجامعات
  UNIVERSITIES: {
    LIST: '/universities',
    DETAIL: (id: number) => `/universities/${id}`,
    CREATE: '/universities',
    UPDATE: (id: number) => `/universities/${id}`,
    DELETE: (id: number) => `/universities/${id}`,
    FEATURED: '/universities/featured',
    SEARCH: '/universities/search',
  },

  // المعاهد
  INSTITUTES: {
    LIST: '/institutes',
    DETAIL: (id: number) => `/institutes/${id}`,
    CREATE: '/institutes',
    UPDATE: (id: number) => `/institutes/${id}`,
    DELETE: (id: number) => `/institutes/${id}`,
  },

  // التخصصات
  SPECIALIZATIONS: {
    LIST: '/specializations',
    DETAIL: (id: number) => `/specializations/${id}`,
    CREATE: '/specializations',
    UPDATE: (id: number) => `/specializations/${id}`,
    DELETE: (id: number) => `/specializations/${id}`,
  },

  // الطلبات
  APPLICATIONS: {
    LIST: '/applications',
    DETAIL: (id: number) => `/applications/${id}`,
    CREATE: '/applications',
    UPDATE: (id: number) => `/applications/${id}`,
    DELETE: (id: number) => `/applications/${id}`,
    UPDATE_STATUS: (id: number) => `/applications/${id}/status`,
  },

  // المستشارين
  CONSULTANTS: {
    LIST: '/consultants',
    DETAIL: (id: number) => `/consultants/${id}`,
  },

  // الآراء
  TESTIMONIALS: {
    LIST: '/testimonials',
    CREATE: '/testimonials',
    APPROVED: '/testimonials/approved',
  },

  // المقالات
  ARTICLES: {
    LIST: '/articles',
    DETAIL: (slug: string) => `/articles/${slug}`,
    CREATE: '/articles',
    UPDATE: (id: number) => `/articles/${id}`,
    DELETE: (id: number) => `/articles/${id}`,
  },

  // التواصل
  CONTACT: {
    SEND: '/contact',
  },

  // لوحة التحكم
  DASHBOARD: {
    STATS: '/dashboard/stats',
    RECENT_APPLICATIONS: '/dashboard/recent-applications',
    CHART_DATA: '/dashboard/chart-data',
  },

  // الرفع
  UPLOAD: {
    IMAGE: '/upload/image',
    DOCUMENT: '/upload/document',
  },
};