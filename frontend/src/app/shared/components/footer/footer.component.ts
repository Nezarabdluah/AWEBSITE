import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent {
    currentYear = new Date().getFullYear();
    currentLang = signal<'ar' | 'en'>('ar');

    footerSections = [
        {
            title: { ar: 'عن Your Uni', en: 'About Your Uni' },
            links: [
                { path: '/about', label: { ar: 'من نحن', en: 'About Us' } },
                { path: '/contact', label: { ar: 'اتصل بنا', en: 'Contact Us' } },
                { path: '/consultants', label: { ar: 'مستشارينا', en: 'Our Consultants' } },
                { path: '/articles', label: { ar: 'المدونة', en: 'Blog' } }
            ]
        },
        {
            title: { ar: 'الخدمات', en: 'Services' },
            links: [
                { path: '/universities', label: { ar: 'الجامعات', en: 'Universities' } },
                { path: '/institutes', label: { ar: 'المعاهد', en: 'Institutes' } },
                { path: '/specializations', label: { ar: 'التخصصات', en: 'Specializations' } },
                { path: '/applications', label: { ar: 'التقديم', en: 'Apply Now' } }
            ]
        },
        {
            title: { ar: 'الدعم', en: 'Support' },
            links: [
                { path: '/faq', label: { ar: 'الأسئلة الشائعة', en: 'FAQ' } },
                { path: '/privacy', label: { ar: 'سياسة الخصوصية', en: 'Privacy Policy' } },
                { path: '/terms', label: { ar: 'شروط الاستخدام', en: 'Terms of Service' } },
                { path: '/help', label: { ar: 'مركز المساعدة', en: 'Help Center' } }
            ]
        }
    ];

    socialLinks = [
        { icon: 'facebook', url: 'https://facebook.com', label: 'Facebook' },
        { icon: 'twitter', url: 'https://twitter.com', label: 'Twitter' },
        { icon: 'instagram', url: 'https://instagram.com', label: 'Instagram' },
        { icon: 'linkedin', url: 'https://linkedin.com', label: 'LinkedIn' },
        { icon: 'youtube', url: 'https://youtube.com', label: 'YouTube' }
    ];

    constructor() {
        this.loadLanguage();
    }

    getLabel(label: { ar: string; en: string }): string {
        return label[this.currentLang()];
    }

    private loadLanguage(): void {
        const savedLang = localStorage.getItem('lang') as 'ar' | 'en' | null;
        if (savedLang) {
            this.currentLang.set(savedLang);
        }
    }
}
