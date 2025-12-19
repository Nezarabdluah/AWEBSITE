import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Application, Pagination } from '../../../core/models';

/**
 * Application Service
 * خدمة إدارة الطلبات (Applications) مع Mock Data
 */
@Injectable({
    providedIn: 'root'
})
export class ApplicationService {
    private mockMode = true;
    private readonly STORAGE_KEY = 'application_draft';

    constructor() { }

    /**
     * جلب جميع طلبات المستخدم
     */
    getMyApplications(userId: number): Observable<Pagination<Application>> {
        if (this.mockMode) {
            const applications = this.getMockApplications().filter(a => a.user_id === userId);

            return of({
                data: applications,
                current_page: 1,
                last_page: 1,
                per_page: 10,
                total: applications.length,
                from: 1,
                to: applications.length
            }).pipe(delay(500));
        }

        return of({} as Pagination<Application>);
    }

    /**
     * جلب طلب واحد بالـ ID
     */
    getById(id: number): Observable<Application | null> {
        if (this.mockMode) {
            const application = this.getMockApplications().find(a => a.id === id);
            return of(application || null).pipe(delay(300));
        }
        return of(null);
    }

    /**
     * جلب جميع الطلبات (للـ Admin)
     */
    getAllApplications(): Observable<Application[]> {
        if (this.mockMode) {
            return of(this.getMockApplications()).pipe(delay(500));
        }
        return of([]);
    }

    /**
     * تقديم طلب جديد
     */
    submit(application: Partial<Application>): Observable<Application> {
        if (this.mockMode) {
            const newApp: Application = {
                id: Math.floor(Math.random() * 10000),
                user_id: application.user_id || 1,
                university_id: application.university_id!,
                specialization_id: application.specialization_id!,
                full_name: application.full_name!,
                email: application.email!,
                phone: application.phone!,
                date_of_birth: application.date_of_birth!,
                nationality: application.nationality!,
                address: application.address!,
                city: application.city!,
                country: application.country!,
                current_education_level: application.current_education_level!,
                gpa: application.gpa!,
                graduation_year: application.graduation_year!,
                status: 'submitted' as any,
                submitted_at: new Date().toISOString(),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            // Clear draft after submission
            this.clearDraft();

            return of(newApp).pipe(delay(1000));
        }

        return of({} as Application);
    }

    /**
     * حفظ مسودة
     */
    saveDraft(data: Partial<Application>): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    }

    /**
     * استرجاع مسودة
     */
    getDraft(): Partial<Application> | null {
        const draft = localStorage.getItem(this.STORAGE_KEY);
        return draft ? JSON.parse(draft) : null;
    }

    /**
     * حذف مسودة
     */
    clearDraft(): void {
        localStorage.removeItem(this.STORAGE_KEY);
    }

    /**
     * Mock Data
     */
    private getMockApplications(): Application[] {
        return [
            {
                id: 1,
                user_id: 1,
                university_id: 1,
                specialization_id: 1,
                full_name: 'أحمد محمد علي',
                email: 'ahmed@example.com',
                phone: '+966501234567',
                date_of_birth: '2000-01-15',
                nationality: 'السعودية',
                address: 'شارع الملك فهد',
                city: 'الرياض',
                country: 'السعودية',
                current_education_level: 'ثانوية عامة',
                gpa: 95.5,
                graduation_year: 2022,
                status: 'under_review' as any,
                submitted_at: '2024-12-01T10:00:00Z',
                created_at: '2024-12-01T10:00:00Z',
                updated_at: '2024-12-01T10:00:00Z'
            },
            {
                id: 2,
                user_id: 1,
                university_id: 2,
                specialization_id: 3,
                full_name: 'أحمد محمد علي',
                email: 'ahmed@example.com',
                phone: '+966501234567',
                date_of_birth: '2000-01-15',
                nationality: 'السعودية',
                address: 'شارع الملك فهد',
                city: 'الرياض',
                country: 'السعودية',
                current_education_level: 'ثانوية عامة',
                gpa: 95.5,
                graduation_year: 2022,
                status: 'accepted' as any,
                submitted_at: '2024-11-15T10:00:00Z',
                created_at: '2024-11-15T10:00:00Z',
                updated_at: '2024-11-20T10:00:00Z'
            }
        ];
    }
}
