import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import { API_ENDPOINTS } from '../constants/api-endpoints';
import { STORAGE_KEYS } from '../constants/app-constants';
import { User, LoginCredentials, RegisterData, AuthResponse } from '../models/user.model';
import { ApiResponse } from '../models/api-response.model';

/**
 * خدمة المصادقة - تسجيل الدخول والخروج
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // حالة المستخدم الحالي
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // حالة تسجيل الدخول
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.loadUserFromStorage();
  }

  /**
   * تحميل المستخدم من التخزين المحلي
   */
  private loadUserFromStorage(): void {
    const token = this.storageService.get<string>(STORAGE_KEYS.AUTH_TOKEN);
    const user = this.storageService.get<User>(STORAGE_KEYS.USER_DATA);

    if (token && user) {
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    }
  }

  /**
   * تسجيل الدخول
   */
  login(credentials: LoginCredentials): Observable<ApiResponse<AuthResponse>> {
    return this.apiService.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials)
      .pipe(
        tap(response => {
          if (response.success && response.data) {
            this.handleAuthSuccess(response.data);
          }
        })
      );
  }

  /**
   * التسجيل
   */
  register(data: RegisterData): Observable<ApiResponse<AuthResponse>> {
    return this.apiService.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, data)
      .pipe(
        tap(response => {
          if (response.success && response.data) {
            this.handleAuthSuccess(response.data);
          }
        })
      );
  }

  /**
   * تسجيل الخروج
   */
  logout(): void {
    // استدعاء API لتسجيل الخروج (اختياري)
    this.apiService.post(API_ENDPOINTS.AUTH.LOGOUT, {}).subscribe();

    // مسح البيانات المحلية
    this.storageService.remove(STORAGE_KEYS.AUTH_TOKEN);
    this.storageService.remove(STORAGE_KEYS.USER_DATA);

    // تحديث الحالة
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);

    // الانتقال لصفحة تسجيل الدخول
    this.router.navigate(['/auth/login']);
  }

  /**
   * الحصول على المستخدم الحالي
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * التحقق من تسجيل الدخول
   */
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  /**
   * الحصول على Token
   */
  getToken(): string | null {
    return this.storageService.get<string>(STORAGE_KEYS.AUTH_TOKEN);
  }

  /**
   * التحقق من صلاحية المستخدم
   */
  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  /**
   * معالجة نجاح المصادقة
   */
  private handleAuthSuccess(authData: AuthResponse): void {
    // حفظ البيانات في التخزين المحلي
    this.storageService.set(STORAGE_KEYS.AUTH_TOKEN, authData.token);
    this.storageService.set(STORAGE_KEYS.USER_DATA, authData.user);

    // تحديث الحالة
    this.currentUserSubject.next(authData.user);
    this.isAuthenticatedSubject.next(true);
  }

  /**
   * نسيت كلمة المرور
   */
  forgotPassword(email: string): Observable<ApiResponse<any>> {
    return this.apiService.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  }

  /**
   * إعادة تعيين كلمة المرور
   */
  resetPassword(token: string, password: string, passwordConfirmation: string): Observable<ApiResponse<any>> {
    return this.apiService.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
      token,
      password,
      password_confirmation: passwordConfirmation
    });
  }
}