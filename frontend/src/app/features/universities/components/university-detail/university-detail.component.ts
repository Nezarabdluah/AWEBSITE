import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UniversityService } from '../../services/university.service';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { University } from '../../../../core/models';

/**
 * University Detail Component
 * صفحة تفاصيل الجامعة الكاملة
 */
@Component({
    selector: 'app-university-detail',
    standalone: true,
    imports: [CommonModule, RouterModule, LoadingSpinnerComponent, BreadcrumbComponent],
    templateUrl: './university-detail.component.html',
    styleUrl: './university-detail.component.scss'
})
export class UniversityDetailComponent implements OnInit {
    university = signal<University | null>(null);
    loading = signal(true);
    error = signal<string | null>(null);
    activeTab = signal<'overview' | 'programs' | 'admission' | 'contact'>('overview');

    breadcrumbs = [
        { label: 'الرئيسية', route: '/' },
        { label: 'الجامعات', route: '/universities' },
        { label: 'تفاصيل الجامعة', route: '' }
    ];

    constructor(
        private route: ActivatedRoute,
        private universityService: UniversityService
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const id = +params['id'];
            if (id) {
                this.loadUniversity(id);
            }
        });
    }

    loadUniversity(id: number): void {
        this.loading.set(true);
        this.error.set(null);

        this.universityService.getById(id).subscribe({
            next: (university) => {
                if (university) {
                    this.university.set(university);
                    this.breadcrumbs[2].label = university.name;
                } else {
                    this.error.set('الجامعة غير موجودة');
                }
                this.loading.set(false);
            },
            error: (err) => {
                this.error.set('حدث خطأ أثناء تحميل بيانات الجامعة');
                this.loading.set(false);
                console.error('Error loading university:', err);
            }
        });
    }

    setActiveTab(tab: 'overview' | 'programs' | 'admission' | 'contact'): void {
        this.activeTab.set(tab);
    }

    formatNumber(num?: number): string {
        if (!num) return '-';
        return num.toLocaleString('ar-EG');
    }

    formatCurrency(amount?: number): string {
        if (!amount) return '-';
        return `$${amount.toLocaleString('en-US')}`;
    }

    applyNow(): void {
        console.log('Apply to university:', this.university()?.id);
        // TODO: Navigate to application form
    }

    addToFavorites(): void {
        console.log('Add to favorites:', this.university()?.id);
        // TODO: Implement favorites
    }
}
