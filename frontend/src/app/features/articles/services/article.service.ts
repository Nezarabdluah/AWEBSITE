import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Article, FilterOptions, Pagination } from '../../../core/models';

/**
 * Article Service
 * خدمة إدارة المقالات التعليمية مع Mock Data
 */
@Injectable({
    providedIn: 'root'
})
export class ArticleService {
    private mockMode = true;

    constructor() { }

    /**
     * جلب جميع المقالات
     */
    getAll(filters?: FilterOptions): Observable<Pagination<Article>> {
        if (this.mockMode) {
            let articles = this.getMockArticles();

            // Apply filters
            if (filters) {
                if (filters.search) {
                    const search = filters.search.toLowerCase();
                    articles = articles.filter(a =>
                        a.title.toLowerCase().includes(search) ||
                        a.content?.toLowerCase().includes(search) ||
                        a.excerpt?.toLowerCase().includes(search)
                    );
                }

                if (filters.category) {
                    articles = articles.filter(a => a.category === filters.category);
                }
            }

            // Sort by date (newest first)
            articles.sort((a, b) => {
                const dateA = new Date(a.published_at || a.created_at || '');
                const dateB = new Date(b.published_at || b.created_at || '');
                return dateB.getTime() - dateA.getTime();
            });

            // Pagination
            const page = filters?.page || 1;
            const perPage = filters?.per_page || 12;
            const total = articles.length;
            const startIndex = (page - 1) * perPage;
            const endIndex = startIndex + perPage;
            const paginatedData = articles.slice(startIndex, endIndex);

            return of({
                data: paginatedData,
                current_page: page,
                last_page: Math.ceil(total / perPage),
                per_page: perPage,
                total: total,
                from: startIndex + 1,
                to: Math.min(endIndex, total)
            }).pipe(delay(500));
        }

        return of({} as Pagination<Article>);
    }

    /**
     * جلب مقال واحد بالـ ID
     */
    getById(id: number): Observable<Article | null> {
        if (this.mockMode) {
            const article = this.getMockArticles().find(a => a.id === id);
            return of(article || null).pipe(delay(300));
        }
        return of(null);
    }

    /**
     * البحث في المقالات
     */
    search(query: string): Observable<Article[]> {
        if (this.mockMode) {
            const results = this.getMockArticles().filter(a =>
                a.title.toLowerCase().includes(query.toLowerCase()) ||
                a.excerpt?.toLowerCase().includes(query.toLowerCase())
            );
            return of(results).pipe(delay(300));
        }
        return of([]);
    }

    /**
     * Mock Data - بيانات تجريبية
     */
    private getMockArticles(): Article[] {
        return [
            {
                id: 1,
                title: 'دليل شامل للدراسة في أمريكا',
                slug: 'guide-to-study-in-usa',
                excerpt: 'كل ما تحتاج معرفته حول الدراسة في الولايات المتحدة الأمريكية',
                content: 'محتوى المقالة الكامل...',
                category: 'guides' as any,
                author_id: 1,
                featured_image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
                published_at: '2024-12-15T10:00:00Z',
                views_count: 1250,
                status: 'published' as any,
                is_featured: true,
                created_at: '2024-12-10T10:00:00Z',
                updated_at: '2024-12-15T10:00:00Z'
            },
            {
                id: 2,
                title: 'أفضل المنح الدراسية للطلاب العرب 2025',
                slug: 'best-scholarships-2025',
                excerpt: 'تعرف على أفضل المنح الدراسية المتاحة للطلاب العرب في 2025',
                content: 'محتوى المقالة الكامل...',
                category: 'scholarships' as any,
                author_id: 1,
                featured_image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800',
                published_at: '2024-12-14T10:00:00Z',
                views_count: 2100,
                status: 'published' as any,
                is_featured: true,
                created_at: '2024-12-10T10:00:00Z',
                updated_at: '2024-12-14T10:00:00Z'
            },
            {
                id: 3,
                title: 'كيفية الاستعداد لاختبار IELTS',
                slug: 'how-to-prepare-for-ielts',
                excerpt: 'نصائح عملية للحصول على درجة عالية في امتحان IELTS',
                content: 'محتوى المقالة الكامل...',
                category: 'tips' as any,
                author_id: 2,
                featured_image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800',
                published_at: '2024-12-13T10:00:00Z',
                views_count: 1800,
                status: 'published' as any,
                is_featured: false,
                created_at: '2024-12-08T10:00:00Z',
                updated_at: '2024-12-13T10:00:00Z'
            },
            {
                id: 4,
                title: 'التخصصات الجامعية الأكثر طلباً في سوق العمل',
                slug: 'most-demanded-majors',
                excerpt: 'تعرف على التخصصات التي توفر أفضل الفرص الوظيفية',
                content: 'محتوى المقالة الكامل...',
                category: 'career' as any,
                author_id: 1,
                featured_image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
                published_at: '2024-12-12T10:00:00Z',
                views_count: 1650,
                status: 'published' as any,
                is_featured: false,
                created_at: '2024-12-07T10:00:00Z',
                updated_at: '2024-12-12T10:00:00Z'
            },
            {
                id: 5,
                title: 'دليل التقديم للجامعات البريطانية',
                slug: 'uk-universities-application-guide',
                excerpt: 'خطوات التقديم للجامعات البريطانية والمتطلبات الأساسية',
                content: 'محتوى المقالة الكامل...',
                category: 'guides' as any,
                author_id: 2,
                featured_image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
                published_at: '2024-12-11T10:00:00Z',
                views_count: 1420,
                status: 'published' as any,
                is_featured: false,
                created_at: '2024-12-06T10:00:00Z',
                updated_at: '2024-12-11T10:00:00Z'
            },
            {
                id: 6,
                title: 'نصائح للنجاح في الدراسة الجامعية',
                slug: 'university-success-tips',
                excerpt: 'إرشادات مهمة للتفوق في حياتك الجامعية',
                content: 'محتوى المقالة الكامل...',
                category: 'student_life' as any,
                author_id: 3,
                featured_image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800',
                published_at: '2024-12-10T10:00:00Z',
                views_count: 980,
                status: 'published' as any,
                is_featured: false,
                created_at: '2024-12-05T10:00:00Z',
                updated_at: '2024-12-10T10:00:00Z'
            }
        ];
    }
}
