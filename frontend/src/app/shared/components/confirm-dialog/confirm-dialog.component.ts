import { Component, Injectable, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ConfirmDialogData {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'default' | 'danger';
}

/**
 * Confirm Dialog Service
 */
@Injectable({
    providedIn: 'root'
})
export class ConfirmDialogService {
    isOpen = signal(false);
    data = signal<ConfirmDialogData | null>(null);
    private resolveCallback?: (result: boolean) => void;

    confirm(data: ConfirmDialogData): Promise<boolean> {
        this.data.set({
            ...data,
            confirmText: data.confirmText || 'تأكيد',
            cancelText: data.cancelText || 'إلغاء',
            type: data.type || 'default'
        });
        this.isOpen.set(true);

        return new Promise<boolean>((resolve) => {
            this.resolveCallback = resolve;
        });
    }

    close(result: boolean): void {
        this.isOpen.set(false);
        if (this.resolveCallback) {
            this.resolveCallback(result);
            this.resolveCallback = undefined;
        }
    }
}

/**
 * Confirm Dialog Component
 */
@Component({
    selector: 'app-confirm-dialog',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './confirm-dialog.component.html',
    styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
    constructor(public dialogService: ConfirmDialogService) { }

    confirm(): void {
        this.dialogService.close(true);
    }

    cancel(): void {
        this.dialogService.close(false);
    }
}
