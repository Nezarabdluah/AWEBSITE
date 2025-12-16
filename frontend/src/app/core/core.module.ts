import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Interceptors
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { LoadingInterceptor } from './interceptors/loading.interceptor';

// Services
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { NotificationService } from './services/notification.service';
import { LoadingService } from './services/loading.service';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

/**
 * Core Module
 * يحتوي على الخدمات والـ Interceptors الأساسية
 * يتم استيراده مرة واحدة فقط في AppModule
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    // Services
    ApiService,
    AuthService,
    StorageService,
    NotificationService,
    LoadingService,

    // Guards
    AuthGuard,
    AdminGuard,

    // Interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  /**
   * التأكد من أن CoreModule يتم استيراده مرة واحدة فقط
   */
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
    }
  }
}