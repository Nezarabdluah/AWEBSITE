import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

/**
 * Highlight Directive
 * يبرز النص بلون معين
 * 
 * @example
 * <p [appHighlight]="'yellow'">Text to highlight</p>
 */
@Directive({
    selector: '[appHighlight]',
    standalone: true
})
export class HighlightDirective implements OnInit {
    @Input() appHighlight: string = 'yellow';
    @Input() highlightTextColor: string = 'inherit';

    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) { }

    ngOnInit(): void {
        this.highlight();
    }

    private highlight(): void {
        this.renderer.setStyle(
            this.el.nativeElement,
            'backgroundColor',
            this.appHighlight
        );

        this.renderer.setStyle(
            this.el.nativeElement,
            'color',
            this.highlightTextColor
        );

        this.renderer.setStyle(
            this.el.nativeElement,
            'padding',
            '2px 4px'
        );

        this.renderer.setStyle(
            this.el.nativeElement,
            'borderRadius',
            '4px'
        );
    }
}
