export interface ILoginForm {
  email: string;
  password: string;
}

export interface ISignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
  captchaToken: string;
  isAgreeTerms: boolean;
}

export interface IForgotPasswordForm {
  email: string;
  captchaToken: string;
}

export interface IResetPasswordForm {
  password: string;
  confirmPassword: string;
  captchaToken: string;
}
