import { Pipe, PipeTransform } from '@angular/core';

/**
 * Currency Format Pipe - تنسيق العملة
 * 
 * @example
 * {{ price | currencyFormat:'USD' }}
 * Output: "$1,234.56"
 */
@Pipe({
    name: 'currencyFormat',
    standalone: true
})
export class CurrencyFormatPipe implements PipeTransform {
    transform(value: number, currency: string = 'USD', locale: string = 'en-US'): string {
        if (value === null || value === undefined) return '';

        try {
            return new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: currency
            }).format(value);
        } catch (error) {
            // Fallback if currency not supported
            return `${currency} ${value.toFixed(2)}`;
        }
    }
}
