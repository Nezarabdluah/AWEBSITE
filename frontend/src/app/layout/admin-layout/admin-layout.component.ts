import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

/**
 * Admin Layout Component
 * Layout خاص بلوحة التحكم (Admin Panel)
 */
@Component({
    selector: 'app-admin-layout',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './admin-layout.component.html',
    styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent implements OnInit {
    sidebarCollapsed = false;
    currentUser: any = null;
    currentYear = new Date().getFullYear();

    menuItems = [
        {
            label: 'لوحة التحكم',
            icon: '📊',
            route: '/admin/dashboard'
        },
        {
            label: 'الجامعات',
            icon: '🏛️',
            route: '/admin/universities'
        },
        {
            label: 'المعاهد',
            icon: '🏫',
            route: '/admin/institutes'
        },
        {
            label: 'التخصصات',
            icon: '📚',
            route: '/admin/specializations'
        },
        {
            label: 'الطلبات',
            icon: '📝',
            route: '/admin/applications'
        },
        {
            label: 'المستخدمون',
            icon: '👥',
            route: '/admin/users'
        },
        {
            label: 'الاستشاريون',
            icon: '💼',
            route: '/admin/consultants'
        },
        {
            label: 'المقالات',
            icon: '📰',
            route: '/admin/articles'
        },
        {
            label: 'الشهادات',
            icon: '⭐',
            route: '/admin/testimonials'
        },
        {
            label: 'الإعدادات',
            icon: '⚙️',
            route: '/admin/settings'
        }
    ];

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.authService.currentUser$.subscribe(user => {
            this.currentUser = user;
        });
    }

    toggleSidebar(): void {
        this.sidebarCollapsed = !this.sidebarCollapsed;
    }

    logout(): void {
        this.authService.logout();
    }
}
