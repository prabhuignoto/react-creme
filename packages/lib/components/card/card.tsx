import classNames from 'classnames';
import React, { useCallback, useMemo } from 'react';
import { isDark } from '../common/utils';
import { CardProps } from './card-model';
import styles from './card.module.scss';

/**
 * Card Component - A flexible container component with optional header, body, and footer sections
 *
 * Features:
 * - Configurable header and footer with alignment options
 * - Optional border and shadow styling
 * - Responsive sizing with size variants
 * - Dark mode support
 * - Accessible with proper ARIA attributes and semantic HTML
 */
const Card: React.FunctionComponent<CardProps> = ({
  alignFooter = 'left',
  alignHeader = 'left',
  border = false,
  children,
  footer,
  header,
  height = 200,
  shadow = true,
  size = 'md',
  ariaLabel,
  interactive = false,
  onClick,
}) => {
  // ✅ FIXED: Call isDark() directly instead of useMemo with empty deps
  const isDarkMode = isDark();

  // ✅ FIXED: Include all used variables in dependencies
  const style = useMemo(
    () => ({
      '--height': `${height}px`,
      gridTemplateRows: `${header ? '50px' : ''} 1fr ${
        footer ? '50px' : ''
      }`.trim(),
    }),
    [height, header, footer]
  );

  // ✅ FIXED: Include all used variables in dependencies
  const cardWrapperClass = useMemo(
    () =>
      classNames(styles.wrapper, {
        [styles.border_less]: !border,
        [styles.shadow]: shadow,
        [styles.dark]: isDarkMode,
        [styles[size]]: size,
        [styles.interactive]: interactive,
      }),
    [border, shadow, isDarkMode, size, interactive]
  );

  // ✅ FIXED: Include alignHeader in dependencies
  const cardHeaderClass = useMemo(
    () =>
      classNames(styles.header, {
        [styles[`align_${alignHeader}`]]: true,
      }),
    [alignHeader]
  );

  // ✅ FIXED: Include alignFooter in dependencies
  const cardFooterClass = useMemo(
    () =>
      classNames(styles.footer, {
        [styles[`align_${alignFooter}`]]: true,
      }),
    [alignFooter]
  );

  // ✅ FIXED: Include header and cardHeaderClass in dependencies
  // Using div instead of header to avoid landmark nesting issues when card has role="region"
  const renderHeader = useMemo(
    () =>
      header ? (
        <div className={cardHeaderClass} role="heading" aria-level={2}>
          {header}
        </div>
      ) : null,
    [header, cardHeaderClass]
  );

  // ✅ FIXED: Include children in dependencies
  const renderBody = useMemo(
    () => <div className={styles.body}>{children}</div>,
    [children]
  );

  // ✅ FIXED: Include footer and cardFooterClass in dependencies
  // Using div instead of footer to avoid landmark nesting issues when card has role="region"
  const renderFooter = useMemo(
    () => (footer ? <div className={cardFooterClass}>{footer}</div> : null),
    [footer, cardFooterClass]
  );

  const handleClick = useCallback(() => {
    if (interactive && onClick) {
      onClick();
    }
  }, [interactive, onClick]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (interactive && onClick && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick();
      }
    },
    [interactive, onClick]
  );

  return (
    <div
      className={cardWrapperClass}
      style={style}
      role={ariaLabel ? 'region' : undefined}
      aria-label={ariaLabel}
      onClick={interactive ? handleClick : undefined}
      onKeyDown={interactive ? handleKeyDown : undefined}
      tabIndex={interactive ? 0 : undefined}
    >
      {renderHeader}
      {renderBody}
      {renderFooter}
    </div>
  );
};

Card.displayName = 'Card';

export { Card };
