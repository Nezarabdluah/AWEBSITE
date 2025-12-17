import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

/**
 * Click Outside Directive
 * يكتشف النقر خارج العنصر
 * 
 * @example
 * <div (clickOutside)="onClickOutside()">Content</div>
 */
@Directive({
    selector: '[clickOutside]',
    standalone: true
})
export class ClickOutsideDirective {
    @Output() clickOutside = new EventEmitter<void>();

    constructor(private elementRef: ElementRef) { }

    @HostListener('document:click', ['$event'])
    onClick(event: MouseEvent): void {
        const clickedInside = this.elementRef.nativeElement.contains(event.target);

        if (!clickedInside) {
            this.clickOutside.emit();
        }
    }
}
