import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InstituteService } from '../../services/institute.service';
import { InstituteCardComponent } from '../institute-card/institute-card.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { Institute, FilterOptions } from '../../../../core/models';

/**
 * Institute List Component
 * صفحة قائمة المعاهد مع البحث والفلترة
 */
@Component({
    selector: 'app-institute-list',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        InstituteCardComponent,
        PaginationComponent,
        LoadingSpinnerComponent
    ],
    templateUrl: './institute-list.component.html',
    styleUrl: './institute-list.component.scss'
})
export class InstituteListComponent implements OnInit {
    institutes = signal<Institute[]>([]);
    loading = signal(true);
    error = signal<string | null>(null);

    // Pagination
    currentPage = signal(1);
    totalPages = signal(1);
    perPage = 12;
    total = signal(0);

    // Filters
    filters: FilterOptions = {
        page: 1,
        per_page: 12,
        sort_by: 'name',
        sort_order: 'asc'
    };

    // Filter values
    searchQuery = signal('');
    selectedType = signal<string | undefined>(undefined);

    instituteTypes = [
        { value: 'college', label: 'كلية' },
        { value: 'faculty', label: 'كلية' },
        { value: 'school', label: 'مدرسة' },
        { value: 'institute', label: 'معهد' },
        { value: 'department', label: 'قسم' }
    ];

    constructor(private instituteService: InstituteService) { }

    ngOnInit(): void {
        this.loadInstitutes();
    }

    loadInstitutes(): void {
        this.loading.set(true);
        this.error.set(null);

        this.instituteService.getAll(this.filters).subscribe({
            next: (response) => {
                this.institutes.set(response.data);
                this.currentPage.set(response.current_page);
                this.totalPages.set(response.last_page);
                this.total.set(response.total);
                this.loading.set(false);
            },
            error: (err) => {
                this.error.set('حدث خطأ أثناء تحميل المعاهد');
                this.loading.set(false);
                console.error('Error loading institutes:', err);
            }
        });
    }

    onPageChange(page: number): void {
        this.filters.page = page;
        this.loadInstitutes();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    onSearch(query: string): void {
        this.searchQuery.set(query);
        this.filters.search = query || undefined;
        this.filters.page = 1;
        this.loadInstitutes();
    }

    onTypeChange(type: string): void {
        this.selectedType.set(type || undefined);
        this.filters.type = type || undefined;
        this.filters.page = 1;
        this.loadInstitutes();
    }

    onSortChange(sortBy: string): void {
        this.filters.sort_by = sortBy;
        this.filters.page = 1;
        this.loadInstitutes();
    }

    clearFilters(): void {
        this.searchQuery.set('');
        this.selectedType.set(undefined);
        this.filters = {
            page: 1,
            per_page: 12,
            sort_by: 'name',
            sort_order: 'asc'
        };
        this.loadInstitutes();
    }

    onViewDetails(id: number): void {
        // Navigation handled by router
    }
}
