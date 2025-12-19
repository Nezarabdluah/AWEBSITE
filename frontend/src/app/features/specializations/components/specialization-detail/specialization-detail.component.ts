import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SpecializationService } from '../../services/specialization.service';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { Specialization } from '../../../../core/models';

/**
 * Specialization Detail Component
 * صفحة تفاصيل التخصص الدراسي
 */
@Component({
    selector: 'app-specialization-detail',
    standalone: true,
    imports: [CommonModule, RouterModule, LoadingSpinnerComponent, BreadcrumbComponent],
    templateUrl: './specialization-detail.component.html',
    styleUrl: './specialization-detail.component.scss'
})
export class SpecializationDetailComponent implements OnInit {
    specialization = signal<Specialization | null>(null);
    loading = signal(true);
    error = signal<string | null>(null);

    breadcrumbs = [
        { label: 'الرئيسية', route: '/' },
        { label: 'التخصصات', route: '/specializations' },
        { label: 'تفاصيل التخصص', route: '' }
    ];

    constructor(
        private route: ActivatedRoute,
        private specializationService: SpecializationService
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const id = +params['id'];
            if (id) {
                this.loadSpecialization(id);
            }
        });
    }

    loadSpecialization(id: number): void {
        this.loading.set(true);
        this.error.set(null);

        this.specializationService.getById(id).subscribe({
            next: (specialization) => {
                if (specialization) {
                    this.specialization.set(specialization);
                    this.breadcrumbs[2].label = specialization.name;
                } else {
                    this.error.set('التخصص غير موجود');
                }
                this.loading.set(false);
            },
            error: (err) => {
                this.error.set('حدث خطأ أثناء تحميل بيانات التخصص');
                this.loading.set(false);
                console.error('Error loading specialization:', err);
            }
        });
    }

    getCategoryLabel(category: string): string {
        const labels: { [key: string]: string } = {
            'engineering': 'هندسة',
            'health': 'صحة',
            'business': 'أعمال',
            'technology': 'تقنية',
            'humanities': 'إنسانيات',
            'science': 'علوم'
        };
        return labels[category] || category;
    }

    getCategoryIcon(category: string): string {
        const icons: { [key: string]: string } = {
            'engineering': '⚙️',
            'health': '🏥',
            'business': '💼',
            'technology': '💻',
            'humanities': '📚',
            'science': '🔬'
        };
        return icons[category] || '📖';
    }

    formatSalary(salary?: number): string {
        if (!salary) return '-';
        return `$${(salary / 1000).toFixed(0)}K`;
    }

    formatNumber(num?: number): string {
        if (!num) return '-';
        return num.toLocaleString('ar-EG');
    }

    exploreUniversities(): void {
        console.log('Explore universities for:', this.specialization()?.id);
        // TODO: Navigate to universities filtered by this specialization
    }
}
