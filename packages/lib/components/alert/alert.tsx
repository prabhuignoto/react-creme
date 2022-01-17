import classNames from 'classnames';
import React, { CSSProperties, useCallback, useMemo } from 'react';
import {
  CheckIcon,
  CloseIcon,
  ErrorIcon,
  InfoIcon,
  WarningIcon,
} from '../../icons';
import { AlertProps } from './alert-model';
import './alert.scss';

const Alert: React.FunctionComponent<AlertProps> = ({
  message,
  height = 100,
  state = 'info',
  canDismiss = true,
  onDismiss,
  children,
  RTL = false,
}) => {
  const [close, setClose] = React.useState(false);

  const style = useMemo(
    () =>
      ({
        '--height': `${height}px`,
      } as CSSProperties),
    [state]
  );

  const messageClass = useMemo(
    () =>
      classNames('rc-alert', {
        [`rc-alert-${state}`]: true,
        'rc-alert-close': close,
        'rc-alert-rtl': RTL,
      }),
    [state, close]
  );

  const handleClose = useCallback(() => {
    setClose(true);
    onDismiss && onDismiss();
  }, []);

  const icon = useMemo(() => {
    switch (state) {
      case 'success':
        return <CheckIcon />;
      case 'error':
        return <ErrorIcon />;
      case 'warning':
        return <WarningIcon />;
      case 'info':
        return <InfoIcon />;
      default:
        return <InfoIcon />;
    }
  }, []);

  return (
    <div className={messageClass} style={style} role="alert">
      <div className="rc-alert-icon-wrapper">
        <span className="rc-alert-icon" role="img">
          {icon}
        </span>
      </div>
      <span className="rc-alert-content">{children || message}</span>
      {canDismiss && (
        <span
          className="rc-alert-close-btn"
          role="button"
          onClick={handleClose}
        >
          <CloseIcon />
        </span>
      )}
    </div>
  );
};

export { Alert };
