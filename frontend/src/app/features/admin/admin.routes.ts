import { Routes } from '@angular/router';

/**
 * Admin Module Routes
 */
export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/dashboard-overview/dashboard-overview.component')
            .then(m => m.DashboardOverviewComponent)
    },
    {
        path: 'universities',
        loadComponent: () => import('./components/universities-management/universities-management.component')
            .then(m => m.UniversitiesManagementComponent)
    },
    {
        path: 'applications',
        loadComponent: () => import('./components/applications-management/applications-management.component')
            .then(m => m.ApplicationsManagementComponent)
    },
    {
        path: 'settings',
        loadComponent: () => import('./components/settings/settings.component')
            .then(m => m.SettingsComponent)
    }
];
