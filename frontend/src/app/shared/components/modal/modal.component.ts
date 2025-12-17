import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Modal Component - نافذة منبثقة
 * 
 * @example
 * <app-modal 
 *   [isOpen]="showModal" 
 *   [title]="'عنوان'" 
 *   (close)="showModal = false">
 *   <p>المحتوى هنا</p>
 * </app-modal>
 */
@Component({
    selector: 'app-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.scss'
})
export class ModalComponent {
    @Input() isOpen: boolean = false;
    @Input() title?: string;
    @Input() size: 'small' | 'medium' | 'large' | 'fullscreen' = 'medium';
    @Input() closeOnBackdrop: boolean = true;
    @Input() showCloseButton: boolean = true;

    @Output() close = new EventEmitter<void>();

    @HostListener('document:keydown.escape')
    onEscapeKey(): void {
        if (this.isOpen) {
            this.closeModal();
        }
    }

    closeModal(): void {
        this.close.emit();
    }

    onBackdropClick(): void {
        if (this.closeOnBackdrop) {
            this.closeModal();
        }
    }

    onModalClick(event: Event): void {
        event.stopPropagation();
    }
}
