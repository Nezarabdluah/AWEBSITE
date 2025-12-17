import { Pipe, PipeTransform } from '@angular/core';

/**
 * Time Ago Pipe - عرض الوقت النسبي
 * 
 * @example
 * {{ date | timeAgo }}
 * Output: "منذ 5 دقائق"
 */
@Pipe({
    name: 'timeAgo',
    standalone: true
})
export class TimeAgoPipe implements PipeTransform {
    transform(value: string | Date): string {
        if (!value) return '';

        const date = value instanceof Date ? value : new Date(value);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (seconds < 60) {
            return 'منذ لحظات';
        }

        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) {
            return `منذ ${minutes} ${minutes === 1 ? 'دقيقة' : 'دقائق'}`;
        }

        const hours = Math.floor(minutes / 60);
        if (hours < 24) {
            return `منذ ${hours} ${hours === 1 ? 'ساعة' : 'ساعات'}`;
        }

        const days = Math.floor(hours / 24);
        if (days < 7) {
            return `منذ ${days} ${days === 1 ? 'يوم' : 'أيام'}`;
        }

        const weeks = Math.floor(days / 7);
        if (weeks < 4) {
            return `منذ ${weeks} ${weeks === 1 ? 'أسبوع' : 'أسابيع'}`;
        }

        const months = Math.floor(days / 30);
        if (months < 12) {
            return `منذ ${months} ${months === 1 ? 'شهر' : 'أشهر'}`;
        }

        const years = Math.floor(days / 365);
        return `منذ ${years} ${years === 1 ? 'سنة' : 'سنوات'}`;
    }
}
