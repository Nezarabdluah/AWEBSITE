import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

/**
 * Application Success Component
 * صفحة تأكيد نجاح تقديم الطلب
 */
@Component({
    selector: 'app-application-success',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './application-success.component.html',
    styleUrl: './application-success.component.scss'
})
export class ApplicationSuccessComponent implements OnInit {
    applicationId = signal<number | null>(null);

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        // Get application ID from query params
        this.route.queryParams.subscribe(params => {
            if (params['id']) {
                this.applicationId.set(+params['id']);
            }
        });
    }

    printReceipt(): void {
        window.print();
    }
}
