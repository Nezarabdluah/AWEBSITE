import { Pipe, PipeTransform } from '@angular/core';

/**
 * Truncate Pipe - اختصار النص
 * 
 * @example
 * {{ longText | truncate:100 }}
 */
@Pipe({
    name: 'truncate',
    standalone: true
})
export class TruncatePipe implements PipeTransform {
    transform(value: string, limit: number = 50, ellipsis: string = '...'): string {
        if (!value) return '';

        if (value.length <= limit) {
            return value;
        }

        return value.substring(0, limit).trim() + ellipsis;
    }
}
