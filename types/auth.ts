export interface ILoginForm {
  email: string;
  password: string;
}

export interface ISignUpForm {
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface IForgotPasswordForm {
  email: string;
}
