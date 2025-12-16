import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * خدمة حالة التحميل
 */
@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private loadingCountSubject = new BehaviorSubject<number>(0);

  constructor() { }

  /**
   * عرض Loading
   */
  show(): void {
    const currentCount = this.loadingCountSubject.value + 1;
    this.loadingCountSubject.next(currentCount);
    this.loadingSubject.next(true);
  }

  /**
   * إخفاء Loading
   */
  hide(): void {
    const currentCount = this.loadingCountSubject.value - 1;
    const newCount = Math.max(0, currentCount);
    this.loadingCountSubject.next(newCount);

    if (newCount === 0) {
      this.loadingSubject.next(false);
    }
  }

  /**
   * إخفاء جميع Loading
   */
  hideAll(): void {
    this.loadingCountSubject.next(0);
    this.loadingSubject.next(false);
  }

  /**
   * الحصول على حالة التحميل
   */
  isLoading(): boolean {
    return this.loadingSubject.value;
  }
}