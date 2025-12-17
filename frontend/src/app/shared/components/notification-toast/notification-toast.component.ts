import { Component, Injectable, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Toast {
    id: number;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    duration?: number;
}

/**
 * Notification Toast Service - خدمة الإشعارات
 */
@Injectable({
    providedIn: 'root'
})
export class NotificationToastService {
    toasts = signal<Toast[]>([]);
    private nextId = 1;

    show(type: Toast['type'], message: string, duration: number = 5000): void {
        const toast: Toast = {
            id: this.nextId++,
            type,
            message,
            duration
        };

        this.toasts.update(toasts => [...toasts, toast]);

        if (duration > 0) {
            setTimeout(() => this.remove(toast.id), duration);
        }
    }

    success(message: string, duration?: number): void {
        this.show('success', message, duration);
    }

    error(message: string, duration?: number): void {
        this.show('error', message, duration);
    }

    warning(message: string, duration?: number): void {
        this.show('warning', message, duration);
    }

    info(message: string, duration?: number): void {
        this.show('info', message, duration);
    }

    remove(id: number): void {
        this.toasts.update(toasts => toasts.filter(t => t.id !== id));
    }
}

/**
 * Notification Toast Component
 */
@Component({
    selector: 'app-notification-toast',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './notification-toast.component.html',
    styleUrl: './notification-toast.component.scss'
})
export class NotificationToastComponent {
    constructor(public toastService: NotificationToastService) { }

    getIcon(type: Toast['type']): string {
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };
        return icons[type];
    }

    close(id: number): void {
        this.toastService.remove(id);
    }
}
