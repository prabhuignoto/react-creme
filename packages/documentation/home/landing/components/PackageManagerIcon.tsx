import { FunctionComponent } from 'react';
import type { PackageManager } from '../types/install-commands';
import styles from '../styles/package-manager-icon.module.scss';

export interface PackageManagerIconProps {
  packageManager: PackageManager;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * PackageManagerIcon - Displays a styled badge/icon for package managers
 *
 * Features:
 * - Consistent styling across all package managers
 * - Color-coded badges matching official branding
 * - Responsive sizing
 * - Accessible labels
 */
export const PackageManagerIcon: FunctionComponent<PackageManagerIconProps> = ({
  packageManager,
  size = 'md',
  className,
}) => {
  return (
    <span
      className={`${styles.package_icon} ${styles[size]} ${className || ''}`}
      data-package-manager={packageManager}
      aria-label={`${packageManager} package manager`}
    >
      {packageManager.toUpperCase()}
    </span>
  );
};
