import { CloseIcon } from '@icons';
import classNames from 'classnames';
import React, {
  CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Button } from '../button/button';
import useTrapFocus from '../common/effects/useTrapFocus';
import { isDark } from '../common/utils';
import { withOverlay } from '../common/withOverlay';
import { DrawerProps } from './drawer-model';
import styles from './drawer.module.scss';

/**
 * DrawerComponent
 *    @property {React.ReactNode} children - The children nodes.
 *    @property {boolean} focusable - Whether the drawer is focusable.
 *    @property {number} height - The height of the drawer.
 *    @property {boolean} isClosing - Whether the drawer is closing.
 *    @property {() => void} onClose - Function to handle drawer close.
 *    @property {string} position - The position of the drawer.
 *    @property {string} transition - The transition of the drawer.
 *    @property {number} width - The width of the drawer.
 *    @property {string} size - The size of the drawer.
 * @returns {JSX.Element} The DrawerComponent.
 */
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
  const [activate, setActivate] = useState(false);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const focusProps = useRef({});

  const trapFocus = useTrapFocus<HTMLDivElement>(focusable ? 200 : null);

  if (trapFocus) {
    const { onInit, handleKeyDown } = trapFocus;
    focusProps.current = { onKeyDown: handleKeyDown, ref: onInit, tabIndex: 0 };
  } else {
    focusProps.current = { tabIndex: 0 };
  }

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
  }, [height, width, transition, position]);

  const isDarkMode = useMemo(() => isDark(), []);

  const drawerClass = useMemo(
    () =>
      classNames([styles.drawer, styles[`${position}`]], {
        [styles[`slide_${position}_enter`]]: activate && !isClosing,
        [styles[`slide_${position}_exit`]]: isClosing,
        [styles.visible]: activate,
        [styles[`${size}`]]: size,
        [styles.dark]: isDarkMode,
      }),
    [activate, isClosing, position, size, isDarkMode]
  );

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

/**
 * Drawer
 *    @property {DrawerProps} DrawerProps - The properties of the Drawer.
 *    @property {null} null - No additional properties.
 * @returns {JSX.Element} The Drawer component with an overlay.
 */
const Drawer = withOverlay<DrawerProps, null>(DrawerComponent, {
  disableAnimation: false,
  name: 'drawer',
});

Drawer.displayName = 'Drawer';

export { Drawer };
