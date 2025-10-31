import { CloseIcon } from '@icons';
import classNames from 'classnames';
import React from 'react';
import { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '../button/button';
import useTrapFocus from '../common/effects/useTrapFocus';
import { isDark } from '../common/utils';
import { withOverlay } from '../common/withOverlay';
import { DrawerProps } from './drawer-model';
import styles from './drawer.module.scss';

const DrawerComponent: React.FunctionComponent<DrawerProps> = ({
  ariaLabel,
  ariaLabelledby,
  ariaDescribedby,
  children,
  focusable = true,
  height = 300,
  isClosing,
  isExiting: isExitingProp,
  isLoading,
  isError,
  onClose,
  position = 'left',
  transition = 'cubic-bezier(0.79, 0.14, 0.15, 0.86)',
  width = 300,
  size = 'sm',
}) => {
  /**
   * State for activating the drawer
   */
  const [activate, setActivate] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  /**
   * Store reference to element that triggered drawer for return focus (WCAG 2.4.3)
   */
  const triggerElementRef = useRef<HTMLElement | null>(
    typeof document !== 'undefined' ? (document.activeElement as HTMLElement) : null
  );

  /**
   * Ref for the close button
   */
  const buttonRef = useRef<HTMLButtonElement>(null);

  /**
   * Ref for drawer container to focus it
   */
  const drawerRef = useRef<HTMLDivElement>(null);

  /**
   * Trap and cycle focus within the Drawer
   */
  const trapFocus = useTrapFocus<HTMLDivElement>(focusable ? 200 : null);

  /**
   * Focus drawer container on mount for better accessibility (WCAG 2.4.3)
   */
  useEffect(() => {
    if (focusable && drawerRef.current) {
      setTimeout(() => {
        drawerRef.current?.focus();
      }, 200);
    }
  }, [focusable]);

  /**
   * Exit animation handler with focus return
   */
  const exitAndClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setActivate(false);
      setIsExiting(false);
      // Return focus to trigger element (WCAG 2.4.3)
      if (triggerElementRef.current?.focus) {
        triggerElementRef.current.focus();
      }
      onClose?.();
    }, 200);
  }, [onClose]);

  /**
   * Combined ref callback for both trapFocus and our drawerRef
   */
  const refCallback = useCallback(
    (node: HTMLDivElement) => {
      drawerRef.current = node;
      if (trapFocus) {
        trapFocus.onInit(node);
      }
    },
    [trapFocus]
  );

  /**
   * Memoized focus props (replaces imperative ref mutation)
   */
  const focusProps = useMemo(() => {
    const base = {
      role: 'dialog' as const,
      'aria-modal': 'true' as const,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
      tabIndex: 0,
    };

    if (trapFocus) {
      return {
        ...base,
        onKeyDown: trapFocus.handleKeyDown as unknown as React.KeyboardEventHandler<HTMLDivElement>,
        ref: refCallback,
      };
    }

    return {
      ...base,
      ref: refCallback,
    };
  }, [ariaLabel, ariaLabelledby, ariaDescribedby, trapFocus, refCallback]);

  /**
   * Memoized styles for the drawer
   */
  const style = useMemo<CSSProperties>(() => {
    let newHeight: string | number = '100%';

    if (position === 'top' || position === 'bottom') {
      newHeight = Number.isInteger(height) ? `${height}px` : height || '300px';
    }

    return {
      '--min-height': `${newHeight}`,
      '--min-width': `${width}px`,
      '--transition': transition,
    } as CSSProperties;
  }, [position, height, width, transition]);

  // Get dark mode once (doesn't change during component lifecycle)
  const isDarkMode = isDark();

  /**
   * Memoized classnames for the drawer
   */
  const drawerClass = useMemo(
    () =>
      classNames([styles.drawer, styles[`${position}`]], {
        [styles[`slide_${position}_enter`]]: activate && !isClosing && !isExiting,
        [styles[`slide_${position}_exit`]]: isClosing || isExiting,
        [styles.visible]: activate,
        [styles[`${size}`]]: size,
        [styles.dark]: isDarkMode,
        [styles.exiting]: isExiting || isExitingProp,
        [styles.isLoading]: isLoading,
        [styles.isError]: isError,
      }),
    [activate, isClosing, isExiting, isExitingProp, position, size, isDarkMode, isLoading, isError]
  );

  /**
   * Activate the drawer on load
   */
  useEffect(() => {
    setActivate(true);
  }, []);

  return (
    <div
      className={drawerClass}
      style={style}
      {...focusProps}
    >
      <div className={styles['close-btn-wrapper']}>
        <Button
          type="icon"
          size={size}
          onClick={exitAndClose}
          focusable={focusable}
          ref={buttonRef}
        >
          <CloseIcon />
        </Button>
      </div>
      {children}
    </div>
  );
};

const Drawer = withOverlay<DrawerProps, null>(DrawerComponent, {
  disableAnimation: false,
  name: 'drawer',
});

Drawer.displayName = 'Drawer';

export { Drawer };
