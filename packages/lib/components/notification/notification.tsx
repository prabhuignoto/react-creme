import classNames from 'classnames';
import React, { CSSProperties, useEffect, useMemo, useRef } from 'react';
import { CloseIcon } from '../../icons';
import { Button } from '../button/button';
import { useCloseOnEscape } from '../common/effects/useCloseOnEsc';
import useSwipe from '../common/effects/useSwipe';
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
  size = 'sm',
}) => {
  const wrapperClass = classNames([
    styles.notification_wrapper,
    {
      [styles[`notification_${position}_enter`]]: !isClosing,
      [styles[`notification_${position}_exit`]]: isClosing,
      [styles[`notification_${size}`]]: true,
    },
  ]);

  const ref = useRef(null);

  useCloseOnEscape(() => {
    onClose && onClose();
  }, ref);

  const wrapperStyle = useMemo(
    () =>
      ({
        '--min-height': `${height}px`,
        '--min-width': `${width}px`,
      } as CSSProperties),
    []
  );

  useEffect(() => {
    if (autoClose) {
      setTimeout(() => onClose && onClose(), autoClose);
    }
  }, []);

  const canSwipeToClose = useMemo(() => {
    const xPosition = position?.split('-')[1] || '';
    const leftORight = xPosition === 'left' || xPosition === 'right';
    return swipeToClose && !autoClose && leftORight;
  }, [position, swipeToClose]);

  const { swipeState: state, onInit } = useSwipe('medium');

  useEffect(() => {
    if (state) {
      const xPosition = position?.split('-')[1] || '';
      if (state.offset > 0 && state.dir.toLowerCase() === xPosition) {
        onClose && onClose();
      }
    }
  }, [state, canSwipeToClose, position]);

  return (
    <div
      className={wrapperClass}
      style={wrapperStyle}
      role="alert"
      aria-modal="true"
      ref={onInit}
    >
      {!disableHeader && (
        <header className={styles.notification_header}>
          <span className={styles.notification_title}>{title}</span>
          <span className={styles.notification_close_btn}>
            <Button type="icon" size={size} onClick={onClose}>
              <CloseIcon />
            </Button>
          </span>
        </header>
      )}
      <section className={styles.notification_content}>{children}</section>
    </div>
  );
};

const Notification = withOverlay<NotificationProps, null>(
  NotificationComponent,
  {
    backdropColor: 'transparent',
    // disableBackdrop: true,
  }
);

Notification.displayName = 'Notification';

export { Notification };
