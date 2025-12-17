import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Institute } from '../../../../core/models';

/**
 * Institute Card Component
 * بطاقة معهد/كلية قابلة لإعادة الاستخدام
 */
@Component({
    selector: 'app-institute-card',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './institute-card.component.html',
    styleUrl: './institute-card.component.scss'
})
export class InstituteCardComponent {
    @Input() institute!: Institute;
    @Input() showActions: boolean = true;

    @Output() viewDetails = new EventEmitter<number>();

    onViewDetails(): void {
        this.viewDetails.emit(this.institute.id);
    }

    formatNumber(num?: number): string {
        if (!num) return '-';
        return num.toLocaleString('ar-EG');
    }

    getTypeLabel(type: string): string {
        const labels: { [key: string]: string } = {
            'college': 'كلية',
            'faculty': 'كلية',
            'school': 'مدرسة',
            'institute': 'معهد',
            'department': 'قسم'
        };
        return labels[type] || type;
    }
}
