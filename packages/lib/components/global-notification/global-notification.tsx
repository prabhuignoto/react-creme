import classNames from 'classnames';
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { CloseIcon } from '../../icons';
import useFocus from '../common/effects/useFocusNew';
import { GlobalNotificationProps } from './global-notification.model';
import styles from './global-notification.module.scss';

const GlobalNotification: React.FunctionComponent<GlobalNotificationProps> = ({
  height = 50,
  delay = 0,
  closeAfter = 3000,
  message,
  state = 'info',
  onClose,
  hideAnimationStyle = 'hide',
  focusable = true,
  size = 'md',
}) => {
  const [open, setOpen] = useState(false);

  const btnCloseRef = useRef<HTMLSpanElement>(null);

  useFocus(
    focusable ? btnCloseRef : null,
    focusable ? () => setOpen(false) : null
  );

  useEffect(() => {
    setTimeout(() => setOpen(true), delay);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setOpen(false);
        setTimeout(() => onClose?.(), 250);
      }, closeAfter);
    }
  }, [open]);

  const globalNotificationClass = useMemo(
    () =>
      classNames(styles.global_notification, {
        [styles.close]: !open,
        [styles.open]: open,
        [styles[state]]: true,
        [styles[`animation_${hideAnimationStyle}`]]: true,
        [styles[size]]: true,
      }),
    [open, state, hideAnimationStyle]
  );

  const style = useMemo(
    () =>
      ({
        '--height': `${height}px`,
      } as CSSProperties),
    []
  );

  const handleClose = useCallback(() => {
    setOpen(false);
    onClose?.();
  }, []);

  return (
    <div className={globalNotificationClass} style={style} role="alert">
      <span className={styles.message}>{open && message}</span>
      <span
        className={styles.close_btn}
        onClick={handleClose}
        role="button"
        ref={btnCloseRef}
        tabIndex={focusable ? 0 : -1}
      >
        {open && <CloseIcon />}
      </span>
    </div>
  );
};

GlobalNotification.displayName = 'GlobalNotification';

export { GlobalNotification };
