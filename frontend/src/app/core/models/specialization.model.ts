/**
 * Specialization Model - نموذج التخصص الدراسي
 */
export interface Specialization {
    id: number;
    name: string;
    name_en?: string;
    description?: string;
    description_en?: string;
    category: SpecializationCategory;
    level: EducationLevel;
    duration_years: number;
    duration_months?: number;
    degree_type: DegreeType;
    language: string;
    requirements?: string[];
    career_prospects?: string[];
    skills_gained?: string[];
    tuition_fee?: number;
    currency?: string;
    scholarship_available?: boolean;
    is_popular?: boolean;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
}

/**
 * Specialization Category
 */
export enum SpecializationCategory {
    ENGINEERING = 'engineering',
    MEDICINE = 'medicine',
    BUSINESS = 'business',
    IT = 'it',
    ARTS = 'arts',
    SCIENCE = 'science',
    LAW = 'law',
    EDUCATION = 'education',
    ARCHITECTURE = 'architecture',
    AGRICULTURE = 'agriculture',
    OTHER = 'other'
}

/**
 * Education Level
 */
export enum EducationLevel {
    DIPLOMA = 'diploma',
    BACHELOR = 'bachelor',
    MASTER = 'master',
    PHD = 'phd',
    CERTIFICATE = 'certificate'
}

/**
 * Degree Type
 */
export enum DegreeType {
    BA = 'ba',         // Bachelor of Arts
    BS = 'bs',         // Bachelor of Science
    BSC = 'bsc',       // Bachelor of Science
    MA = 'ma',         // Master of Arts
    MS = 'ms',         // Master of Science
    MSC = 'msc',       // Master of Science
    MBA = 'mba',       // Master of Business Administration
    PHD = 'phd',       // Doctor of Philosophy
    MD = 'md',         // Doctor of Medicine
    OTHER = 'other'
}

/**
 * University Specialization (Pivot)
 */
export interface UniversitySpecialization {
    id: number;
    university_id: number;
    university?: any;
    institute_id?: number;
    institute?: any;
    specialization_id: number;
    specialization?: Specialization;
    tuition_fee?: number;
    seats_available?: number;
    application_deadline?: string;
    start_date?: string;
    is_accepting_applications: boolean;
}

/**
 * Specialization Summary - للقوائم
 */
export interface SpecializationSummary {
    id: number;
    name: string;
    category: SpecializationCategory;
    level: EducationLevel;
    duration_years: number;
    is_popular?: boolean;
}
