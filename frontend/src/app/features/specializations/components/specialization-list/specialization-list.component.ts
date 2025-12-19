import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SpecializationService } from '../../services/specialization.service';
import { SpecializationCardComponent } from '../specialization-card/specialization-card.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { Specialization, FilterOptions } from '../../../../core/models';

/**
 * Specialization List Component
 * قائمة التخصصات الدراسية
 */
@Component({
    selector: 'app-specialization-list',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        SpecializationCardComponent,
        PaginationComponent,
        LoadingSpinnerComponent
    ],
    templateUrl: './specialization-list.component.html',
    styleUrl: './specialization-list.component.scss'
})
export class SpecializationListComponent implements OnInit {
    specializations = signal<Specialization[]>([]);
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
    selectedCategory = signal<string | undefined>(undefined);

    categories = [
        { value: 'engineering', label: 'هندسة', icon: '⚙️' },
        { value: 'health', label: 'صحة', icon: '🏥' },
        { value: 'business', label: 'أعمال', icon: '💼' },
        { value: 'technology', label: 'تقنية', icon: '💻' },
        { value: 'humanities', label: 'إنسانيات', icon: '📚' },
        { value: 'science', label: 'علوم', icon: '🔬' }
    ];

    constructor(private specializationService: SpecializationService) { }

    ngOnInit(): void {
        this.loadSpecializations();
    }

    loadSpecializations(): void {
        this.loading.set(true);
        this.error.set(null);

        this.specializationService.getAll(this.filters).subscribe({
            next: (response) => {
                this.specializations.set(response.data);
                this.currentPage.set(response.current_page);
                this.totalPages.set(response.last_page);
                this.total.set(response.total);
                this.loading.set(false);
            },
            error: (err) => {
                this.error.set('حدث خطأ أثناء تحميل التخصصات');
                this.loading.set(false);
                console.error('Error loading specializations:', err);
            }
        });
    }

    onPageChange(page: number): void {
        this.filters.page = page;
        this.loadSpecializations();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    onSearch(query: string): void {
        this.searchQuery.set(query);
        this.filters.search = query || undefined;
        this.filters.page = 1;
        this.loadSpecializations();
    }

    onCategoryChange(category: string): void {
        this.selectedCategory.set(category || undefined);
        this.filters.category = category || undefined;
        this.filters.page = 1;
        this.loadSpecializations();
    }

    clearFilters(): void {
        this.searchQuery.set('');
        this.selectedCategory.set(undefined);
        this.filters = { page: 1, per_page: 12 };
        this.loadSpecializations();
    }
}
