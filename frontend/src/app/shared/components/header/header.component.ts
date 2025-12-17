import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
    // State
    isMenuOpen = signal(false);
    currentTheme = signal<'light' | 'dark'>('light');
    currentLang = signal<'ar' | 'en'>('ar');
    isScrolled = signal(false);

    // Navigation links
    navLinks = [
        { path: '/', label: { ar: 'الرئيسية', en: 'Home' }, icon: 'home' },
        { path: '/universities', label: { ar: 'الجامعات', en: 'Universities' }, icon: 'school' },
        { path: '/institutes', label: { ar: 'المعاهد', en: 'Institutes' }, icon: 'business' },
        { path: '/specializations', label: { ar: 'التخصصات', en: 'Specializations' }, icon: 'book' },
        { path: '/consultants', label: { ar: 'المستشارين', en: 'Consultants' }, icon: 'people' },
        { path: '/articles', label: { ar: 'المقالات', en: 'Articles' }, icon: 'article' }
    ];

    constructor(public authService: AuthService) { }

    ngOnInit(): void {
        // Load saved preferences
        this.loadTheme();
        this.loadLanguage();
        this.setupScrollListener();
    }

    /**
     * Toggle mobile menu
     */
    toggleMenu(): void {
        this.isMenuOpen.update(v => !v);
    }

    /**
     * Close mobile menu
     */
    closeMenu(): void {
        this.isMenuOpen.set(false);
    }

    /**
     * Toggle theme (light/dark)
     */
    toggleTheme(): void {
        const newTheme = this.currentTheme() === 'light' ? 'dark' : 'light';
        this.currentTheme.set(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    /**
     * Toggle language (ar/en)
     */
    toggleLanguage(): void {
        const newLang = this.currentLang() === 'ar' ? 'en' : 'ar';
        this.currentLang.set(newLang);
        document.documentElement.setAttribute('lang', newLang);
        document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
        localStorage.setItem('lang', newLang);
    }

    /**
     * Get label based on current language
     */
    getLabel(label: { ar: string; en: string }): string {
        return label[this.currentLang()];
    }

    /**
     * Load theme from localStorage
     */
    private loadTheme(): void {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        if (savedTheme) {
            this.currentTheme.set(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }

    /**
     * Load language from localStorage
     */
    private loadLanguage(): void {
        const savedLang = localStorage.getItem('lang') as 'ar' | 'en' | null;
        if (savedLang) {
            this.currentLang.set(savedLang);
            document.documentElement.setAttribute('lang', savedLang);
            document.documentElement.setAttribute('dir', savedLang === 'ar' ? 'rtl' : 'ltr');
        }
    }

    /**
     * Setup scroll listener for header shadow
     */
    private setupScrollListener(): void {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', () => {
                this.isScrolled.set(window.scrollY > 10);
            });
        }
    }

    /**
     * Logout
     */
    logout(): void {
        this.authService.logout();
        this.closeMenu();
    }
}
