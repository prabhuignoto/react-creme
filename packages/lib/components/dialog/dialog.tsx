import { CheckIcon, CloseIcon } from '@icons';
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, { useMemo, useRef } from 'react';
import { Button } from '../button/button';
import useTrapFocus from '../common/effects/useTrapFocus';
import { isDark } from '../common/utils';
import { withOverlay } from '../common/withOverlay';
import { DialogProps } from './dialog-model';
import styles from './dialog.module.scss';

/**
 * DialogComponent
 *    @property {number} animationDuration - The duration of the animation.
 *    @property {string} animationType - The type of the animation.
 *    @property {React.ReactNode} children - The children nodes.
 *    @property {boolean} focusable - Whether the dialog is focusable.
 *    @property {number} height - The height of the dialog.
 *    @property {boolean} isClosing - Whether the dialog is closing.
 *    @property {() => void} onClose - Function to handle dialog close.
 *    @property {() => void} onOpen - Function to handle dialog open.
 *    @property {() => void} onSuccess - Function to handle success event.
 *    @property {string} size - The size of the dialog.
 *    @property {string} title - The title of the dialog.
 *    @property {number} width - The width of the dialog.
 * @returns {JSX.Element} The DialogComponent.
 */
const DialogComponent: React.FunctionComponent<DialogProps> = ({
  animationDuration = 250,
  animationType = 'pop',
  children,
  focusable = true,
  height = 200,
  isClosing,
  onClose,
  onOpen,
  onSuccess,
  size = 'sm',
  title,
  width = 300,
}: DialogProps) => {
  // useRef is used to create mutable variables that persist across re-renders.
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const focusProps = useRef({});
  const id = useRef(`rc-dialog-${nanoid()}`);

  // useTrapFocus is a custom hook that traps focus within a component.
  const trapFocus = useTrapFocus<HTMLDivElement>(
    focusable ? 200 : null,
    focusable ? onOpen : null
  );

  // Set focusProps based on whether trapFocus is enabled.
  if (trapFocus) {
    focusProps.current = {
      onKeyDown: trapFocus.handleKeyDown,
      ref: trapFocus.onInit,
      tabIndex: 0,
    };
  } else {
    focusProps.current = { tabIndex: 0 };
  }

  // useMemo is used to optimize performance by memoizing the output of expensive function calls.
  const isDarkMode = useMemo(() => isDark(), []);
  const dialogClass = useMemo(
    () =>
      classNames([
        styles.dialog,
        isClosing
          ? styles[`${animationType}_leave`]
          : styles[`${animationType}_enter`],
        styles[`dialog-${size}`],
        isDarkMode && styles.dark,
      ]),
    [isClosing, size, isDarkMode]
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

  const titleClass = useMemo(
    () => classNames(styles.title, isDarkMode && styles.dark),
    [isDarkMode]
  );

  // handleSuccess and handleClose are event handlers for the dialog's buttons.
  const handleSuccess = () => {
    onSuccess?.();
    onClose?.();
  };

  const handleClose = () => {
    onClose?.();
  };

  return (
    <div
      className={dialogClass}
      role="dialog"
      aria-labelledby={id.current}
      style={style}
      {...focusProps.current}
    >
      <header className={styles.header}>
        <h2 className={titleClass} id={id.current}>
          {title}
        </h2>
        <div className={styles.button_wrapper}>
          <Button
            type="icon"
            onClick={handleClose}
            size={size}
            focusable={focusable}
            ref={buttonRef}
          >
            <CloseIcon />
          </Button>
        </div>
      </header>
      <section className={styles.body}>{children}</section>
      <footer className={styles.footer}>
        <Button
          label="okay"
          type="primary"
          onClick={handleSuccess}
          focusable={focusable}
          size={size}
        >
          <CheckIcon />
        </Button>
        <Button
          label="cancel"
          onClick={handleClose}
          focusable={focusable}
          size={size}
        >
          <CloseIcon />
        </Button>
      </footer>
    </div>
  );
};

// withOverlay is a higher-order component that adds an overlay to the DialogComponent.
const Dialog = withOverlay<DialogProps, null>(DialogComponent, {
  backdropColor: 'rgba(0, 0, 0, 0.85)',
  disableAnimation: false,
  hideDocumentOverflow: true,
  name: 'dialog',
});

Dialog.displayName = 'Dialog';

export { Dialog };
