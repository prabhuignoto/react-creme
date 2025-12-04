import type { PackageManagerConfig } from '../types/install-commands';

/**
 * Package manager configurations
 * Centralized data source for install commands
 */
export const PACKAGE_MANAGERS: PackageManagerConfig[] = [
  {
    colors: {
      primary: '#CB3837',
      secondary: '#C63628',
      text: '#FFFFFF',
    },
    command: 'npm install react-creme',
    id: 'npm',
    name: 'npm',
  },
  {
    colors: {
      primary: '#2C8EBB',
      secondary: '#2188B6',
      text: '#FFFFFF',
    },
    command: 'yarn add react-creme',
    id: 'yarn',
    name: 'yarn',
  },
  {
    colors: {
      primary: '#F69220',
      secondary: '#F57C00',
      text: '#FFFFFF',
    },
    command: 'pnpm add react-creme',
    id: 'pnpm',
    name: 'pnpm',
  },
  {
    colors: {
      primary: '#FBF0DF',
      secondary: '#F9E6C8',
      text: '#000000',
    },
    command: 'bun add react-creme',
    id: 'bun',
    name: 'bun',
  },
];

/**
 * Get package manager config by ID
 */
export function getPackageManagerConfig(
  id: string
): PackageManagerConfig | undefined {
  return PACKAGE_MANAGERS.find(pm => pm.id === id);
}

/**
 * Get all package manager IDs
 */
export function getPackageManagerIds(): string[] {
  return PACKAGE_MANAGERS.map(pm => pm.id);
}
