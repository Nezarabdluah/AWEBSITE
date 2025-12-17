import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * Breadcrumb Component - مسار التنقل
 * 
 * @example
 * <app-breadcrumb [items]="breadcrumbItems"></app-breadcrumb>
 */
@Component({
    selector: 'app-breadcrumb',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './breadcrumb.component.html',
    styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
    @Input() items: BreadcrumbItem[] = [];
}

/**
 * Breadcrumb Item Interface
 */
export interface BreadcrumbItem {
    label: string;
    url?: string;
    active?: boolean;
}
