import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: '<div style="text-align:center; margin-top:50px"><h1>🏠 أهلاً بك في الصفحة الرئيسية</h1><p>تم تشغيل المشروع بنجاح!</p></div>',
  styles: []
})
export class HomeComponent {}