import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UniversityService } from '../../../universities/services/university.service';
import { University } from '../../../../core/models';

/**
 * Universities Management Component - Admin
 * إدارة الجامعات (عرض، تعديل، حذف)
 */
@Component({
    selector: 'app-universities-management',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './universities-management.component.html',
    styleUrl: './universities-management.component.scss'
})
export class UniversitiesManagementComponent implements OnInit {
    universities = signal<University[]>([]);
    isLoading = signal(true);
    searchQuery = signal('');

    constructor(private universityService: UniversityService) { }

    ngOnInit(): void {
        this.loadUniversities();
    }

    loadUniversities(): void {
        this.isLoading.set(true);
        this.universityService.getAll().subscribe({
            next: (data) => {
                this.universities.set(data);
                this.isLoading.set(false);
            },
            error: () => {
                this.isLoading.set(false);
            }
        });
    }

    deleteUniversity(id: number): void {
        if (confirm('هل أنت متأكد من حذف هذه الجامعة؟')) {
            this.universityService.delete(id).subscribe({
                next: () => {
                    this.universities.update(list => list.filter(u => u.id !== id));
                }
            });
        }
    }

    get filteredUniversities(): University[] {
        const query = this.searchQuery().toLowerCase();
        if (!query) return this.universities();

        return this.universities().filter(u =>
            u.name.toLowerCase().includes(query) ||
            u.country.toLowerCase().includes(query)
        );
    }
}
