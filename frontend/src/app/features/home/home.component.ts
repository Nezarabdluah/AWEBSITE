import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../../shared/components/card/card.component';

/**
 * Home Component - الصفحة الرئيسية
 * تحتوي على 6 أقسام:
 * 1. Hero Section
 * 2. Services Section
 * 3. Universities Showcase
 * 4. Testimonials
 * 5. Consultants Section
 * 6. Stats Section
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  // Services
  services = [
    {
      icon: '🎓',
      title: 'استشارات تعليمية',
      description: 'نساعدك في اختيار التخصص والجامعة المناسبة لك'
    },
    {
      icon: '📝',
      title: 'تقديم الطلبات',
      description: 'نساعدك في تقديم طلبات القبول للجامعات'
    },
    {
      icon: '✈️',
      title: 'تأشيرات السفر',
      description: 'نساعدك في إنهاء إجراءات التأشيرة والسفر'
    },
    {
      icon: '🏠',
      title: 'السكن الطلابي',
      description: 'نوفر لك خيارات سكن آمنة ومريحة'
    },
    {
      icon: '💼',
      title: 'التوظيف',
      description: 'فرص عمل للطلاب أثناء وبعد الدراسة'
    },
    {
      icon: '🌍',
      title: 'الدعم المستمر',
      description: 'نبقى معك طوال رحلتك الدراسية'
    }
  ];

  // Featured Universities
  featuredUniversities = [
    {
      id: 1,
      name: 'جامعة هارفارد',
      country: 'الولايات المتحدة',
      image: 'https://placehold.co/400x300/4F46E5/ffffff?text=Harvard',
      ranking: '#1',
      programs: 150
    },
    {
      id: 2,
      name: 'جامعة أكسفورد',
      country: 'المملكة المتحدة',
      image: 'https://placehold.co/400x300/7C3AED/ffffff?text=Oxford',
      ranking: '#2',
      programs: 120
    },
    {
      id: 3,
      name: 'جامعة MIT',
      country: 'الولايات المتحدة',
      image: 'https://placehold.co/400x300/2563EB/ffffff?text=MIT',
      ranking: '#3',
      programs: 100
    },
    {
      id: 4,
      name: 'جامعة كامبريدج',
      country: 'المملكة المتحدة',
      image: 'https://placehold.co/400x300/DC2626/ffffff?text=Cambridge',
      ranking: '#4',
      programs: 110
    }
  ];

  // Testimonials
  testimonials = [
    {
      id: 1,
      name: 'محمد أحمد',
      university: 'جامعة هارفارد',
      image: 'https://i.pravatar.cc/150?img=12',
      rating: 5,
      text: 'تجربة رائعة! ساعدوني في كل خطوة من البداية حتى القبول'
    },
    {
      id: 2,
      name: 'سارة علي',
      university: 'جامعة أكسفورد',
      image: 'https://i.pravatar.cc/150?img=45',
      rating: 5,
      text: 'فريق محترف وداعم، حصلت على قبول في جامعة أحلامي'
    },
    {
      id: 3,
      name: 'أحمد خالد',
      university: 'معهد MIT',
      image: 'https://i.pravatar.cc/150?img=33',
      rating: 5,
      text: 'خدمة ممتازة ومتابعة مستمرة، أنصح الجميع بالتعامل معهم'
    }
  ];

  // Top Consultants
  topConsultants = [
    {
      id: 1,
      name: 'د. أحمد محمود',
      specialization: 'الدراسة في أمريكا',
      image: 'https://i.pravatar.cc/200?img=60',
      students: 250,
      rating: 4.9
    },
    {
      id: 2,
      name: 'د. فاطمة حسن',
      specialization: 'الدراسة في بريطانيا',
      image: 'https://i.pravatar.cc/200?img=48',
      students: 180,
      rating: 4.8
    },
    {
      id: 3,
      name: 'د. خالد عمر',
      specialization: 'الدراسة في كندا',
      image: 'https://i.pravatar.cc/200?img=59',
      students: 150,
      rating: 4.7
    }
  ];

  // Stats
  stats = [
    { icon: '🎓', value: 5000, label: 'طالب تم قبوله', suffix: '+' },
    { icon: '🏛️', value: 200, label: 'جامعة شريكة', suffix: '+' },
    { icon: '🌍', value: 50, label: 'دولة حول العالم', suffix: '+' },
    { icon: '⭐', value: 98, label: 'نسبة الرضا', suffix: '%' }
  ];

  currentTestimonial = 0;

  ngOnInit(): void {
    this.startTestimonialSlider();
  }

  startTestimonialSlider(): void {
    setInterval(() => {
      this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
    }, 5000);
  }

  previousTestimonial(): void {
    this.currentTestimonial = this.currentTestimonial === 0
      ? this.testimonials.length - 1
      : this.currentTestimonial - 1;
  }

  nextTestimonial(): void {
    this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
}