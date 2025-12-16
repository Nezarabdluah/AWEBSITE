import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';


export const routes: Routes = [
  // الصفحة الرئيسية
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },

  // المصادقة (تسجيل الدخول والتسجيل)
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },

  // الجامعات
  {
    path: 'universities',
    loadChildren: () => import('./features/universities/universities.routes').then(m => m.UNIVERSITIES_ROUTES)
  },

  // المعاهد
  {
    path: 'institutes',
    loadChildren: () => import('./features/institutes/institutes.routes').then(m => m.INSTITUTES_ROUTES)
  },

  // التخصصات
  {
    path: 'specializations',
    loadChildren: () => import('./features/specializations/specializations.routes').then(m => m.SPECIALIZATIONS_ROUTES)
  },

  // المستشارين
  {
    path: 'consultants',
    loadChildren: () => import('./features/consultants/consultants.routes').then(m => m.CONSULTANTS_ROUTES)
  },

  // الطلبات (محمي - يتطلب تسجيل دخول)
  {
    path: 'applications',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/applications/applications.routes').then(m => m.APPLICATIONS_ROUTES)
  },

  // التواصل
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent)
  },

  // المقالات
  {
    path: 'articles',
    loadChildren: () => import('./features/articles/articles.routes').then(m => m.ARTICLES_ROUTES)
  },

  // لوحة التحكم (محمي - Admin فقط)
  {
    path: 'admin',
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },

  // 404 - الصفحة غير موجودة
  {
    path: '**',
    redirectTo: ''
  }
];