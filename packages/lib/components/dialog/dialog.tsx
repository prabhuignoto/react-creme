import { CheckIcon, CloseIcon } from '@icons';
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
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
  isExiting: isExitingProp,
  isLoading,
  isSuccess,
  isError,
  onClose,
  onOpen,
  onPrimaryClick,
  onSecondaryClick,
  onSuccess: onSuccessDeprecated, // deprecated but kept for backward compatibility
  primaryButtonLabel = 'okay',
  secondaryButtonLabel = 'cancel',
  showCloseButton = true,
  showFooter = true,
  size = 'sm',
  title,
  titleLevel = 'h2',
  width = 300,
}: DialogProps) => {
  // Store reference to element that triggered dialog for return focus (WCAG 2.4.3)
  const triggerElementRef = useRef<HTMLElement | null>(
    typeof document !== 'undefined' ? (document.activeElement as HTMLElement) : null
  );

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

  // Ref for dialog container to focus it
  const dialogRef = useRef<HTMLDivElement>(null);

  const trapFocus = useTrapFocus<HTMLDivElement>(
    focusable ? 200 : null,
    focusable ? onOpen : null
  );

  // Focus dialog container on mount for better accessibility (WCAG 2.4.3)
  useEffect(() => {
    if (focusable && dialogRef.current) {
      setTimeout(() => {
        dialogRef.current?.focus();
      }, 200);
    }
  }, [focusable]);

  // Combined ref callback for both trapFocus and our dialogRef
  const refCallback = useCallback(
    (node: HTMLDivElement) => {
      dialogRef.current = node;
      if (trapFocus) {
        trapFocus.onInit(node);
      }
    },
    [trapFocus]
  );

  // Memoize focus props instead of imperatively mutating ref
  const focusProps = useMemo(
    () =>
      trapFocus
        ? {
            onKeyDown: trapFocus.handleKeyDown as unknown as React.KeyboardEventHandler<HTMLDivElement>,
            ref: refCallback,
            tabIndex: 0,
          }
        : {
            ref: refCallback,
            tabIndex: 0
          },
    [trapFocus, refCallback]
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
          [styles.exiting]: isExitingProp,
          [styles.isLoading]: isLoading,
          [styles.isSuccess]: isSuccess,
          [styles.isError]: isError,
        }
      ),
    [isClosing, animationType, size, isDarkMode, isExitingProp, isLoading, isSuccess, isError]
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
    onSuccessDeprecated?.();
    onClose?.();
  }, [onPrimaryClick, onSuccessDeprecated, onClose]);

  const handleSecondaryClick = useCallback(() => {
    onSecondaryClick?.();
    onClose?.();
  }, [onSecondaryClick, onClose]);

  const handleClose = useCallback(() => {
    // Return focus to the element that triggered dialog (WCAG 2.4.3 Focus Order)
    setTimeout(() => {
      if (triggerElementRef.current && triggerElementRef.current.focus) {
        triggerElementRef.current.focus();
      }
    }, 0);
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
      {isLoading && (
        <span role="status" aria-live="polite" className={styles.srOnly}>
          Loading...
        </span>
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
