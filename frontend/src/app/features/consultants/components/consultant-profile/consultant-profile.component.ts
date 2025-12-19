import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ConsultantService } from '../../services/consultant.service';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { Consultant } from '../../../../core/models';

/**
 * Consultant Profile Component
 * صفحة الملف الشخصي للمستشار
 */
@Component({
    selector: 'app-consultant-profile',
    standalone: true,
    imports: [CommonModule, RouterModule, LoadingSpinnerComponent, BreadcrumbComponent],
    templateUrl: './consultant-profile.component.html',
    styleUrl: './consultant-profile.component.scss'
})
export class ConsultantProfileComponent implements OnInit {
    consultant = signal<Consultant | null>(null);
    loading = signal(true);
    error = signal<string | null>(null);

    breadcrumbs = [
        { label: 'الرئيسية', route: '/' },
        { label: 'المستشارون', route: '/consultants' },
        { label: 'الملف الشخصي', route: '' }
    ];

    constructor(
        private route: ActivatedRoute,
        private consultantService: ConsultantService
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const id = +params['id'];
            if (id) {
                this.loadConsultant(id);
            }
        });
    }

    loadConsultant(id: number): void {
        this.loading.set(true);
        this.error.set(null);

        this.consultantService.getById(id).subscribe({
            next: (consultant) => {
                if (consultant) {
                    this.consultant.set(consultant);
                    this.breadcrumbs[2].label = consultant.name;
                } else {
                    this.error.set('المستشار غير موجود');
                }
                this.loading.set(false);
            },
            error: (err) => {
                this.error.set('حدث خطأ أثناء تحميل بيانات المستشار');
                this.loading.set(false);
                console.error('Error loading consultant:', err);
            }
        });
    }

    formatNumber(num?: number): string {
        if (!num) return '0';
        return num.toLocaleString('ar-EG');
    }

    bookConsultation(): void {
        console.log('Book consultation with:', this.consultant()?.id);
        // TODO: Navigate to booking form
    }

    sendMessage(): void {
        console.log('Send message to:', this.consultant()?.id);
        // TODO: Open chat or email
    }
}
