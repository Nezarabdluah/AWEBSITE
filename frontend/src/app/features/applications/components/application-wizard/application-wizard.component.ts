import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from '../../services/application.service';
import { Application } from '../../../../core/models';

/**
 * Application Wizard Component
 * Multi-step form للتقديم على الجامعات
 */
@Component({
    selector: 'app-application-wizard',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './application-wizard.component.html',
    styleUrl: './application-wizard.component.scss'
})
export class ApplicationWizardComponent implements OnInit {
    currentStep = signal(1);
    totalSteps = 4;
    isSubmitting = signal(false);

    // Forms for each step
    personalInfoForm!: FormGroup;
    academicForm!: FormGroup;
    programForm!: FormGroup;
    documentsForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private applicationService: ApplicationService,
        private router: Router
    ) {
        this.initForms();
    }

    ngOnInit(): void {
        // Load draft if exists
        this.loadDraft();
    }

    /**
     * Initialize forms for all steps
     */
    private initForms(): void {
        // Step 1: Personal Information
        this.personalInfoForm = this.fb.group({
            full_name: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required]],
            date_of_birth: ['', [Validators.required]],
            nationality: ['', [Validators.required]],
            address: ['', [Validators.required]],
            city: ['', [Validators.required]],
            country: ['', [Validators.required]]
        });

        // Step 2: Academic Background
        this.academicForm = this.fb.group({
            current_education_level: ['', [Validators.required]],
            gpa: ['', [Validators.min(0), Validators.max(100)]],
            graduation_year: ['', [Validators.required]],
            previous_university: [''],
            ielts_score: ['', [Validators.min(0), Validators.max(9)]],
            toefl_score: ['', [Validators.min(0), Validators.max(120)]]
        });

        // Step 3: Program Selection
        this.programForm = this.fb.group({
            university_id: ['', [Validators.required]],
            specialization_id: ['', [Validators.required]],
            motivation_letter: [''],
            research_interests: ['']
        });

        // Step 4: Documents (mock - just checkboxes)
        this.documentsForm = this.fb.group({
            passport_uploaded: [false],
            transcript_uploaded: [false],
            diploma_uploaded: [false],
            cv_uploaded: [false]
        });
    }

    /**
     * Load draft from localStorage
     */
    private loadDraft(): void {
        const draft = this.applicationService.getDraft();
        if (draft) {
            // Populate forms with draft data
            this.personalInfoForm.patchValue(draft);
            this.academicForm.patchValue(draft);
            this.programForm.patchValue(draft);
        }
    }

    /**
     * Save current progress as draft
     */
    saveDraft(): void {
        const draftData = {
            ...this.personalInfoForm.value,
            ...this.academicForm.value,
            ...this.programForm.value
        };
        this.applicationService.saveDraft(draftData);
    }

    /**
     * Navigate to next step
     */
    nextStep(): void {
        if (this.currentStep() < this.totalSteps) {
            // Validate current step form
            if (this.isCurrentStepValid()) {
                this.saveDraft();
                this.currentStep.update(v => v + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    }

    /**
     * Navigate to previous step
     */
    previousStep(): void {
        if (this.currentStep() > 1) {
            this.currentStep.update(v => v - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    /**
     * Go to specific step
     */
    goToStep(step: number): void {
        if (step >= 1 && step <= this.totalSteps) {
            this.currentStep.set(step);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    /**
     * Check if current step is valid
     */
    isCurrentStepValid(): boolean {
        switch (this.currentStep()) {
            case 1:
                return this.personalInfoForm.valid;
            case 2:
                return this.academicForm.valid;
            case 3:
                return this.programForm.valid;
            case 4:
                return true; // Documents are optional
            default:
                return false;
        }
    }

    /**
     * Get progress percentage
     */
    getProgress(): number {
        return (this.currentStep() / this.totalSteps) * 100;
    }

    /**
     * Submit application
     */
    submitApplication(): void {
        // Validate all forms
        if (!this.personalInfoForm.valid || !this.academicForm.valid || !this.programForm.valid) {
            return;
        }

        this.isSubmitting.set(true);

        // Combine all form data
        const applicationData: Partial<Application> = {
            user_id: 1, // TODO: Get from auth service
            ...this.personalInfoForm.value,
            ...this.academicForm.value,
            ...this.programForm.value
        };

        // Submit to service
        this.applicationService.submit(applicationData).subscribe({
            next: (response) => {
                this.isSubmitting.set(false);
                // Navigate to success page
                this.router.navigate(['/applications/success'], {
                    queryParams: { id: response.id }
                });
            },
            error: (error) => {
                this.isSubmitting.set(false);
                console.error('Error submitting application:', error);
                alert('حدث خطأ أثناء إرسال الطلب. حاول مرة أخرى.');
            }
        });
    }

    /**
     * Get step title
     */
    getStepTitle(step: number): string {
        const titles = [
            'المعلومات الشخصية',
            'الخلفية الأكاديمية',
            'اختيار البرنامج',
            'المستندات'
        ];
        return titles[step - 1] || '';
    }

    /**
     * Get step icon
     */
    getStepIcon(step: number): string {
        const icons = ['👤', '🎓', '🎯', '📄'];
        return icons[step - 1] || '';
    }
}
