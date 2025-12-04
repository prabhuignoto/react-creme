import { FunctionComponent, type KeyboardEvent } from 'react';
import cx from 'classnames';
import { useCopyToClipboard } from '../../../common/hooks/useCopyToClipboard';
import { PackageManagerIcon } from './PackageManagerIcon';
import type { PackageManagerConfig } from '../types/install-commands';
import { CheckIcon, CopyIcon } from '../../../icons';
import styles from '../styles/install-command-card.module.scss';

export interface InstallCommandCardProps {
  config: PackageManagerConfig;
  isDarkMode?: boolean;
  className?: string;
}

/**
 * InstallCommandCard - Reusable card component for displaying install commands
 *
 * Features:
 * - Copy-to-clipboard functionality with visual feedback
 * - Package manager icon/badge
 * - Hover effects and animations
 * - Keyboard accessible
 * - Screen reader support
 */
export const InstallCommandCard: FunctionComponent<InstallCommandCardProps> = ({
  config,
  isDarkMode = false,
  className,
}) => {
  const { copied, copy, error } = useCopyToClipboard({ resetDelay: 2000 });

  const handleCopy = async () => {
    await copy(config.command);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCopy();
    }
  };

  return (
    <div
      className={cx(styles.install_card, isDarkMode && styles.dark, className)}
    >
      <div className={styles.card_content}>
        <PackageManagerIcon
          packageManager={config.id}
          size="md"
          className={styles.package_icon}
        />
        <code className={styles.command_text}>{config.command}</code>
      </div>
      <button
        className={cx(
          styles.copy_button,
          copied && styles.copied,
          error && styles.error
        )}
        onClick={handleCopy}
        onKeyDown={handleKeyDown}
        aria-label={`Copy ${config.name} install command`}
        aria-live="polite"
        type="button"
      >
        {copied ? (
          <>
            <CheckIcon />
            <span className={styles.copy_feedback}>Copied!</span>
          </>
        ) : (
          <>
            <CopyIcon />
            <span className={styles.copy_feedback}>Copy</span>
          </>
        )}
      </button>
      {error && (
        <span className={styles.error_message} role="alert">
          Failed to copy
        </span>
      )}
    </div>
  );
};
