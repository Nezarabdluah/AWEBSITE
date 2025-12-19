import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Consultant, FilterOptions, Pagination } from '../../../core/models';

/**
 * Consultant Service
 * خدمة إدارة المستشارين التعليميين مع Mock Data
 */
@Injectable({
    providedIn: 'root'
})
export class ConsultantService {
    private mockMode = true;

    constructor() { }

    /**
     * جلب جميع المستشارين
     */
    getAll(filters?: FilterOptions): Observable<Pagination<Consultant>> {
        if (this.mockMode) {
            let consultants = this.getMockConsultants();

            // Apply filters
            if (filters) {
                if (filters.search) {
                    const search = filters.search.toLowerCase();
                    consultants = consultants.filter(c =>
                        c.name.toLowerCase().includes(search) ||
                        c.specialty?.toLowerCase().includes(search) ||
                        c.bio?.toLowerCase().includes(search)
                    );
                }

                if (filters.specialty) {
                    consultants = consultants.filter(c => c.specialty === filters.specialty);
                }
            }

            // Pagination
            const page = filters?.page || 1;
            const perPage = filters?.per_page || 12;
            const total = consultants.length;
            const startIndex = (page - 1) * perPage;
            const endIndex = startIndex + perPage;
            const paginatedData = consultants.slice(startIndex, endIndex);

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

        return of({} as Pagination<Consultant>);
    }

    /**
     * جلب مستشار واحد بالـ ID
     */
    getById(id: number): Observable<Consultant | null> {
        if (this.mockMode) {
            const consultant = this.getMockConsultants().find(c => c.id === id);
            return of(consultant || null).pipe(delay(300));
        }
        return of(null);
    }

    /**
     * البحث عن المستشارين
     */
    search(query: string): Observable<Consultant[]> {
        if (this.mockMode) {
            const results = this.getMockConsultants().filter(c =>
                c.name.toLowerCase().includes(query.toLowerCase()) ||
                c.specialty?.toLowerCase().includes(query.toLowerCase())
            );
            return of(results).pipe(delay(300));
        }
        return of([]);
    }

    /**
     * Mock Data - بيانات تجريبية
     */
    private getMockConsultants(): Consultant[] {
        return [
            {
                id: 1,
                name: 'د. أحمد محمود',
                email: 'ahmed.mahmoud@example.com',
                phone: '+966501234567',
                specialty: 'استشارات الدراسة في أمريكا',
                bio: 'خبير في القبول الجامعي الأمريكي مع أكثر من 10 سنوات خبرة',
                experience_years: 12,
                rating: 4.9,
                consultations_count: 350,
                image: 'https://i.pravatar.cc/300?img=12',
                is_available: true,
                languages: ['العربية', 'الإنجليزية'],
                is_active: true
            },
            {
                id: 2,
                name: 'د. سارة العلي',
                email: 'sara.alali@example.com',
                phone: '+966502345678',
                specialty: 'استشارات الدراسة في بريطانيا',
                bio: 'متخصصة في القبول بالجامعات البريطانية والمنح الدراسية',
                experience_years: 8,
                rating: 4.8,
                consultations_count: 280,
                image: 'https://i.pravatar.cc/300?img=45',
                is_available: true,
                languages: ['العربية', 'الإنجليزية'],
                is_active: true
            },
            {
                id: 3,
                name: 'د. محمد الخطيب',
                email: 'mohamed.khatib@example.com',
                phone: '+966503456789',
                specialty: 'استشارات الدراسة في كندا',
                bio: 'خبير في التقديم للجامعات الكندية والحصول على التأشيرات',
                experience_years: 10,
                rating: 4.7,
                consultations_count: 420,
                image: 'https://i.pravatar.cc/300?img=33',
                is_available: true,
                languages: ['العربية', 'الإنجليزية', 'الفرنسية'],
                is_active: true
            },
            {
                id: 4,
                name: 'د. فاطمة حسن',
                email: 'fatima.hassan@example.com',
                phone: '+966504567890',
                specialty: 'استشارات المنح الدراسية',
                bio: 'متخصصة في إيجاد وتأمين المنح الدراسية الكاملة والجزئية',
                experience_years: 15,
                rating: 5.0,
                consultations_count: 500,
                image: 'https://i.pravatar.cc/300?img=48',
                is_available: false,
                languages: ['العربية', 'الإنجليزية'],
                is_active: true
            },
            {
                id: 5,
                name: 'د. خالد السعيد',
                email: 'khaled.alsaeed@example.com',
                phone: '+966505678901',
                specialty: 'استشارات الدراسة في ألمانيا',
                bio: 'خبير في النظام التعليمي الألماني والقبول الجامعي',
                experience_years: 7,
                rating: 4.6,
                consultations_count: 200,
                image: 'https://i.pravatar.cc/300?img=15',
                is_available: true,
                languages: ['العربية', 'الإنجليزية', 'الألمانية'],
                is_active: true
            },
            {
                id: 6,
                name: 'د. مريم الزهراني',
                email: 'mariam.zahrani@example.com',
                phone: '+966506789012',
                specialty: 'استشارات اختبارات القبول',
                bio: 'متخصصة في تحضير الطلاب لاختبارات TOEFL, IELTS, SAT, GRE',
                experience_years: 9,
                rating: 4.9,
                consultations_count: 380,
                image: 'https://i.pravatar.cc/300?img=20',
                is_available: true,
                languages: ['العربية', 'الإنجليزية'],
                is_active: true
            }
        ];
    }
}
