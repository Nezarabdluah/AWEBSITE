import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/user.model';

/**
 * Guard للتحقق من صلاحية Admin
 * يمنع الوصول للوحة التحكم لغير المدراء
 */
@Injectable({
  providedIn: 'root'
})
export class AdminGuard {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.authService.getCurrentUser();

    if (user && user.role === UserRole.ADMIN) {
      return true;
    }

    // إعادة التوجيه للصفحة الرئيسية
    return this.router.createUrlTree(['/']);
  }

  canActivateChild(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate();
  }
}