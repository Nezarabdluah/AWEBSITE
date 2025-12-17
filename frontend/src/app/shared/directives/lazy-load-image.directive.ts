import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

/**
 * Lazy Load Image Directive
 * يحمل الصور عند ظهورها في viewport فقط
 * 
 * @example
 * <img appLazyLoadImage [src]="imageUrl" [placeholder]="placeholderUrl">
 */
@Directive({
    selector: '[appLazyLoadImage]',
    standalone: true
})
export class LazyLoadImageDirective implements OnInit, OnDestroy {
    @Input() src!: string;
    @Input() placeholder: string = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3C/svg%3E';

    private observer?: IntersectionObserver;

    constructor(private el: ElementRef<HTMLImageElement>) { }

    ngOnInit(): void {
        // Set placeholder first
        this.el.nativeElement.src = this.placeholder;

        // Create intersection observer
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage();
                }
            });
        });

        // Start observing
        this.observer.observe(this.el.nativeElement);
    }

    ngOnDestroy(): void {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    private loadImage(): void {
        const img = this.el.nativeElement;

        // Create temporary image to preload
        const tempImg = new Image();
        tempImg.onload = () => {
            img.src = this.src;
            img.classList.add('loaded');
        };
        tempImg.src = this.src;

        // Stop observing after loading
        if (this.observer) {
            this.observer.unobserve(img);
        }
    }
}
