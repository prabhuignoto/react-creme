import { isDark, useTrapFocus, withOverlay } from '@common';
import { CloseIcon } from '@common/icons';
import { Button } from '@core';
import classNames from 'classnames';
import * as React from 'react';
import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import { DrawerProps } from './drawer-model';
import styles from './drawer.module.scss';

const DrawerComponent: React.FunctionComponent<DrawerProps> = ({
  children,
  focusable = true,
  height = 300,
  isClosing,
  onClose,
  position = 'left',
  transition = 'cubic-bezier(0.79, 0.14, 0.15, 0.86)',
  width = 300,
  size = 'sm',
}) => {
  /**
   * state for activating the drawer
   */
  const [activate, setActivate] = useState(false);

  /**
   * Ref for the close button
   */
  const buttonRef = useRef<HTMLDivElement | null>(null);

  /**
   * Focus specific props will be stored in this ref
   */
  const focusProps = useRef({});

  /**
   * Trap and cycle focus within the Drawer
   */
  const trapFocus = useTrapFocus<HTMLDivElement>(focusable ? 200 : null);

  if (trapFocus) {
    const { onInit, handleKeyDown } = trapFocus;
    focusProps.current = { onKeyDown: handleKeyDown, ref: onInit, tabIndex: 0 };
  } else {
    focusProps.current = { tabIndex: 0 };
  }

  /**
   * memoized styles for the drawer
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
  }, []);

  const isDarkMode = useMemo(() => isDark(), []);

  /**
   * memoized classnames for the drawer
   */
  const drawerClass = useMemo(
    () =>
      classNames([styles.drawer, styles[`${position}`]], {
        [styles[`slide-${position}-enter`]]: activate && !isClosing,
        [styles[`slide-${position}-exit`]]: isClosing,
        [styles.visible]: activate,
        [styles[`${size}`]]: size,
        [styles.dark]: isDarkMode,
      }),
    [activate, isClosing]
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
      role="dialog"
      aria-modal="true"
      {...focusProps.current}
    >
      <div className={styles['close-btn-wrapper']}>
        <Button
          type="icon"
          size={size}
          onClick={onClose}
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
});

Drawer.displayName = 'Drawer';

export { Drawer };
