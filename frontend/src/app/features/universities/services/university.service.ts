import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, delay } from 'rxjs';
import { University, FilterOptions, Pagination } from '../../../core/models';

/**
 * University Service
 * خدمة إدارة الجامعات مع Mock Data
 */
@Injectable({
    providedIn: 'root'
})
export class UniversityService {
    private mockMode = true; // سيتم تغييره لاحقاً للـ Real API

    // State Management
    private universitiesSubject = new BehaviorSubject<University[]>([]);
    public universities$ = this.universitiesSubject.asObservable();

    constructor() {
        // تحميل البيانات عند البداية
        this.loadInitialData();
    }

    private loadInitialData(): void {
        this.universitiesSubject.next(this.getMockUniversities());
    }

    /**
     * جلب جميع الجامعات
     */
    getAll(filters?: FilterOptions): Observable<Pagination<University>> {
        if (this.mockMode) {
            let universities = this.getMockUniversities();

            // تطبيق الفلاتر
            if (filters) {
                if (filters.search) {
                    const search = filters.search.toLowerCase();
                    universities = universities.filter(u =>
                        u.name.toLowerCase().includes(search) ||
                        u.name_en?.toLowerCase().includes(search)
                    );
                }

                if (filters.country) {
                    universities = universities.filter(u => u.country === filters.country);
                }

                if (filters.city) {
                    universities = universities.filter(u => u.city === filters.city);
                }

                // Sorting
                if (filters.sort_by) {
                    universities.sort((a, b) => {
                        const aValue = (a as any)[filters.sort_by!];
                        const bValue = (b as any)[filters.sort_by!];
                        if (filters.sort_order === 'desc') {
                            return bValue - aValue;
                        }
                        return aValue - bValue;
                    });
                }
            }

            // Pagination
            const page = filters?.page || 1;
            const perPage = filters?.per_page || 12;
            const total = universities.length;
            const startIndex = (page - 1) * perPage;
            const endIndex = startIndex + perPage;
            const paginatedData = universities.slice(startIndex, endIndex);

            return of({
                data: paginatedData,
                current_page: page,
                last_page: Math.ceil(total / perPage),
                per_page: perPage,
                total: total,
                from: startIndex + 1,
                to: Math.min(endIndex, total)
            }).pipe(delay(500)); // محاكاة network delay
        }

        // Real API call (مستقبلاً)
        // return this.http.get<Pagination<University>>('/api/universities', { params: filters });
        return of({} as Pagination<University>);
    }

    /**
     * جلب جامعة واحدة بالـ ID
     */
    getById(id: number): Observable<University | null> {
        if (this.mockMode) {
            const university = this.getMockUniversities().find(u => u.id === id);
            return of(university || null).pipe(delay(300));
        }

        // Real API
        // return this.http.get<University>(`/api/universities/${id}`);
        return of(null);
    }

    /**
     * البحث في الجامعات
     */
    search(query: string): Observable<University[]> {
        if (this.mockMode) {
            const results = this.getMockUniversities().filter(u =>
                u.name.toLowerCase().includes(query.toLowerCase()) ||
                u.name_en?.toLowerCase().includes(query.toLowerCase()) ||
                u.country.toLowerCase().includes(query.toLowerCase())
            );
            return of(results).pipe(delay(300));
        }

        return of([]);
    }

    /**
     * الحصول على الدول المتاحة
     */
    getCountries(): Observable<string[]> {
        if (this.mockMode) {
            const countries = [...new Set(this.getMockUniversities().map(u => u.country))];
            return of(countries.sort());
        }
        return of([]);
    }

    /**
     * الحصول على المدن حسب الدولة
     */
    getCitiesByCountry(country: string): Observable<string[]> {
        if (this.mockMode) {
            const cities = this.getMockUniversities()
                .filter(u => u.country === country)
                .map(u => u.city);
            return of([...new Set(cities)].sort());
        }
        return of([]);
    }

