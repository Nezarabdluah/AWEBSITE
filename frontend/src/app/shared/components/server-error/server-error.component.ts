import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * 500 Server Error Page Component
 */
@Component({
    selector: 'app-server-error',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
    <div class="error-page">
      <div class="error-content">
        <h1 class="error-code">500</h1>
        <h2 class="error-title">خطأ في الخادم</h2>
        <p class="error-message">عذراً، حدث خطأ غير متوقع. نعمل على حل المشكلة.</p>
        
        <div class="error-actions">
          <a routerLink="/" class="btn btn-primary">🏠 العودة للرئيسية</a>
          <button class="btn btn-outline" (click)="reload()">🔄 إعادة المحاولة</button>
        </div>
        
        <div class="error-illustration">⚠️</div>
      </div>
    </div>
  `,
    styles: [`
    @import 'abstracts/variables';
    
    .error-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background: linear-gradient(135deg, rgba(239, 68, 68, 0.05), rgba(251, 146, 60, 0.05));
    }
    
    .error-content {
      text-align: center;
      max-width: 600px;
    }
    
    .error-code {
      font-size: clamp(6rem, 15vw, 10rem);
      font-weight: 900;
      background: linear-gradient(135deg, #EF4444, #F97316);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0;
      line-height: 1;
    }
    
    .error-title {
      font-size: 2rem;
      font-weight: 700;
      margin: 1.5rem 0 1rem;
    }
    
    .error-message {
      font-size: 1.125rem;
      color: #6B7280;
      margin-bottom: 2.5rem;
    }
    
    .error-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    .error-illustration {
      font-size: 5rem;
      margin-top: 3rem;
      opacity: 0.3;
    }
  `]
})
export class ServerErrorComponent {
    reload(): void {
        window.location.reload();
    }
}
