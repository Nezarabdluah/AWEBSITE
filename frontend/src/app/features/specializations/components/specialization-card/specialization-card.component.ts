import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Specialization } from '../../../../core/models';

/**
 * Specialization Card Component
 * بطاقة تخصص دراسي قابلة لإعادة الاستخدام
 */
@Component({
    selector: 'app-specialization-card',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './specialization-card.component.html',
    styleUrl: './specialization-card.component.scss'
})
export class SpecializationCardComponent {
    @Input() specialization!: Specialization;
    @Input() showActions: boolean = true;

    @Output() viewDetails = new EventEmitter<number>();

    onViewDetails(): void {
        this.viewDetails.emit(this.specialization.id);
    }

    formatNumber(num?: number): string {
        if (!num) return '-';
        return num.toLocaleString('ar-EG');
    }

    formatSalary(salary?: number): string {
        if (!salary) return '-';
        return `$${(salary / 1000).toFixed(0)}K`;
    }

    getCategoryLabel(category: string): string {
        const labels: { [key: string]: string } = {
            'engineering': 'هندسة',
            'health': 'صحة',
            'business': 'أعمال',
            'technology': 'تقنية',
            'humanities': 'إنسانيات',
            'science': 'علوم'
        };
        return labels[category] || category;
    }

    getCategoryIcon(category: string): string {
        const icons: { [key: string]: string } = {
            'engineering': '⚙️',
            'health': '🏥',
            'business': '💼',
            'technology': '💻',
            'humanities': '📚',
            'science': '🔬'
        };
        return icons[category] || '📖';
    }
}
