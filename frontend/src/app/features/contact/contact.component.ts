import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Contact Component
 * صفحة التواصل
 */
@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss'
})
export class ContactComponent {
    contactForm: FormGroup;
    isSubmitting = signal(false);
    submitSuccess = signal(false);

    contactInfo = [
        { icon: '📞', title: 'الهاتف', value: '+966 50 123 4567', link: 'tel:+966501234567' },
        { icon: '📧', title: 'البريد الإلكتروني', value: 'info@youruni.com', link: 'mailto:info@youruni.com' },
        { icon: '📍', title: 'العنوان', value: 'الرياض، المملكة العربية السعودية' }
    ];

    socialLinks = [
        { name: 'Facebook', icon: '📘', url: '#' },
        { name: 'Twitter', icon: '🐦', url: '#' },
        { name: 'Instagram', icon: '📷', url: '#' },
        { name: 'LinkedIn', icon: '💼', url: '#' }
    ];

    constructor(private fb: FormBuilder) {
        this.contactForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            phone: [''],
            subject: ['', Validators.required],
            message: ['', [Validators.required, Validators.minLength(10)]]
        });
    }

    isFieldInvalid(fieldName: string): boolean {
        const field = this.contactForm.get(fieldName);
        return !!(field && field.invalid && (field.dirty || field.touched));
    }

    onSubmit(): void {
        if (this.contactForm.valid && !this.isSubmitting()) {
            this.isSubmitting.set(true);

            // Simulate API call
            setTimeout(() => {
                console.log('Contact form submitted:', this.contactForm.value);
                this.isSubmitting.set(false);
                this.submitSuccess.set(true);
                this.contactForm.reset();

                // Hide success message after 5 seconds
                setTimeout(() => this.submitSuccess.set(false), 5000);
            }, 1000);
        } else {
            Object.keys(this.contactForm.controls).forEach(key => {
                this.contactForm.get(key)?.markAsTouched();
            });
        }
    }
}
