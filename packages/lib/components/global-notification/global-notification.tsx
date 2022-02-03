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
import './global-notification.scss';

const GlobalNotification: React.FunctionComponent<GlobalNotificationProps> = ({
  height = 50,
  delay = 0,
  closeAfter = 3000,
  message,
  state = 'info',
  onClose,
  hideAnimationStyle = 'hide',
  focusable = true,
}) => {
  const [open, setOpen] = useState(false);

  const btnCloseRef = useRef<HTMLSpanElement>(null);

  if (focusable) {
    useFocus(btnCloseRef, () => setOpen(false));
  }

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
      classNames('rc-global-notification', {
        'rc-global-notification-close': !open,
        'rc-global-notification-open': open,
        [`rc-global-notification-${state}`]: true,
        [`rc-global-notification-animation-${hideAnimationStyle}`]: true,
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
    setTimeout(() => onClose?.(), 250);
  }, []);

  return (
    <div className={globalNotificationClass} style={style} role="alert">
      <span className="rc-global-notification-message">{open && message}</span>
      <span
        className="rc-global-notification-close-btn"
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
