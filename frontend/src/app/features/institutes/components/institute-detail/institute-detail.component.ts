import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { InstituteService } from '../../services/institute.service';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { Institute } from '../../../../core/models';

/**
 * Institute Detail Component
 * صفحة تفاصيل المعهد الكاملة
 */
@Component({
    selector: 'app-institute-detail',
    standalone: true,
    imports: [CommonModule, RouterModule, LoadingSpinnerComponent, BreadcrumbComponent],
    templateUrl: './institute-detail.component.html',
    styleUrl: './institute-detail.component.scss'
})
export class InstituteDetailComponent implements OnInit {
    institute = signal<Institute | null>(null);
    loading = signal(true);
    error = signal<string | null>(null);
    activeTab = signal<'overview' | 'programs' | 'admission' | 'contact'>('overview');

    breadcrumbs = [
        { label: 'الرئيسية', route: '/' },
        { label: 'المعاهد', route: '/institutes' },
        { label: 'تفاصيل المعهد', route: '' }
    ];

    constructor(
        private route: ActivatedRoute,
        private instituteService: InstituteService
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const id = +params['id'];
            if (id) {
                this.loadInstitute(id);
            }
        });
    }

    loadInstitute(id: number): void {
        this.loading.set(true);
        this.error.set(null);

        this.instituteService.getById(id).subscribe({
            next: (institute) => {
                if (institute) {
                    this.institute.set(institute);
                    this.breadcrumbs[2].label = institute.name;
                } else {
                    this.error.set('المعهد غير موجود');
                }
                this.loading.set(false);
            },
            error: (err) => {
                this.error.set('حدث خطأ أثناء تحميل بيانات المعهد');
                this.loading.set(false);
                console.error('Error loading institute:', err);
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

    getTypeLabel(type: string): string {
        const labels: { [key: string]: string } = {
            'college': 'كلية',
            'faculty': 'كلية',
            'school': 'مدرسة',
            'institute': 'معهد',
            'department': 'قسم'
        };
        return labels[type] || type;
    }

    applyNow(): void {
        console.log('Apply to institute:', this.institute()?.id);
        // TODO: Navigate to application form
    }
}
