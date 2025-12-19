import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Specialization, FilterOptions, Pagination } from '../../../core/models';

/**
 * Specialization Service
 * خدمة إدارة التخصصات الدراسية مع Mock Data
 */
@Injectable({
    providedIn: 'root'
})
export class SpecializationService {
    private mockMode = true;

    constructor() { }

    /**
     * جلب جميع التخصصات
     */
    getAll(filters?: FilterOptions): Observable<Pagination<Specialization>> {
        if (this.mockMode) {
            let specializations = this.getMockSpecializations();

            // Apply filters
            if (filters) {
                if (filters.search) {
                    const search = filters.search.toLowerCase();
                    specializations = specializations.filter(s =>
                        s.name.toLowerCase().includes(search) ||
                        s.name_en?.toLowerCase().includes(search) ||
                        s.description?.toLowerCase().includes(search)
                    );
                }

                if (filters.category) {
                    specializations = specializations.filter(s => s.category === filters.category);
                }
            }

            // Pagination
            const page = filters?.page || 1;
            const perPage = filters?.per_page || 12;
            const total = specializations.length;
            const startIndex = (page - 1) * perPage;
            const endIndex = startIndex + perPage;
            const paginatedData = specializations.slice(startIndex, endIndex);

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

        return of({} as Pagination<Specialization>);
    }

    /**
     * جلب تخصص واحد بالـ ID
     */
    getById(id: number): Observable<Specialization | null> {
        if (this.mockMode) {
            const specialization = this.getMockSpecializations().find(s => s.id === id);
            return of(specialization || null).pipe(delay(300));
        }
        return of(null);
    }

    /**
     * البحث في التخصصات
     */
    search(query: string): Observable<Specialization[]> {
        if (this.mockMode) {
            const results = this.getMockSpecializations().filter(s =>
                s.name.toLowerCase().includes(query.toLowerCase()) ||
                s.name_en?.toLowerCase().includes(query.toLowerCase())
            );
            return of(results).pipe(delay(300));
        }
        return of([]);
    }

    /**
     * الحصول على التصنيفات
     */
    getCategories(): Observable<string[]> {
        const categories = [...new Set(this.getMockSpecializations().map(s => s.category))];
        return of(categories);
    }

    /**
     * Mock Data - بيانات تجريبية
     */
    private getMockSpecializations(): Specialization[] {
        return [
            {
                id: 1,
                name: 'هندسة الحاسوب',
                name_en: 'Computer Engineering',
                category: 'engineering' as any,
                level: 'bachelor' as any,
                description: 'تخصص هندسة الحاسوب يجمع بين علوم الحاسوب والهندسة الكهربائية',
                duration_years: 4,
                degree_type: 'bs' as any,
                language: 'ar',
                is_active: true
            },
            {
                id: 2,
                name: 'الطب البشري',
                name_en: 'Medicine',
                category: 'medicine' as any,
                level: 'bachelor' as any,
                description: 'دراسة الطب البشري وعلاج الأمراض',
                duration_years: 6,
                degree_type: 'md' as any,
                language: 'ar',
                is_active: true
            },
            {
                id: 3,
                name: 'إدارة الأعمال',
                name_en: 'Business Administration',
                category: 'business' as any,
                level: 'bachelor' as any,
                description: 'تخصص إدارة الأعمال يركز على المهارات الإدارية والتنظيمية',
                duration_years: 4,
                degree_type: 'mba' as any,
                language: 'ar',
                is_active: true
            },
            {
                id: 4,
                name: 'الهندسة المدنية',
                name_en: 'Civil Engineering',
                category: 'engineering' as any,
                level: 'bachelor' as any,
                description: 'تصميم وبناء المنشآت والبنية التحتية',
                duration_years: 4,
                degree_type: 'bs' as any,
                language: 'ar',
                is_active: true
            },
            {
                id: 5,
                name: 'علوم الحاسب',
                name_en: 'Computer Science',
                category: 'it' as any,
                level: 'bachelor' as any,
                description: 'دراسة علوم الحاسوب والبرمجة والذكاء الاصطناعي',
                duration_years: 4,
                degree_type: 'bsc' as any,
                language: 'ar',
                is_active: true
            },
            {
                id: 6,
                name: 'القانون',
                name_en: 'Law',
                category: 'law' as any,
                level: 'bachelor' as any,
                description: 'دراسة القوانين والأنظمة القانونية',
                duration_years: 4,
                degree_type: 'ba' as any,
                language: 'ar',
                is_active: true
            },
            {
                id: 7,
                name: 'الصيدلة',
                name_en: 'Pharmacy',
                category: 'medicine' as any,
                level: 'bachelor' as any,
                description: 'دراسة الأدوية وتركيبها واستخداماتها',
                duration_years: 5,
                degree_type: 'bs' as any,
                language: 'ar',
                is_active: true
            },
            {
                id: 8,
                name: 'الهندسة الميكانيكية',
                name_en: 'Mechanical Engineering',
                category: 'engineering' as any,
                level: 'bachelor' as any,
                description: 'تصميم وتطوير الأنظمة الميكانيكية',
                duration_years: 4,
                degree_type: 'bs' as any,
                language: 'ar',
                is_active: true
            }
        ];
    }
}
