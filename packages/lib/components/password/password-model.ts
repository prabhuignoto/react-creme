export interface PasswordModel {
  maximumLength: number;
  minimumLength: number;
  requireDigit: boolean;
  requireLowercase: boolean;
  requireNonAlphanumeric: boolean;
  requireUppercase: boolean;
}
