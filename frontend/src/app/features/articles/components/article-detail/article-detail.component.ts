import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';
import { Article } from '../../../../core/models';

/**
 * Article Detail Component
 * صفحة تفاصيل المقالة
 */
@Component({
    selector: 'app-article-detail',
    standalone: true,
    imports: [CommonModule, RouterModule, LoadingSpinnerComponent, BreadcrumbComponent, TimeAgoPipe],
    templateUrl: './article-detail.component.html',
    styleUrl: './article-detail.component.scss'
})
export class ArticleDetailComponent implements OnInit {
    article = signal<Article | null>(null);
    loading = signal(true);
    error = signal<string | null>(null);

    breadcrumbs = [
        { label: 'الرئيسية', route: '/' },
        { label: 'المقالات', route: '/articles' },
        { label: 'تفاصيل المقالة', route: '' }
    ];

    constructor(
        private route: ActivatedRoute,
        private articleService: ArticleService
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const id = +params['id'];
            if (id) {
                this.loadArticle(id);
            }
        });
    }

    loadArticle(id: number): void {
        this.loading.set(true);
        this.error.set(null);

        this.articleService.getById(id).subscribe({
            next: (article) => {
                if (article) {
                    this.article.set(article);
                    this.breadcrumbs[2].label = article.title;
                } else {
                    this.error.set('المقالة غير موجودة');
                }
                this.loading.set(false);
            },
            error: (err) => {
                this.error.set('حدث خطأ أثناء تحميل المقالة');
                this.loading.set(false);
                console.error('Error loading article:', err);
            }
        });
    }

    formatViews(views?: number): string {
        if (!views) return '0';
        return views.toLocaleString('ar-EG');
    }
}
