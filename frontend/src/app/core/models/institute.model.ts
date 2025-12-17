/**
 * Institute Model - نموذج المعهد/الكلية
 */
export interface Institute {
    id: number;
    name: string;
    name_en?: string;
    university_id: number;
    university?: University;
    description?: string;
    description_en?: string;
    type: InstituteType;
    country: string;
    city: string;
    address?: string;
    website?: string;
    email?: string;
    phone?: string;
    image?: string;
    logo?: string;
    founded_year?: number;
    accreditation?: string;
    programs_count?: number;
    students_count?: number;
    faculty_count?: number;
    tuition_fee_min?: number;
    tuition_fee_max?: number;
    currency?: string;
    application_fee?: number;
    requirements?: string[];
    facilities?: string[];
    rating?: number;
    ranking?: string;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
}

/**
 * Institute Type Enum
 */
export enum InstituteType {
    COLLEGE = 'college',
    FACULTY = 'faculty',
    SCHOOL = 'school',
    INSTITUTE = 'institute',
    DEPARTMENT = 'department'
}

/**
 * Institute Summary - للقوائم
 */
export interface InstituteSummary {
    id: number;
    name: string;
    university_name: string;
    type: InstituteType;
    country: string;
    city: string;
    image?: string;
    programs_count?: number;
    rating?: number;
}

// Re-export University for reference
import { University } from './university.model';
