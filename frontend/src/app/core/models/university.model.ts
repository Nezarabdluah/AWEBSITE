// نموذج الجامعة
export interface University {
  id: number;
  name: string;
  name_en?: string;
  slug: string;
  description?: string;
  description_en?: string;
  country: string;
  city: string;
  address?: string;
  website?: string;
  email?: string;
  phone?: string;
  type?: 'public' | 'private' | 'international';
  founded_year?: number;
  image?: string;
  logo?: string;
  ranking_world?: number;
  ranking_local?: number;
  rating?: number;
  students_count?: number;
  faculty_count?: number;
  international_students?: number;
  tuition_fee_min?: number;
  tuition_fee_max?: number;
  application_fee?: number;
  acceptance_rate?: number;
  programs_count?: number;
  accreditation?: string;
  facilities?: string[];
  requirements?: string[];
  is_active: boolean;
  is_featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

// صورة المعرض
export interface GalleryImage {
  id: number;
  url: string;
  title?: string;
  order: number;
}