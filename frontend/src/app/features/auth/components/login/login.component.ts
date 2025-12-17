import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

/**
 * Login Component - تسجيل الدخول
 */
@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule, LoadingSpinnerComponent],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    isSubmitting = false;
    error: string | null = null;
    showPassword = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.initForm();
    }

    initForm(): void {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            rememberMe: [false]
        });
    }

    onSubmit(): void {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }

        this.isSubmitting = true;
        this.error = null;

        const { email, password } = this.loginForm.value;

        this.authService.login({ email, password }).subscribe({
            next: (response) => {
                if (response.success) {
                    this.router.navigate(['/']);
                }
            },
            error: (err) => {
                this.error = err.error?.message || 'حدث خطأ أثناء تسجيل الدخول';
                this.isSubmitting = false;
            },
            complete: () => {
                this.isSubmitting = false;
            }
        });
    }

    isFieldInvalid(fieldName: string): boolean {
        const field = this.loginForm.get(fieldName);
        return !!(field && field.invalid && (field.dirty || field.touched));
    }

    getErrorMessage(fieldName: string): string {
        const field = this.loginForm.get(fieldName);

        if (field?.hasError('required')) {
            return 'هذا الحقل مطلوب';
        }
        if (field?.hasError('email')) {
            return 'البريد الإلكتروني غير صحيح';
        }
        if (field?.hasError('minlength')) {
            return 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
        }

        return '';
    }

    togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword;
    }
}
