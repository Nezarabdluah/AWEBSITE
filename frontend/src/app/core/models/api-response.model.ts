// استجابة API العامة
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: { [key: string]: string[] };
}

// استجابة مع Pagination
export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: PaginationMeta;
}

// معلومات الـ Pagination
export interface PaginationMeta {
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
  from: number;
  to: number;
}

// حالة التحميل
export interface LoadingState {
  isLoading: boolean;
  error?: string;
}