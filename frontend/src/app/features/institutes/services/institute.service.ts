import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, delay } from 'rxjs';
import { Institute, FilterOptions, Pagination } from '../../../core/models';

/**
 * Institute Service
 * خدمة إدارة المعاهد والكليات مع Mock Data
 */
@Injectable({
    providedIn: 'root'
})
export class InstituteService {
    private mockMode = true;

    // State Management
    private institutesSubject = new BehaviorSubject<Institute[]>([]);
    public institutes$ = this.institutesSubject.asObservable();

    constructor() {
        this.loadInitialData();
    }

    private loadInitialData(): void {
        this.institutesSubject.next(this.getMockInstitutes());
    }

    /**
     * جلب جميع المعاهد
     */
    getAll(filters?: FilterOptions): Observable<Pagination<Institute>> {
        if (this.mockMode) {
            let institutes = this.getMockInstitutes();

            // Apply filters
            if (filters) {
                if (filters.search) {
                    const search = filters.search.toLowerCase();
                    institutes = institutes.filter(i =>
                        i.name.toLowerCase().includes(search) ||
                        i.name_en?.toLowerCase().includes(search)
                    );
                }

                if (filters.country) {
                    institutes = institutes.filter(i => i.country === filters.country);
                }
            }

            // Pagination
            const page = filters?.page || 1;
            const perPage = filters?.per_page || 12;
            const total = institutes.length;
            const startIndex = (page - 1) * perPage;
            const endIndex = startIndex + perPage;
            const paginatedData = institutes.slice(startIndex, endIndex);

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

        return of({} as Pagination<Institute>);
    }

    /**
     * جلب معهد واحد بالـ ID
     */
    getById(id: number): Observable<Institute | null> {
        if (this.mockMode) {
            const institute = this.getMockInstitutes().find(i => i.id === id);
            return of(institute || null).pipe(delay(300));
        }
        return of(null);
    }

    /**
     * البحث في المعاهد
     */
    search(query: string): Observable<Institute[]> {
        if (this.mockMode) {
            const results = this.getMockInstitutes().filter(i =>
                i.name.toLowerCase().includes(query.toLowerCase()) ||
                i.name_en?.toLowerCase().includes(query.toLowerCase())
            );
            return of(results).pipe(delay(300));
        }
        return of([]);
    }

    /**
     * Mock Data - بيانات تجريبية
     */
    private getMockInstitutes(): Institute[] {
        return [
            {
                id: 1,
                name: 'كلية الهندسة',
                name_en: 'Faculty of Engineering',
                university_id: 1,
                description: 'كلية الهندسة في جامعة هارفارد من أعرق كليات الهندسة في العالم',
                type: 'faculty' as any,
                country: 'الولايات المتحدة',
                city: 'كامبريدج',
                website: 'https://engineering.harvard.edu',
                email: 'engineering@harvard.edu',
                image: 'https://placehold.co/800x400/4F46E5/ffffff?text=Engineering',
                programs_count: 25,
                students_count: 3500,
                rating: 4.9,
                is_active: true
            },
            {
                id: 2,
                name: 'كلية الطب',
                name_en: 'Medical School',
                university_id: 1,
                description: 'كلية الطب في جامعة هارفارد رائدة في التعليم الطبي والبحث العلمي',
                type: 'faculty' as any,
                country: 'الولايات المتحدة',
                city: 'كامبريدج',
                website: 'https://hms.harvard.edu',
                email: 'admissions@hms.harvard.edu',
                image: 'https://placehold.co/800x400/DC2626/ffffff?text=Medical',
                programs_count: 15,
                students_count: 2800,
                rating: 5.0,
                is_active: true
            },
            {
                id: 3,
                name: 'كلية إدارة الأعمال',
                name_en: 'Business School',
                university_id: 1,
                description: 'كلية هارفارد للأعمال من أفضل كليات إدارة الأعمال عالمياً',
                type: 'school' as any,
                country: 'الولايات المتحدة',
                city: 'كامبريدج',
                website: 'https://www.hbs.edu',
                email: 'admissions@hbs.edu',
                image: 'https://placehold.co/800x400/059669/ffffff?text=Business',
                programs_count: 12,
                students_count: 2200,
                rating: 4.9,
                is_active: true
            },
            {
                id: 4,
                name: 'كلية القانون',
                name_en: 'Law School',
                university_id: 2,
                description: 'كلية القانون في جامعة أكسفورد من أعرق كليات القانون البريطانية',
                type: 'faculty' as any,
                country: 'المملكة المتحدة',
                city: 'أكسفورد',
                website: 'https://www.law.ox.ac.uk',
                image: 'https://placehold.co/800x400/7C3AED/ffffff?text=Law',
                programs_count: 18,
                students_count: 1500,
                rating: 4.8,
                is_active: true
            },
            {
                id: 5,
                name: 'معهد التكنولوجيا',
                name_en: 'Institute of Technology',
                university_id: 3,
                description: 'معهد التكنولوجيا في MIT يقدم أحدث البرامج التكنولوجية',
                type: 'institute' as any,
                country: 'الولايات المتحدة',
                city: 'كامبريدج',
                website: 'https://www.mit.edu/tech',
                image: 'https://placehold.co/800x400/2563EB/ffffff?text=Tech',
                programs_count: 30,
                students_count: 4000,
                rating: 5.0,
                is_active: true
            },
            {
                id: 6,
                name: 'كلية العلوم',
                name_en: 'Faculty of Science',
                university_id: 4,
                description: 'كلية العلوم في جامعة كامبريدج تقدم برامج متميزة في العلوم الطبيعية',
                type: 'faculty' as any,
                country: 'المملكة المتحدة',
                city: 'كامبريدج',
                website: 'https://www.cam.ac.uk/science',
                image: 'https://placehold.co/800x400/F59E0B/ffffff?text=Science',
                programs_count: 22,
                students_count: 3200,
                rating: 4.9,
                is_active: true
            }
        ];
    }
}
