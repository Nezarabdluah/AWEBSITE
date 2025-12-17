import { Routes } from '@angular/router';

export const UNIVERSITIES_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/university-list/university-list.component')
            .then(m => m.UniversityListComponent)
    },
    {
        path: ':id',
        loadComponent: () => import('./components/university-detail/university-detail.component')
            .then(m => m.UniversityDetailComponent)
    }
];
