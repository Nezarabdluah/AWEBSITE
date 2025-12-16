// ثوابت التطبيق العامة

// مفاتيح التخزين المحلي
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  LANGUAGE: 'app_language',
  THEME: 'app_theme',
  REMEMBER_ME: 'remember_me',
};

// اللغات المدعومة
export const SUPPORTED_LANGUAGES = [
  { code: 'ar', name: 'العربية', dir: 'rtl' },
  { code: 'en', name: 'English', dir: 'ltr' },
];

// الثيمات
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

// أحجام الصفحات
export const PAGE_SIZES = [10, 25, 50, 100];
export const DEFAULT_PAGE_SIZE = 10;

// أنواع الملفات المسموحة
export const ALLOWED_FILE_TYPES = {
  IMAGES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  DOCUMENTS: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
};

// أقصى حجم للملف (بالبايت)
export const MAX_FILE_SIZE = {
  IMAGE: 5 * 1024 * 1024, // 5MB
  DOCUMENT: 10 * 1024 * 1024, // 10MB
};

// حالات الطلب
export const APPLICATION_STATUS = {
  PENDING: { value: 'pending', label: 'قيد المراجعة', color: 'warning' },
  APPROVED: { value: 'approved', label: 'مقبول', color: 'success' },
  REJECTED: { value: 'rejected', label: 'مرفوض', color: 'danger' },
  IN_PROGRESS: { value: 'in_progress', label: 'قيد الإجراء', color: 'info' },
  COMPLETED: { value: 'completed', label: 'مكتمل', color: 'success' },
};

// العملات
export const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'دولار أمريكي' },
  { code: 'EUR', symbol: '€', name: 'يورو' },
  { code: 'GBP', symbol: '£', name: 'جنيه إسترليني' },
  { code: 'TRY', symbol: '₺', name: 'ليرة تركية' },
];

// رسائل الأخطاء
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'فشل الاتصال بالخادم. يرجى التحقق من الاتصال بالإنترنت.',
  UNAUTHORIZED: 'انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى.',
  FORBIDDEN: 'ليس لديك صلاحية للوصول إلى هذه الصفحة.',
  NOT_FOUND: 'الصفحة المطلوبة غير موجودة.',
  SERVER_ERROR: 'حدث خطأ في الخادم. يرجى المحاولة لاحقاً.',
  VALIDATION_ERROR: 'يرجى التحقق من البيانات المدخلة.',
};

// ============================================================
// إعدادات الإشعارات (أضف هذا الجزء في نهاية الملف لديك)
// ============================================================

export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

export const NOTIFICATION_DURATION = 3000; // 3 ثواني