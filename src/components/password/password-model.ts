export interface PasswordModel {
  minimumLength: number;
  maximumLength: number;
  requireDigit: boolean;
  requireLowercase: boolean;
  requireUppercase: boolean;
  requireNonAlphanumeric: boolean;
}
