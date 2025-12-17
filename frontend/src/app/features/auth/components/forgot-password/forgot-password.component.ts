import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

/**
 * Forgot Password Component - نسيت كلمة المرور
 */
@Component({
    selector: 'app-forgot-password',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule, LoadingSpinnerComponent],
    templateUrl: './forgot-password.component.html',
    styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit {
    forgotForm!: FormGroup;
    isSubmitting = signal(false);
    error = signal<string | null>(null);
    success = signal(false);

    constructor(
        private fb: FormBuilder,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.initForm();
    }

    initForm(): void {
        this.forgotForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    onSubmit(): void {
        if (this.forgotForm.invalid) {
            this.forgotForm.markAllAsTouched();
            return;
        }

        this.isSubmitting.set(true);
        this.error.set(null);

        const { email } = this.forgotForm.value;

        this.authService.forgotPassword(email).subscribe({
            next: (response: any) => {
                if (response.success) {
                    this.success.set(true);
                }
            },
            error: (err: any) => {
                this.error.set(err.error?.message || 'حدث خطأ. حاول مرة أخرى');
                this.isSubmitting.set(false);
            },
            complete: () => {
                this.isSubmitting.set(false);
            }
        });
    }

    isFieldInvalid(fieldName: string): boolean {
        const field = this.forgotForm.get(fieldName);
        return !!(field && field.invalid && (field.dirty || field.touched));
    }

    getErrorMessage(fieldName: string): string {
        const field = this.forgotForm.get(fieldName);

        if (field?.hasError('required')) {
            return 'هذا الحقل مطلوب';
        }
        if (field?.hasError('email')) {
            return 'البريد الإلكتروني غير صحيح';
        }

        return '';
    }
}
