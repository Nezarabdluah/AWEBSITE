import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface SiteSetting {
    key: string;
    label: string;
    value: string;
    type: 'text' | 'email' | 'number' | 'textarea';
}

/**
 * Settings Component - Admin
 * إعدادات الموقع العامة
 */
@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss'
})
export class SettingsComponent {
    isSaving = signal(false);
    saveSuccess = signal(false);

    settings = signal<SiteSetting[]>([
        { key: 'site_name', label: 'اسم الموقع', value: 'Your Uni', type: 'text' },
        { key: 'site_email', label: 'البريد الإلكتروني', value: 'info@your-uni.com', type: 'email' },
        { key: 'site_phone', label: 'رقم الهاتف', value: '+966XXXXXXXXX', type: 'text' },
        { key: 'max_universities', label: 'الحد الأقصى للجامعات', value: '500', type: 'number' },
        { key: 'site_description', label: 'وصف الموقع', value: 'منصة للدراسة في الخارج', type: 'textarea' }
    ]);

    saveSettings(): void {
        this.isSaving.set(true);

        // Simulate API call
        setTimeout(() => {
            console.log('Settings saved:', this.settings());
            this.isSaving.set(false);
            this.saveSuccess.set(true);

            setTimeout(() => this.saveSuccess.set(false), 3000);
        }, 1000);
    }

    updateSetting(key: string, value: string): void {
        this.settings.update(settings =>
            settings.map(s => s.key === key ? { ...s, value } : s)
        );
    }
}
