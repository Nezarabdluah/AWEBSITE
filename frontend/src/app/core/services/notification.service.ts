import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NOTIFICATION_TYPES, NOTIFICATION_DURATION } from '../constants/app-constants';

/**
 * نموذج الإشعار
 */
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  title?: string;
  duration?: number;
}

/**
 * خدمة الإشعارات
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSubject = new Subject<Notification>();
  public notification$ = this.notificationSubject.asObservable();

  constructor() { }

  /**
   * عرض إشعار نجاح
   */
  success(message: string, title?: string, duration?: number): void {
    this.show(NOTIFICATION_TYPES.SUCCESS, message, title, duration);
  }

  /**
   * عرض إشعار خطأ
   */
  error(message: string, title?: string, duration?: number): void {
    this.show(NOTIFICATION_TYPES.ERROR, message, title, duration);
  }

  /**
   * عرض إشعار تحذير
   */
  warning(message: string, title?: string, duration?: number): void {
    this.show(NOTIFICATION_TYPES.WARNING, message, title, duration);
  }

  /**
   * عرض إشعار معلومات
   */
  info(message: string, title?: string, duration?: number): void {
    this.show(NOTIFICATION_TYPES.INFO, message, title, duration);
  }

  /**
   * عرض إشعار مخصص
   */
  private show(type: string, message: string, title?: string, duration?: number): void {
    const notification: Notification = {
      id: this.generateId(),
      type: type as any,
      message,
      title,
      duration: duration || NOTIFICATION_DURATION
    };

    this.notificationSubject.next(notification);
  }

  /**
   * توليد معرف فريد للإشعار
   */
  private generateId(): string {
    return `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}