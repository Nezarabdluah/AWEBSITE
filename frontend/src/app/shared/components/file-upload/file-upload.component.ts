import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface UploadedFile {
    file: File;
    preview?: string;
}

/**
 * File Upload Component
 * 
 * @example
 * <app-file-upload 
 *   [accept]="'image/*'"
 *   [multiple]="true"
 *   (filesSelected)="onFiles($event)">
 * </app-file-upload>
 */
@Component({
    selector: 'app-file-upload',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './file-upload.component.html',
    styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
    @Input() accept: string = '*/*';
    @Input() multiple: boolean = false;
    @Input() maxSize: number = 5 * 1024 * 1024; // 5MB default
    @Input() showPreview: boolean = true;

    @Output() filesSelected = new EventEmitter<UploadedFile[]>();

    files: UploadedFile[] = [];
    isDragging: boolean = false;
    error: string | null = null;

    onFileSelect(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files) {
            this.handleFiles(Array.from(input.files));
        }
    }

    onDrop(event: DragEvent): void {
        event.preventDefault();
        this.isDragging = false;

        if (event.dataTransfer?.files) {
            this.handleFiles(Array.from(event.dataTransfer.files));
        }
    }

    onDragOver(event: DragEvent): void {
        event.preventDefault();
        this.isDragging = true;
    }

    onDragLeave(): void {
        this.isDragging = false;
    }

    handleFiles(selectedFiles: File[]): void {
        this.error = null;

        // Validate file size
        const oversizedFiles = selectedFiles.filter(f => f.size > this.maxSize);
        if (oversizedFiles.length > 0) {
            this.error = `بعض الملفات تتجاوز الحد الأقصى ${this.maxSize / 1024 / 1024}MB`;
            return;
        }

        const uploadedFiles: UploadedFile[] = selectedFiles.map(file => ({
            file,
            preview: this.createPreview(file)
        }));

        if (this.multiple) {
            this.files = [...this.files, ...uploadedFiles];
        } else {
            this.files = [uploadedFiles[0]];
        }

        this.filesSelected.emit(this.files);
    }

    createPreview(file: File): string | undefined {
        if (file.type.startsWith('image/')) {
            return URL.createObjectURL(file);
        }
        return undefined;
    }

    removeFile(index: number): void {
        const file = this.files[index];
        if (file.preview) {
            URL.revokeObjectURL(file.preview);
        }
        this.files.splice(index, 1);
        this.filesSelected.emit(this.files);
    }

    formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }
}