    /**
     * Mock Data - بيانات تجريبية
     */
    private getMockUniversities(): University[] {
        return [
            {
                id: 1,
                name: 'جامعة هارفارد',
                name_en: 'Harvard University',
                slug: 'harvard-university',
                country: 'الولايات المتحدة',
                city: 'كامبريدج',
                address: 'Massachusetts Hall, Cambridge, MA 02138',
                website: 'https://www.harvard.edu',
                email: 'admissions@harvard.edu',
                phone: '+1-617-495-1000',
                type: 'public',
                founded_year: 1636,
                description: 'جامعة هارفارد هي أقدم مؤسسة للتعليم العالي في الولايات المتحدة وواحدة من أعرق الجامعات في العالم.',
                image: 'https://placehold.co/800x400/4F46E5/ffffff?text=Harvard',
                logo: 'https://placehold.co/200x200/4F46E5/ffffff?text=H',
                ranking_world: 1,
                ranking_local: 1,
                rating: 4.9,
                students_count: 23000,
                faculty_count: 2400,
                international_students: 5800,
                tuition_fee_min: 50000,
                tuition_fee_max: 55000,
                application_fee: 100,
                acceptance_rate: 5,
                programs_count: 150,
                accreditation: 'NEASC',
                is_active: true
            },
            {
                id: 2,
                name: 'جامعة أكسفورد',
                name_en: 'University of Oxford',
                slug: 'oxford-university',
                country: 'المملكة المتحدة',
                city: 'أكسفورد',
                website: 'https://www.ox.ac.uk',
                type: 'public',
                founded_year: 1096,
                description: 'جامعة أكسفورد هي أقدم جامعة في العالم الناطق بالإنجليزية وواحدة من أرقى المؤسسات الأكاديمية.',
                image: 'https://placehold.co/800x400/7C3AED/ffffff?text=Oxford',
                logo: 'https://placehold.co/200x200/7C3AED/ffffff?text=O',
                ranking_world: 2,
                ranking_local: 1,
                rating: 4.9,
                students_count: 24000,
                faculty_count: 7000,
                international_students: 9500,
                tuition_fee_min: 28000,
                tuition_fee_max: 45000,
                application_fee: 75,
                acceptance_rate: 17,
                programs_count: 120,
                is_active: true
            },
            {
                id: 3,
                name: 'معهد ماساتشوستس للتكنولوجيا',
                name_en: 'Massachusetts Institute of Technology',
                slug: 'mit',
                country: 'الولايات المتحدة',
                city: 'كامبريدج',
                website: 'https://www.mit.edu',
                type: 'private',
                founded_year: 1861,
                description: 'MIT هو معهد بحثي رائد عالمياً متخصص في العلوم والتكنولوجيا والهندسة.',
                image: 'https://placehold.co/800x400/2563EB/ffffff?text=MIT',
                logo: 'https://placehold.co/200x200/2563EB/ffffff?text=MIT',
                ranking_world: 1,
                ranking_local: 1,
                rating: 4.8,
                students_count: 11500,
                faculty_count: 1000,
                international_students: 3500,
                tuition_fee_min: 55000,
                tuition_fee_max: 58000,
                application_fee: 100,
                acceptance_rate: 7,
                programs_count: 100,
                is_active: true
            },
            {
                id: 4,
                name: 'جامعة كامبريدج',
                name_en: 'University of Cambridge',
                slug: 'cambridge-university',
                country: 'المملكة المتحدة',
                city: 'كامبريدج',
                website: 'https://www.cam.ac.uk',
                type: 'public',
                founded_year: 1209,
                description: 'جامعة كامبريدج هي ثاني أقدم جامعة في العالم الناطق بالإنجليزية ومعقل للتميز الأكاديمي.',
                image: 'https://placehold.co/800x400/DC2626/ffffff?text=Cambridge',
                logo: 'https://placehold.co/200x200/DC2626/ffffff?text=C',
                ranking_world: 3,
                ranking_local: 2,
                rating: 4.8,
                students_count: 23000,
                faculty_count: 6000,
                international_students: 7500,
                tuition_fee_min: 25000,
                tuition_fee_max: 42000,
                application_fee: 70,
                acceptance_rate: 21,
                programs_count: 110,
                is_active: true
            },
            {
                id: 5,
                name: 'جامعة ستانفورد',
                name_en: 'Stanford University',
                slug: 'stanford-university',
                country: 'الولايات المتحدة',
                city: 'ستانفورد',
                website: 'https://www.stanford.edu',
                type: 'private',
                founded_year: 1885,
                description: 'جامعة ستانفورد هي جامعة بحثية رائدة في قلب وادي السيليكون.',
                image: 'https://placehold.co/800x400/059669/ffffff?text=Stanford',
                logo: 'https://placehold.co/200x200/059669/ffffff?text=S',
                ranking_world: 2,
                ranking_local: 2,
                rating: 4.9,
                students_count: 17000,
                faculty_count: 2200,
                international_students: 3800,
                tuition_fee_min: 56000,
                tuition_fee_max: 58000,
                application_fee: 90,
                acceptance_rate: 4,
                programs_count: 140,
                is_active: true
            },
            {
                id: 6,
                name: 'جامعة برينستون',
                name_en: 'Princeton University',
                slug: 'princeton-university',
                country: 'الولايات المتحدة',
                city: 'برينستون',
                website: 'https://www.princeton.edu',
                type: 'private',
                founded_year: 1746,
                description: 'جامعة برينستون ربع جامعة Ivy League الخاصة المرموقة.',
                image: 'https://placehold.co/800x400/F59E0B/ffffff?text=Princeton',
                logo: 'https://placehold.co/200x200/F59E0B/ffffff?text=P',
                ranking_world: 4,
                rating: 4.8,
                students_count: 8400,
                programs_count: 80,
                is_active: true
            }
        ];
    }
}
