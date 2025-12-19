import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApplicationService } from '../../../applications/services/application.service';
import { Application } from '../../../../core/models';

/**
 * Applications Management Component - Admin
 * إدارة طلبات التقديم
 */
@Component({
    selector: 'app-applications-management',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './applications-management.component.html',
    styleUrl: './applications-management.component.scss'
})
export class ApplicationsManagementComponent implements OnInit {
    applications = signal<Application[]>([]);
    isLoading = signal(true);
    filterStatus = signal<string>('all');

    statusOptions = [
        { value: 'all', label: 'الكل' },
        { value: 'pending', label: 'قيد المراجعة' },
        { value: 'approved', label: 'مقبول' },
        { value: 'rejected', label: 'مرفوض' }
    ];

    constructor(private applicationService: ApplicationService) { }

    ngOnInit(): void {
        this.loadApplications();
    }

    loadApplications(): void {
        this.isLoading.set(true);
        this.applicationService.getAllApplications().subscribe({
            next: (data: Application[]) => {
                this.applications.set(data);
                this.isLoading.set(false);
            },
            error: () => {
                this.isLoading.set(false);
            }
        });
    }

    updateStatus(id: number, newStatus: string): void {
        // Find the application and update locally
        this.applications.update(list =>
            list.map(app => app.id === id ? { ...app, status: newStatus as any } : app)
        );
        // TODO: Add API call when backend is ready
    }

    deleteApplication(id: number): void {
        if (confirm('هل أنت متأكد من حذف هذا الطلب؟')) {
            this.applications.update(list => list.filter(a => a.id !== id));
            // TODO: Add API call when backend is ready
        }
    }

    get filteredApplications(): Application[] {
        const filter = this.filterStatus();
        if (filter === 'all') return this.applications();
        return this.applications().filter(app => app.status === filter);
    }

    getStatusBadgeClass(status: string): string {
        const classes: Record<string, string> = {
            'pending': 'status-pending',
            'approved': 'status-approved',
            'rejected': 'status-rejected'
        };
        return classes[status] || 'status-pending';
    }

    getStatusLabel(status: string): string {
        const labels: Record<string, string> = {
            'pending': 'قيد المراجعة',
            'approved': 'مقبول',
            'rejected': 'مرفوض'
        };
        return labels[status] || status;
    }
}
