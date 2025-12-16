import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_BASE_URL } from '../constants/api-endpoints';
import { ApiResponse, PaginatedResponse } from '../models/api-response.model';

/**
 * خدمة API - تتعامل مع جميع طلبات HTTP
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  /**
   * GET Request
   */
  get<T>(endpoint: string, params?: any): Observable<ApiResponse<T>> {
    const options = this.buildOptions(params);
    return this.http.get<ApiResponse<T>>(`${API_BASE_URL}${endpoint}`, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * GET Request with Pagination
   */
  getPaginated<T>(endpoint: string, params?: any): Observable<PaginatedResponse<T>> {
    const options = this.buildOptions(params);
    return this.http.get<PaginatedResponse<T>>(`${API_BASE_URL}${endpoint}`, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * POST Request
   */
  post<T>(endpoint: string, body: any): Observable<ApiResponse<T>> {
    return this.http.post<ApiResponse<T>>(`${API_BASE_URL}${endpoint}`, body)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * PUT Request
   */
  put<T>(endpoint: string, body: any): Observable<ApiResponse<T>> {
    return this.http.put<ApiResponse<T>>(`${API_BASE_URL}${endpoint}`, body)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * PATCH Request
   */
  patch<T>(endpoint: string, body: any): Observable<ApiResponse<T>> {
    return this.http.patch<ApiResponse<T>>(`${API_BASE_URL}${endpoint}`, body)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * DELETE Request
   */
  delete<T>(endpoint: string): Observable<ApiResponse<T>> {
    return this.http.delete<ApiResponse<T>>(`${API_BASE_URL}${endpoint}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Upload File
   */
  upload<T>(endpoint: string, file: File, additionalData?: any): Observable<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);

    if (additionalData) {
      Object.keys(additionalData).forEach(key => {
        formData.append(key, additionalData[key]);
      });
    }

    return this.http.post<ApiResponse<T>>(`${API_BASE_URL}${endpoint}`, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * بناء Options للطلب
   */
  private buildOptions(params?: any): { params?: HttpParams } {
    if (!params) return {};

    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined) {
        httpParams = httpParams.set(key, params[key].toString());
      }
    });

    return { params: httpParams };
  }

  /**
   * معالجة الأخطاء
   */
  private handleError(error: any): Observable<never> {
    console.error('API Error:', error);
    
    let errorMessage = 'حدث خطأ غير متوقع';
    
    if (error.error instanceof ErrorEvent) {
      // خطأ من جانب العميل
      errorMessage = `خطأ: ${error.error.message}`;
    } else {
      // خطأ من جانب الخادم
      errorMessage = error.error?.message || `خطأ في الخادم: ${error.status}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}