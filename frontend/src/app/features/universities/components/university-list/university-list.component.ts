import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UniversityService } from '../../services/university.service';
import { UniversityCardComponent } from '../university-card/university-card.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { University, FilterOptions } from '../../../../core/models';

/**
 * University List Component
 * صفحة قائمة الجامعات مع الفلتر والترقيم
 */
@Component({
    selector: 'app-university-list',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        UniversityCardComponent,
        PaginationComponent,
        LoadingSpinnerComponent
    ],
    templateUrl: './university-list.component.html',
    styleUrl: './university-list.component.scss'
})
export class UniversityListComponent implements OnInit {
    universities = signal<University[]>([]);
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
        sort_by: 'ranking_world',
        sort_order: 'asc'
    };

    // Filter values
    countries = signal<string[]>([]);
    selectedCountry = signal<string | undefined>(undefined);
    searchQuery = signal('');

    constructor(private universityService: UniversityService) { }

    ngOnInit(): void {
        this.loadCountries();
        this.loadUniversities();
    }

    loadCountries(): void {
        this.universityService.getCountries().subscribe({
            next: (countries) => this.countries.set(countries),
            error: (err) => console.error('Error loading countries:', err)
        });
    }

    loadUniversities(): void {
        this.loading.set(true);
        this.error.set(null);

        this.universityService.getAll(this.filters).subscribe({
            next: (response) => {
                this.universities.set(response.data);
                this.currentPage.set(response.current_page);
                this.totalPages.set(response.last_page);
                this.total.set(response.total);
                this.loading.set(false);
            },
            error: (err) => {
                this.error.set('حدث خطأ أثناء تحميل الجامعات');
                this.loading.set(false);
                console.error('Error loading universities:', err);
            }
        });
    }

    onPageChange(page: number): void {
        this.filters.page = page;
        this.loadUniversities();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    onCountryChange(country: string): void {
        this.selectedCountry.set(country || undefined);
        this.filters.country = country || undefined;
        this.filters.page = 1;
        this.loadUniversities();
    }

    onSearch(query: string): void {
        this.searchQuery.set(query);
        this.filters.search = query || undefined;
        this.filters.page = 1;
        this.loadUniversities();
    }

    onSortChange(sortBy: string): void {
        this.filters.sort_by = sortBy;
        this.filters.page = 1;
        this.loadUniversities();
    }

    clearFilters(): void {
        this.selectedCountry.set(undefined);
        this.searchQuery.set('');
        this.filters = {
            page: 1,
            per_page: 12,
            sort_by: 'ranking_world',
            sort_order: 'asc'
        };
        this.loadUniversities();
    }

    onViewDetails(id: number): void {
        // Navigation handled by router
    }

    onAddToFavorites(id: number): void {
        console.log('Add to favorites:', id);
        // TODO: Implement favorites functionality
    }
}
