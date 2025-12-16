// نموذج المستخدم
export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// أنواع المستخدمين
export enum UserRole {
  ADMIN = 'admin',
  CONSULTANT = 'consultant',
  STUDENT = 'student'
}

// بيانات تسجيل الدخول
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// بيانات التسجيل
export interface RegisterData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  phone?: string;
  acceptTerms: boolean;
}

// استجابة تسجيل الدخول
export interface AuthResponse {
  user: User;
  token: string;
  expiresIn: number;
}