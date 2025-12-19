import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface DashboardStats {
  title: string;
  value: number | string;
  icon: string;
  color: string;
  change?: string;
}

/**
 * Admin Dashboard Overview Component
 * نظرة عامة على لوحة التحكم مع الإحصائيات
 */
@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-overview.component.html',
  styleUrl: './dashboard-overview.component.scss'
})
export class DashboardOverviewComponent implements OnInit {
  stats = signal<DashboardStats[]>([]);
  recentActivities = signal<any[]>([]);

  ngOnInit(): void {
    this.loadStats();
    this.loadRecentActivities();
  }

  private loadStats(): void {
    this.stats.set([
      {
        title: 'إجمالي الجامعات',
        value: 245,
        icon: '🎓',
        color: 'primary',
        change: '+12%'
      },
      {
        title: 'الطلبات الجديدة',
        value: 89,
        icon: '📝',
        color: 'warning',
        change: '+23%'
      },
      {
        title: 'المستشارين',
        value: 34,
        icon: '👨‍💼',
        color: 'success',
        change: '+5%'
      },
      {
        title: 'المقالات',
        value: 127,
        icon: '📰',
        color: 'info',
        change: '+18%'
      }
    ]);
  }

  private loadRecentActivities(): void {
    this.recentActivities.set([
      { type: 'application', message: 'طلب جديد من أحمد محمد', time: 'منذ 5 دقائق' },
      { type: 'university', message: 'تم إضافة جامعة هارفارد', time: 'منذ ساعة' },
      { type: 'article', message: 'مقال جديد: دليل الدراسة في أمريكا', time: 'منذ ساعتين' },
      { type: 'user', message: 'مستخدم جديد: sara@example.com', time: 'منذ 3 ساعات' }
    ]);
  }
}
