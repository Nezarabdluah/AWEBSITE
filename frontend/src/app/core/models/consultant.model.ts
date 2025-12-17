/**
 * Consultant Model - نموذج الاستشاري
 */
export interface Consultant {
    id: number;
    user_id?: number;
    name: string;
    email: string;
    phone?: string;
    image?: string;
    title?: string;
    specialization: string[];
    bio?: string;
    bio_en?: string;
    experience_years: number;
    education?: string[];
    certifications?: string[];
    languages: string[];
    countries_expertise: string[];
    universities_expertise?: string[];
    rating?: number;
    total_reviews?: number;
    total_students?: number;
    success_rate?: number;
    hourly_rate?: number;
    currency?: string;
    availability: ConsultantAvailability;
    is_verified: boolean;
    is_active: boolean;
    social_media?: SocialMedia;
    created_at?: string;
    updated_at?: string;
}

/**
 * Consultant Availability
 */
export enum ConsultantAvailability {
    AVAILABLE = 'available',
    BUSY = 'busy',
    UNAVAILABLE = 'unavailable'
}

/**
 * Social Media Links
 */
export interface SocialMedia {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    website?: string;
}

/**
 * Consultant Summary - للقوائم
 */
export interface ConsultantSummary {
    id: number;
    name: string;
    image?: string;
    specialization: string[];
    rating?: number;
    total_students?: number;
    experience_years: number;
    availability: ConsultantAvailability;
}

/**
 * Booking/Appointment
 */
export interface Appointment {
    id: number;
    consultant_id: number;
    consultant?: Consultant;
    user_id: number;
    user?: any;
    date: string;
    time: string;
    duration_minutes: number;
    type: AppointmentType;
    status: AppointmentStatus;
    notes?: string;
    meeting_link?: string;
    price?: number;
    created_at?: string;
    updated_at?: string;
}

export enum AppointmentType {
    ONLINE = 'online',
    PHONE = 'phone',
    IN_PERSON = 'in_person'
}

export enum AppointmentStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
    NO_SHOW = 'no_show'
}
