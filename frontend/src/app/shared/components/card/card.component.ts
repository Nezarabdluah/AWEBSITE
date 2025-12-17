import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Card Component - بطاقة عامة قابلة لإعادة الاستخدام
 * 
 * @example
 * <app-card [title]="'عنوان'" [hoverable]="true">
 *   <p>المحتوى هنا</p>
 * </app-card>
 */
@Component({
    selector: 'app-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss'
})
export class CardComponent {
    @Input() title?: string;
    @Input() subtitle?: string;
    @Input() imageUrl?: string;
    @Input() hoverable: boolean = false;
    @Input() clickable: boolean = false;
    @Input() loading: boolean = false;

    @Output() cardClick = new EventEmitter<void>();

    onCardClick(): void {
        if (this.clickable && !this.loading) {
            this.cardClick.emit();
        }
    }
}
