import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

/**
 * Reset Password Component - إعادة تعيين كلمة المرور
 */
@Component({
    selector: 'app-reset-password',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule, LoadingSpinnerComponent],
    templateUrl: './reset-password.component.html',
    styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
    resetForm!: FormGroup;
    isSubmitting = signal(false);
    error = signal<string | null>(null);
    success = signal(false);
    token: string | null = null;
    showPassword = false;
    showPasswordConfirm = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.token = this.route.snapshot.queryParamMap.get('token');

        if (!this.token) {
            this.error.set('رابط غير صالح');
            return;
        }

        this.initForm();
    }

    initForm(): void {
        this.resetForm = this.fb.group({
            password: ['', [Validators.required, Validators.minLength(6)]],
            password_confirmation: ['', [Validators.required]]
        }, { validators: this.passwordMatchValidator });
    }

    passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
        const password = control.get('password');
        const passwordConfirm = control.get('password_confirmation');

        if (password && passwordConfirm && password.value !== passwordConfirm.value) {
            return { passwordMismatch: true };
        }

        return null;
    }

    onSubmit(): void {
        if (this.resetForm.invalid || !this.token) {
            this.resetForm.markAllAsTouched();
            return;
        }

        this.isSubmitting.set(true);
        this.error.set(null);

        const { password, password_confirmation } = this.resetForm.value;

        this.authService.resetPassword(this.token, password, password_confirmation).subscribe({
            next: (response: any) => {
                if (response.success) {
                    this.success.set(true);
                    setTimeout(() => {
                        this.router.navigate(['/auth/login']);
                    }, 3000);
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
        const field = this.resetForm.get(fieldName);
        return !!(field && field.invalid && (field.dirty || field.touched));
    }

    getErrorMessage(fieldName: string): string {
        const field = this.resetForm.get(fieldName);

        if (field?.hasError('required')) {
            return 'هذا الحقل مطلوب';
        }
        if (field?.hasError('minlength')) {
            return 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
        }

        if (fieldName === 'password_confirmation' && this.resetForm.hasError('passwordMismatch')) {
            return 'كلمات المرور غير متطابقة';
        }

        return '';
    }

    togglePasswordVisibility(field: 'password' | 'confirm'): void {
        if (field === 'password') {
            this.showPassword = !this.showPassword;
        } else {
            this.showPasswordConfirm = !this.showPasswordConfirm;
        }
    }
}
