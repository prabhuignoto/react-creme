import { UserIcon } from '@icons';
import classNames from 'classnames';
import React, { CSSProperties, FunctionComponent, useMemo } from 'react';
import { AvatarProps } from './avatar.model';
import styles from './avatar.module.scss';

/**
 * Avatar Component - Display user avatars with letters, icons, or custom content
 *
 * Features:
 * - Size variants (sm, md, lg)
 * - Custom content, letters, or default user icon
 * - Custom colors
 * - Accessible with proper ARIA attributes
 */
const Avatar: FunctionComponent<AvatarProps> = React.memo(
  ({
    size = 'sm',
    children,
    letter = '',
    ariaLabel,
    alt = 'User avatar',
    bgColor,
    color,
  }) => {
    // ✅ FIXED: Include all dependencies in useMemo
    const wrapperClass = useMemo(
      () => classNames(styles.avatar, styles[size]),
      [size]
    );

    // Custom styling support
    const style = useMemo(
      () =>
        ({
          ...(bgColor && { '--avatar-bg-color': bgColor }),
          ...(color && { '--avatar-color': color }),
        }) as CSSProperties,
      [bgColor, color]
    );

    // Determine content priority: children > letter > default icon
    const content = useMemo(() => {
      if (children) return children;
      if (letter) return letter;
      return <UserIcon />;
    }, [children, letter]);

    // Generate accessible label
    const accessibleLabel = useMemo(() => {
      if (ariaLabel) return ariaLabel;
      if (letter) return `Avatar with initial ${letter}`;
      return alt;
    }, [ariaLabel, letter, alt]);

    return (
      <div
        className={wrapperClass}
        role="img"
        aria-label={accessibleLabel}
        style={style}
      >
        <span className={styles.icon_container} aria-hidden="true">
          {content}
        </span>
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export { Avatar };
