/**
 * Common Models - النماذج المشتركة
 */

// Pagination Response
export interface Pagination<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

// Filter Options - خيارات الفلترة
export interface FilterOptions {
    page?: number;
    per_page?: number;
    search?: string;
    category?: string;
    country?: string;
    city?: string;
    type?: string;
    specialty?: string;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
}
