import { Routes } from '@angular/router';

/**
 * Applications Module Routes
 */
export const APPLICATIONS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/application-wizard/application-wizard.component')
            .then(m => m.ApplicationWizardComponent)
    },
    {
        path: 'success',
        loadComponent: () => import('./components/application-success/application-success.component')
            .then(m => m.ApplicationSuccessComponent)
    }
];
