/**
 * Article Model - نموذج المقال
 */
export interface Article {
    id: number;
    author_id: number;
    author?: any;
    title: string;
    title_en?: string;
    slug: string;
    excerpt?: string;
    excerpt_en?: string;
    content: string;
    content_en?: string;
    featured_image?: string;
    category: ArticleCategory;
    tags?: string[];
    status: ArticleStatus;
    views_count?: number;
    is_featured?: boolean;
    published_at?: string;
    created_at?: string;
    updated_at?: string;
}

/**
 * Article Category
 */
export enum ArticleCategory {
    NEWS = 'news',
    TIPS = 'tips',
    GUIDES = 'guides',
    SUCCESS_STORIES = 'success_stories',
    UNIVERSITY_REVIEWS = 'university_reviews',
    CAREER = 'career',
    SCHOLARSHIPS = 'scholarships',
    STUDENT_LIFE = 'student_life',
    OTHER = 'other'
}

/**
 * Article Status
 */
export enum ArticleStatus {
    DRAFT = 'draft',
    PUBLISHED = 'published',
    ARCHIVED = 'archived'
}

/**
 * Article Summary - للقوائم
 */
export interface ArticleSummary {
    id: number;
    title: string;
    slug: string;
    excerpt?: string;
    featured_image?: string;
    category: ArticleCategory;
    author_name?: string;
    published_at?: string;
    views_count?: number;
}

/**
 * Testimonial Model - شهادة الطالب
 */
export interface Testimonial {
    id: number;
    user_id?: number;
    user?: any;
    name: string;
    email?: string;
    image?: string;
    university_name: string;
    specialization?: string;
    country?: string;
    rating: number;
    text: string;
    text_en?: string;
    is_approved: boolean;
    is_featured?: boolean;
    created_at?: string;
    updated_at?: string;
}

/**
 * Gallery Model - معرض الصور
 */
export interface Gallery {
    id: number;
    university_id?: number;
    university?: any;
    title?: string;
    description?: string;
    image_url: string;
    image_type: GalleryImageType;
    order?: number;
    is_active: boolean;
    created_at?: string;
}

export enum GalleryImageType {
    CAMPUS = 'campus',
    FACILITIES = 'facilities',
    STUDENTS = 'students',
    EVENTS = 'events',
    ACCOMMODATION = 'accommodation',
    OTHER = 'other'
}

/**
 * Contact Message Model
 */
export interface ContactMessage {
    id: number;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    type: ContactType;
    status: ContactStatus;
    admin_notes?: string;
    created_at?: string;
    updated_at?: string;
}

export enum ContactType {
    GENERAL_INQUIRY = 'general_inquiry',
    SUPPORT = 'support',
    COMPLAINT = 'complaint',
    SUGGESTION = 'suggestion',
    PARTNERSHIP = 'partnership',
    OTHER = 'other'
}

export enum ContactStatus {
    NEW = 'new',
    IN_PROGRESS = 'in_progress',
    RESOLVED = 'resolved',
    CLOSED = 'closed'
}
