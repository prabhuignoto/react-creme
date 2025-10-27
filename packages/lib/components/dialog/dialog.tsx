import { CheckIcon, CloseIcon } from '@icons';
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, { useCallback, useMemo, useRef } from 'react';
import { Button } from '../button/button';
import useTrapFocus from '../common/effects/useTrapFocus';
import { isDark } from '../common/utils';
import { withOverlay } from '../common/withOverlay';
import { DialogProps } from './dialog-model';
import styles from './dialog.module.scss';

const DialogComponent: React.FunctionComponent<DialogProps> = ({
  animationDuration = 250,
  animationType = 'pop',
  children,
  focusable = true,
  height = 200,
  isClosing,
  onClose,
  onOpen,
  onPrimaryClick,
  onSecondaryClick,
  onSuccess, // deprecated but kept for backward compatibility
  primaryButtonLabel = 'okay',
  secondaryButtonLabel = 'cancel',
  showCloseButton = true,
  showFooter = true,
  size = 'sm',
  title,
  titleLevel = 'h2',
  width = 300,
}: DialogProps) => {
  // Initialize ID once with lazy initialization
  const id = useRef<string | undefined>(undefined);
  if (!id.current) {
    id.current = `rc-dialog-${nanoid()}`;
  }

  const bodyId = useRef<string | undefined>(undefined);
  if (!bodyId.current) {
    bodyId.current = `${id.current}-body`;
  }

  // Get dark mode once (doesn't change during component lifecycle)
  const isDarkMode = isDark();

  const trapFocus = useTrapFocus<HTMLDivElement>(
    focusable ? 200 : null,
    focusable ? onOpen : null
  );

  // Memoize focus props instead of imperatively mutating ref
  const focusProps = useMemo(
    () =>
      trapFocus
        ? {
            onKeyDown: trapFocus.handleKeyDown as unknown as React.KeyboardEventHandler<HTMLDivElement>,
            ref: trapFocus.onInit,
            tabIndex: 0,
          }
        : { tabIndex: 0 },
    [trapFocus]
  );

  const dialogClass = useMemo(
    () =>
      classNames(
        [
          styles.dialog,
          isClosing
            ? styles[`${animationType}_leave`]
            : styles[`${animationType}_enter`],
        ],
        {
          [styles[`dialog-${size}`]]: true,
          [styles.dark]: isDarkMode,
        }
      ),
    [isClosing, animationType, size, isDarkMode]
  );

  const style = useMemo(
    () => ({
      '--min-width': `${width}px`,
      '--rc-dialog-animation': animationType,
      '--rc-dialog-animation-duration': `${animationDuration}ms`,
      minHeight: height ? `${height}px` : 'auto',
    }),
    [width, height, animationType, animationDuration]
  );

  const handlePrimaryClick = useCallback(() => {
    // Support both new onPrimaryClick and deprecated onSuccess
    onPrimaryClick?.();
    onSuccess?.();
    onClose?.();
  }, [onPrimaryClick, onSuccess, onClose]);

  const handleSecondaryClick = useCallback(() => {
    onSecondaryClick?.();
    onClose?.();
  }, [onSecondaryClick, onClose]);

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const titleClass = useMemo(
    () => classNames(styles.title, isDarkMode ? styles.dark : ''),
    [isDarkMode]
  );

  return (
    <div
      className={dialogClass}
      role="dialog"
      aria-modal="true"
      aria-labelledby={id.current}
      aria-describedby={bodyId.current}
      style={style}
      {...focusProps}
    >
      <header className={styles.header}>
        {React.createElement(
          titleLevel,
          { className: titleClass, id: id.current },
          title
        )}
        {showCloseButton && (
          <div className={styles.button_wrapper}>
            <Button
              type="icon"
              onClick={handleClose}
              size={size}
              focusable={focusable}
            >
              <CloseIcon />
            </Button>
          </div>
        )}
      </header>
      <section className={styles.body} id={bodyId.current}>
        {children}
      </section>
      {showFooter && (
        <footer className={styles.footer}>
          <Button
            label={primaryButtonLabel}
            type="primary"
            onClick={handlePrimaryClick}
            focusable={focusable}
            size={size}
          >
            <CheckIcon />
          </Button>
          <Button
            label={secondaryButtonLabel}
            onClick={handleSecondaryClick}
            focusable={focusable}
            size={size}
          >
            <CloseIcon />
          </Button>
        </footer>
      )}
    </div>
  );
};

const Dialog = withOverlay<DialogProps, null>(DialogComponent, {
  backdropColor: 'rgba(0, 0, 0, 0.85)',
  disableAnimation: false,
  hideDocumentOverflow: true,
  name: 'dialog',
});

Dialog.displayName = 'Dialog';

export { Dialog };
