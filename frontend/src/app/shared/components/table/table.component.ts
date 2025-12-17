import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TableColumn {
    key: string;
    label: string;
    sortable?: boolean;
    width?: string;
}

/**
 * Table Component - جدول قابل لإعادة الاستخدام
 *
 * @example
 * <app-table [columns]="columns" [data]="items">
 *   <ng-template #cellTemplate let-row let-column="column">
 *     {{ row[column.key] }}
 *   </ng-template>
 * </app-table>
 */
@Component({
    selector: 'app-table',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss'
})
export class TableComponent {
    @Input() columns: TableColumn[] = [];
    @Input() data: any[] = [];
    @Input() loading: boolean = false;
    @Input() selectable: boolean = false;
    @Input() hoverable: boolean = true;

    @Output() rowClick = new EventEmitter<any>();
    @Output() sort = new EventEmitter<{ column: string; direction: 'asc' | 'desc' }>();
    @Output() selectionChange = new EventEmitter<any[]>();

    @ContentChild('cellTemplate') cellTemplate?: TemplateRef<any>;

    selectedRows: Set<any> = new Set();
    sortColumn: string | null = null;
    sortDirection: 'asc' | 'desc' = 'asc';

    onRowClick(row: any): void {
        this.rowClick.emit(row);
    }

    onSort(column: TableColumn): void {
        if (!column.sortable) return;

        if (this.sortColumn === column.key) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortColumn = column.key;
            this.sortDirection = 'asc';
        }

        this.sort.emit({ column: column.key, direction: this.sortDirection });
    }

    toggleRowSelection(row: any): void {
        if (this.selectedRows.has(row)) {
            this.selectedRows.delete(row);
        } else {
            this.selectedRows.add(row);
        }
        this.selectionChange.emit(Array.from(this.selectedRows));
    }

    toggleAllRows(): void {
        if (this.selectedRows.size === this.data.length) {
            this.selectedRows.clear();
        } else {
            this.data.forEach(row => this.selectedRows.add(row));
        }
        this.selectionChange.emit(Array.from(this.selectedRows));
    }

    isRowSelected(row: any): boolean {
        return this.selectedRows.has(row);
    }
}
