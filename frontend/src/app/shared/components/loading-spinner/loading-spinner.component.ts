import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Loading Spinner Component - مؤشر التحميل
 * 
 * @example
 * <app-loading-spinner [size]="'large'" [text]="'جاري التحميل...'"></app-loading-spinner>
 */
@Component({
    selector: 'app-loading-spinner',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './loading-spinner.component.html',
    styleUrl: './loading-spinner.component.scss'
})
export class LoadingSpinnerComponent {
    @Input() size: 'small' | 'medium' | 'large' = 'medium';
    @Input() text?: string;
    @Input() overlay: boolean = false;
    @Input() color: string = 'var(--primary-color)';
}
