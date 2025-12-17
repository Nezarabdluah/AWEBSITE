/**
 * Application Model - نموذج طلب القبول
 */
export interface Application {
    id: number;
    user_id: number;
    user?: any;
    university_id: number;
    university?: any;
    institute_id?: number;
    institute?: any;
    specialization_id: number;
    specialization?: any;
    status: ApplicationStatus;
    submitted_at?: string;
    reviewed_at?: string;
    decision_date?: string;

    // Personal Information
    full_name: string;
    email: string;
    phone: string;
    date_of_birth: string;
    nationality: string;
    passport_number?: string;
    address: string;
    city: string;
    country: string;

    // Educational Background
    current_education_level: string;
    gpa?: number;
    graduation_year?: number;
    previous_university?: string;

    // Test Scores
    toefl_score?: number;
    ielts_score?: number;
    gre_score?: number;
    gmat_score?: number;
    sat_score?: number;

    // Documents (file paths/URLs)
    documents?: ApplicationDocument[];

    // Additional Information
    motivation_letter?: string;
    research_interests?: string;
    work_experience?: string;
    extracurricular_activities?: string;

    // Admin Notes
    admin_notes?: string;
    rejection_reason?: string;

    created_at?: string;
    updated_at?: string;
}

/**
 * Application Status
 */
export enum ApplicationStatus {
    DRAFT = 'draft',
    SUBMITTED = 'submitted',
    UNDER_REVIEW = 'under_review',
    PENDING_DOCUMENTS = 'pending_documents',
    ACCEPTED = 'accepted',
    CONDITIONALLY_ACCEPTED = 'conditionally_accepted',
    REJECTED = 'rejected',
    WITHDRAWN = 'withdrawn',
    EXPIRED = 'expired'
}

/**
 * Application Document
 */
export interface ApplicationDocument {
    id: number;
    application_id: number;
    type: DocumentType;
    name: string;
    file_path: string;
    file_size?: number;
    uploaded_at: string;
    is_verified?: boolean;
}

/**
 * Document Type
 */
export enum DocumentType {
    PASSPORT = 'passport',
    TRANSCRIPT = 'transcript',
    DIPLOMA = 'diploma',
    CV = 'cv',
    MOTIVATION_LETTER = 'motivation_letter',
    RECOMMENDATION_LETTER = 'recommendation_letter',
    LANGUAGE_CERTIFICATE = 'language_certificate',
    PHOTO = 'photo',
    OTHER = 'other'
}

/**
 * Application Summary - للقوائم
 */
export interface ApplicationSummary {
    id: number;
    university_name: string;
    specialization_name: string;
    status: ApplicationStatus;
    submitted_at?: string;
}

/**
 * Application Statistics (للـ Dashboard)
 */
export interface ApplicationStats {
    total: number;
    draft: number;
    submitted: number;
    under_review: number;
    accepted: number;
    rejected: number;
}
