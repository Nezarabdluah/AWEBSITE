/**
 * Consultant Model - نموذج الاستشاري
 */
export interface Consultant {
    id: number;
    user_id?: number; // Optional now
    user?: any;
    name: string;
    email: string;
    phone: string;
    bio: string;
    profile_image?: string;
    image?: string; // for template compatibility
    experience_years: number;
    rating: number;
    specialty?: string;
    is_available?: boolean;
    is_active?: boolean;
    consultations_count?: number;
    languages?: string[];
    created_at?: string;
    updated_at?: string;
}
