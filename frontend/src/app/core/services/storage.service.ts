import { Injectable } from '@angular/core';

/**
 * خدمة التخزين المحلي
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // حفظ بيانات في LocalStorage
  set(key: string, value: any): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  // قراءة بيانات من LocalStorage
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  }

  // حذف بيانات من LocalStorage
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }

  // مسح جميع البيانات
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  // التحقق من وجود مفتاح
  has(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
}