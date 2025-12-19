import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { ArticleCardComponent } from '../article-card/article-card.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { Article, FilterOptions } from '../../../../core/models';

/**
 * Article List Component
 * قائمة المقالات التعليمية
 */
@Component({
    selector: 'app-article-list',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        ArticleCardComponent,
        PaginationComponent,
        LoadingSpinnerComponent
    ],
    templateUrl: './article-list.component.html',
    styleUrl: './article-list.component.scss'
})
export class ArticleListComponent implements OnInit {
    articles = signal<Article[]>([]);
    featuredArticles = signal<Article[]>([]);
    loading = signal(true);
    error = signal<string | null>(null);

    currentPage = signal(1);
    totalPages = signal(1);
    total = signal(0);

    filters: FilterOptions = {
        page: 1,
        per_page: 9
    };

    searchQuery = signal('');
    selectedCategory = signal<string | undefined>(undefined);

    categories = [
        'دراسة في الخارج',
        'منح دراسية',
        'اختبارات',
        'تخصصات',
        'نصائح'
    ];

    constructor(private articleService: ArticleService) { }

    ngOnInit(): void {
        this.loadArticles();
    }

    loadArticles(): void {
        this.loading.set(true);
        this.error.set(null);

        this.articleService.getAll(this.filters).subscribe({
            next: (response) => {
                this.articles.set(response.data);

                // Get featured articles (first page only)
                if (this.currentPage() === 1) {
                    this.featuredArticles.set(response.data.filter(a => a.is_featured).slice(0, 3));
                }

                this.currentPage.set(response.current_page);
                this.totalPages.set(response.last_page);
                this.total.set(response.total);
                this.loading.set(false);
            },
            error: (err) => {
                this.error.set('حدث خطأ أثناء تحميل المقالات');
                this.loading.set(false);
                console.error('Error loading articles:', err);
            }
        });
    }

    onPageChange(page: number): void {
        this.filters.page = page;
        this.loadArticles();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    onSearch(query: string): void {
        this.searchQuery.set(query);
        this.filters.search = query || undefined;
        this.filters.page = 1;
        this.loadArticles();
    }

    onCategoryChange(category: string): void {
        this.selectedCategory.set(category || undefined);
        this.filters.category = category || undefined;
        this.filters.page = 1;
        this.loadArticles();
    }

    clearFilters(): void {
        this.searchQuery.set('');
        this.selectedCategory.set(undefined);
        this.filters = { page: 1, per_page: 9 };
        this.loadArticles();
    }
}
