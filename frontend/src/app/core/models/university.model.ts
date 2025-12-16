// نموذج الجامعة
export interface University {
  id: number;
  name: string;
  nameEn?: string;
  slug: string;
  description: string;
  descriptionEn?: string;
  country: string;
  city: string;
  address?: string;
  logo: string;
  coverImage?: string;
  website?: string;
  email?: string;
  phone?: string;
  established?: number;
  ranking?: number;
  tuitionFees?: TuitionFees;
  admissionRequirements?: string;
  isActive: boolean;
  isFeatured: boolean;
  gallery?: GalleryImage[];
  specializations?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

// رسوم الدراسة
export interface TuitionFees {
  min: number;
  max: number;
  currency: string;
  period: 'yearly' | 'semester';
}

// صورة المعرض
export interface GalleryImage {
  id: number;
  url: string;
  title?: string;
  order: number;
}

// فلتر البحث عن الجامعات
export interface UniversityFilter {
  search?: string;
  country?: string;
  city?: string;
  minFees?: number;
  maxFees?: number;
  specialization?: string;
  featured?: boolean;
  page?: number;
  perPage?: number;
}