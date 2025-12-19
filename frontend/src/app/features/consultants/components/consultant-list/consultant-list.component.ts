import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConsultantService } from '../../services/consultant.service';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { Consultant, FilterOptions } from '../../../../core/models';

/**
 * Consultant List Component
 * قائمة المستشارين التعليميين
 */
@Component({
    selector: 'app-consultant-list',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        PaginationComponent,
        LoadingSpinnerComponent
    ],
    templateUrl: './consultant-list.component.html',
    styleUrl: './consultant-list.component.scss'
})
export class ConsultantListComponent implements OnInit {
    consultants = signal<Consultant[]>([]);
    loading = signal(true);
    error = signal<string | null>(null);

    currentPage = signal(1);
    totalPages = signal(1);
    total = signal(0);

    filters: FilterOptions = {
        page: 1,
        per_page: 12
    };

    searchQuery = signal('');
    selectedSpecialty = signal<string | undefined>(undefined);

    specialties = [
        'استشارات الدراسة في أمريكا',
        'استشارات الدراسة في بريطانيا',
        'استشارات الدراسة في كندا',
        'استشارات المنح الدراسية',
        'استشارات الدراسة في ألمانيا',
        'استشارات اختبارات القبول'
    ];

    constructor(private consultantService: ConsultantService) { }

    ngOnInit(): void {
        this.loadConsultants();
    }

    loadConsultants(): void {
        this.loading.set(true);
        this.error.set(null);

        this.consultantService.getAll(this.filters).subscribe({
            next: (response) => {
                this.consultants.set(response.data);
                this.currentPage.set(response.current_page);
                this.totalPages.set(response.last_page);
                this.total.set(response.total);
                this.loading.set(false);
            },
            error: (err) => {
                this.error.set('حدث خطأ أثناء تحميل المستشارين');
                this.loading.set(false);
                console.error('Error loading consultants:', err);
            }
        });
    }

    onPageChange(page: number): void {
        this.filters.page = page;
        this.loadConsultants();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    onSearch(query: string): void {
        this.searchQuery.set(query);
        this.filters.search = query || undefined;
        this.filters.page = 1;
        this.loadConsultants();
    }

    onSpecialtyChange(specialty: string): void {
        this.selectedSpecialty.set(specialty || undefined);
        this.filters.specialty = specialty || undefined;
        this.filters.page = 1;
        this.loadConsultants();
    }

    clearFilters(): void {
        this.searchQuery.set('');
        this.selectedSpecialty.set(undefined);
        this.filters = { page: 1, per_page: 12 };
        this.loadConsultants();
    }

    formatNumber(num?: number): string {
        if (!num) return '0';
        return num.toLocaleString('ar-EG');
    }
}
