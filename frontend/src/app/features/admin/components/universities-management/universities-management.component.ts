import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
    imports: [CommonModule, RouterModule, FormsModule],
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
        // Using universities$ observable from service
        this.universityService.universities$.subscribe({
            next: (universities: University[]) => {
                this.universities.set(universities);
                this.isLoading.set(false);
            },
            error: () => {
                this.isLoading.set(false);
            }
        });
    }

    deleteUniversity(id: number): void {
        if (confirm('هل أنت متأكد من حذف هذه الجامعة؟')) {
            // TODO: Add delete API call when backend is ready
            this.universities.update(list => list.filter(u => u.id !== id));
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
