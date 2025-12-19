import { Routes } from '@angular/router';

/**
 * Specializations Module Routes
 */
export const SPECIALIZATIONS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/specialization-list/specialization-list.component')
            .then(m => m.SpecializationListComponent)
    },
    {
        path: ':id',
        loadComponent: () => import('./components/specialization-detail/specialization-detail.component')
            .then(m => m.SpecializationDetailComponent)
    }
];
