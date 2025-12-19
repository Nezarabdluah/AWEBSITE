/**
 * Specialization Model - نموذج التخصص
 */
export interface Specialization {
    id: number;
    name: string;
    name_en?: string;
    description: string;
    icon?: string;
    category: string;
    duration_years?: number;
    level?: string;
    degree_type?: string;
    language?: string;
    is_active?: boolean;
    university_count?: number;
    average_salary?: number;
    created_at?: string;
    updated_at?: string;
}
