import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { University } from '../../../../core/models';

/**
 * University Card Component
 * بطاقة جامعة قابلة لإعادة الاستخدام
 */
@Component({
    selector: 'app-university-card',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './university-card.component.html',
    styleUrl: './university-card.component.scss'
})
export class UniversityCardComponent {
    @Input() university!: University;
    @Input() showActions: boolean = true;
    @Input() compact: boolean = false;

    @Output() viewDetails = new EventEmitter<number>();
    @Output() addToFavorites = new EventEmitter<number>();

    onViewDetails(): void {
        this.viewDetails.emit(this.university.id);
    }

    onAddToFavorites(event: Event): void {
        event.stopPropagation();
        event.preventDefault();
        this.addToFavorites.emit(this.university.id);
    }

    formatNumber(num?: number): string {
        if (!num) return '-';
        return num.toLocaleString('ar-EG');
    }

    formatCurrency(amount?: number): string {
        if (!amount) return '-';
        return `$${amount.toLocaleString('en-US')}`;
    }
}
