import type { ReactNode } from 'react';

/**
 * Package manager types
 */
export type PackageManager = 'npm' | 'yarn' | 'pnpm' | 'bun';

/**
 * Color scheme for package manager branding
 */
export interface PackageManagerColors {
  primary: string;
  secondary?: string;
  text: string;
}

/**
 * Package manager metadata
 */
export interface PackageManagerConfig {
  id: PackageManager;
  name: string;
  command: string;
  colors: PackageManagerColors;
  icon?: ReactNode;
}

/**
 * Install command data structure
 */
export interface InstallCommand {
  packageManager: PackageManager;
  label: string;
  command: string;
  colors: PackageManagerColors;
}
