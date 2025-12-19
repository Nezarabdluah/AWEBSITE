import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Article } from '../../../../core/models';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';

/**
 * Article Card Component
 * بطاقة مقالة قابلة لإعادة الاستخدام
 */
@Component({
    selector: 'app-article-card',
    standalone: true,
    imports: [CommonModule, RouterModule, TimeAgoPipe],
    templateUrl: './article-card.component.html',
    styleUrl: './article-card.component.scss'
})
export class ArticleCardComponent {
    @Input() article!: Article;
    @Input() featured: boolean = false;

    @Output() viewDetails = new EventEmitter<number>();

    onViewDetails(): void {
        this.viewDetails.emit(this.article.id);
    }

    formatViews(views?: number): string {
        if (!views) return '0';
        if (views >= 1000) {
            return `${(views / 1000).toFixed(1)}K`;
        }
        return views.toString();
    }
}
