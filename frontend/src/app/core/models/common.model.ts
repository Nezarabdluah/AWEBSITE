/**
 * Settings Model - إعدادات النظام
 */
export interface Settings {
    id: number;
    key: string;
    value: string;
    type: SettingType;
    group: SettingGroup;
    description?: string;
    is_public: boolean;
    updated_at?: string;
}

export enum SettingType {
    STRING = 'string',
    NUMBER = 'number',
    BOOLEAN = 'boolean',
    JSON = 'json',
    TEXT = 'text'
}

export enum SettingGroup {
    GENERAL = 'general',
    EMAIL = 'email',
    PAYMENT = 'payment',
    SOCIAL = 'social',
    SEO = 'seo',
    MAINTENANCE = 'maintenance'
}

/**
 * Pagination Model
 */
export interface Pagination<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from?: number;
    to?: number;
}

/**
 * Filter Options
 */
export interface FilterOptions {
    search?: string;
    country?: string;
    city?: string;
    category?: string;
    type?: string;
    status?: string;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
    page?: number;
    per_page?: number;
}

/**
 * Dashboard Statistics
 */
export interface DashboardStats {
    total_universities: number;
    total_institutes: number;
    total_specializations: number;
    total_consultants: number;
    total_applications: number;
    total_users: number;
    total_articles: number;
    recent_applications?: ApplicationSummary[];
    popular_universities?: any[];
    top_consultants?: any[];
}

// Import необходимых типов
import { ApplicationSummary } from './application.model';
