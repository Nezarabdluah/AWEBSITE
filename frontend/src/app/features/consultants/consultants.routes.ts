import { Routes } from '@angular/router';

/**
 * Consultants Module Routes
 */
export const CONSULTANTS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/consultant-list/consultant-list.component')
            .then(m => m.ConsultantListComponent)
    },
    {
        path: ':id',
        loadComponent: () => import('./components/consultant-profile/consultant-profile.component')
            .then(m => m.ConsultantProfileComponent)
    }
];
