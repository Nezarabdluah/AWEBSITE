import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Safe HTML Pipe - عرض HTML آمن
 * 
 * @example
 * <div [innerHTML]="htmlContent | safeHtml"></div>
 */
@Pipe({
    name: 'safeHtml',
    standalone: true
})
export class SafeHtmlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }

    transform(value: string): SafeHtml {
        return this.sanitizer.sanitize(1, value) || '';
    }
}
