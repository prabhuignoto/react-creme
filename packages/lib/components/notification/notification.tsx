import { CloseIcon } from '@icons';
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { Button } from '../button/button';
import { useCloseOnEscape } from '../common/effects/useCloseOnEsc';
import useSwipe from '../common/effects/useSwipe';
import { isDark } from '../common/utils';
import { withOverlay } from '../common/withOverlay';
import { NotificationProps } from './notification-model';
import styles from './notification.module.scss';

const NotificationComponent: React.FunctionComponent<NotificationProps> = ({
  autoClose,
  children,
  height = 150,
  isClosing,
  onClose,
  position,
  swipeToClose = true,
  title,
  width = 350,
  disableHeader = false,
  size = 'md',
}) => {
  const isDarkMode = isDark();

  // Generate stable IDs for accessibility
  const titleId = useRef(`notification-title-${nanoid()}`);
  const contentId = useRef(`notification-content-${nanoid()}`);

  const wrapperClass = useMemo(
    () =>
      classNames([
        styles.wrapper,
        {
          [styles[`${position}_enter`]]: !isClosing,
          [styles[`${position}_exit`]]: isClosing,
          [styles[`${size}`]]: true,
          [styles.dark]: isDarkMode,
        },
      ]),
    [position, isClosing, size, isDarkMode]
  );

  const ref = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  useCloseOnEscape(handleClose, ref as React.RefObject<HTMLDivElement>);

  const wrapperStyle = useMemo(
    () =>
      ({
        '--min-height': `${height}px`,
        '--min-width': `${width}px`,
      }) as CSSProperties,
    [height, width]
  );

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose, handleClose]);

  const canSwipeToClose = useMemo(() => {
    const xPosition = position?.split('-')[1] || '';
    const leftORight = xPosition === 'left' || xPosition === 'right';
    return swipeToClose && !autoClose && leftORight;
  }, [position, swipeToClose, autoClose]);

  const { swipeState: state, onInit } = useSwipe('medium');

  useEffect(() => {
    if (state && canSwipeToClose) {
      const xPosition = position?.split('-')[1] || '';
      if (state.offset > 0 && state.dir.toLowerCase() === xPosition) {
        handleClose();
      }
    }
  }, [state, canSwipeToClose, position, handleClose]);

  const headerClass = useMemo(
    () =>
      classNames(styles.header, {
        [styles.dark]: isDarkMode,
      }),
    [isDarkMode]
  );

  return (
    <div
      className={wrapperClass}
      style={wrapperStyle}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby={!disableHeader && title ? titleId.current : undefined}
      aria-describedby={contentId.current}
      aria-live="assertive"
      ref={onInit}
    >
      {!disableHeader && title && (
        <header className={headerClass}>
          <span id={titleId.current} className={styles.title}>
            {title}
          </span>
          <span className={styles.close_btn}>
            <Button
              type="icon"
              size={size}
              onClick={handleClose}
              label="Close notification"
            >
              <CloseIcon />
            </Button>
          </span>
        </header>
      )}
      <section id={contentId.current} className={styles.content}>
        {children}
      </section>
    </div>
  );
};

const Notification = withOverlay<NotificationProps, null>(
  NotificationComponent,
  {
    backdropColor: 'transparent',
    name: 'notification',
  }
);

Notification.displayName = 'Notification';

export { Notification };
