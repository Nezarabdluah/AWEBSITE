import { Routes } from '@angular/router';

/**
 * Articles Module Routes
 */
export const ARTICLES_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/article-list/article-list.component')
            .then(m => m.ArticleListComponent)
    },
    {
        path: ':id',
        loadComponent: () => import('./components/article-detail/article-detail.component')
            .then(m => m.ArticleDetailComponent)
    }
];
