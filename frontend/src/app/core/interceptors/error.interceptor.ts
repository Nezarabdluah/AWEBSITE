import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { ERROR_MESSAGES } from '../constants/app-constants';

/**
 * Interceptor لمعالجة الأخطاء
 * يعالج الأخطاء من الخادم ويعرض رسائل مناسبة
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = ERROR_MESSAGES.SERVER_ERROR;

        if (error.error instanceof ErrorEvent) {
          // خطأ من جانب العميل
          errorMessage = error.error.message;
        } else {
          // خطأ من جانب الخادم
          switch (error.status) {
            case 401:
              // غير مصرح
              errorMessage = ERROR_MESSAGES.UNAUTHORIZED;
              this.authService.logout();
              break;

            case 403:
              // ممنوع
              errorMessage = ERROR_MESSAGES.FORBIDDEN;
              this.router.navigate(['/']);
              break;

            case 404:
              // غير موجود
              errorMessage = ERROR_MESSAGES.NOT_FOUND;
              break;

            case 422:
              // خطأ في التحقق
              errorMessage = error.error?.message || ERROR_MESSAGES.VALIDATION_ERROR;
              break;

            case 500:
            case 502:
            case 503:
              // خطأ في الخادم
              errorMessage = ERROR_MESSAGES.SERVER_ERROR;
              break;

            default:
              errorMessage = error.error?.message || ERROR_MESSAGES.SERVER_ERROR;
          }
        }

        // عرض رسالة الخطأ
        this.notificationService.error(errorMessage);

        return throwError(() => error);
      })
    );
  }
}