import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

/**
 * Register Component - التسجيل
 */
@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule, LoadingSpinnerComponent],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
    registerForm!: FormGroup;
    isSubmitting = false;
    error: string | null = null;
    showPassword = false;
    showPasswordConfirm = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.initForm();
    }

    initForm(): void {
        this.registerForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.pattern(/^[0-9]{10,15}$/)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            password_confirmation: ['', [Validators.required]],
            termsAccepted: [false, [Validators.requiredTrue]]
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
        if (this.registerForm.invalid) {
            this.registerForm.markAllAsTouched();
            return;
        }

        this.isSubmitting = true;
        this.error = null;

        const formData = { ...this.registerForm.value };
        delete formData.termsAccepted;

        this.authService.register(formData).subscribe({
            next: (response: any) => {
                if (response.success) {
                    this.router.navigate(['/']);
                }
            },
            error: (err: any) => {
                this.error = err.error?.message || 'حدث خطأ أثناء التسجيل';
                this.isSubmitting = false;
            },
            complete: () => {
                this.isSubmitting = false;
            }
        });
    }

    isFieldInvalid(fieldName: string): boolean {
        const field = this.registerForm.get(fieldName);
        return !!(field && field.invalid && (field.dirty || field.touched));
    }

    getErrorMessage(fieldName: string): string {
        const field = this.registerForm.get(fieldName);

        if (field?.hasError('required')) {
            return 'هذا الحقل مطلوب';
        }
        if (field?.hasError('email')) {
            return 'البريد الإلكتروني غير صحيح';
        }
        if (field?.hasError('minlength')) {
            const minLength = field.getError('minlength').requiredLength;
            return `يجب أن يكون ${minLength} أحرف على الأقل`;
        }
        if (field?.hasError('pattern')) {
            return 'رقم الهاتف غير صحيح';
        }

        if (fieldName === 'password_confirmation' && this.registerForm.hasError('passwordMismatch')) {
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
