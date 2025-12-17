import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Pagination Component - مكون الترقيم
 * 
 * @example
 * <app-pagination 
 *   [currentPage]="1" 
 *   [totalPages]="10" 
 *   (pageChange)="onPageChange($event)">
 * </app-pagination>
 */
@Component({
    selector: 'app-pagination',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
    @Input() currentPage: number = 1;
    @Input() totalPages: number = 1;
    @Input() maxVisiblePages: number = 5;

    @Output() pageChange = new EventEmitter<number>();

    get pages(): number[] {
        const pages: number[] = [];
        const half = Math.floor(this.maxVisiblePages / 2);

        let start = Math.max(1, this.currentPage - half);
        let end = Math.min(this.totalPages, start + this.maxVisiblePages - 1);

        if (end - start + 1 < this.maxVisiblePages) {
            start = Math.max(1, end - this.maxVisiblePages + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    }

    goToPage(page: number): void {
        if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
            this.pageChange.emit(page);
        }
    }

    previousPage(): void {
        this.goToPage(this.currentPage - 1);
    }

    nextPage(): void {
        this.goToPage(this.currentPage + 1);
    }
}
