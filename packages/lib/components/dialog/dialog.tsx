import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, { useCallback, useMemo, useRef } from 'react';
import { CheckIcon, CloseIcon } from '../../icons';
import { Button } from '../button/button';
import { useFocus } from '../common/effects/useFocus';
import { withOverlay } from '../common/withOverlay';
import { DialogProps } from './dialog-model';
import './dialog.scss';

const DialogComponent: React.FunctionComponent<DialogProps> = ({
  children,
  isClosing,
  onClose,
  onSuccess,
  title,
  width,
  height = 200,
  focusable = true,
}: DialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const dialogClass = useMemo(
    () =>
      classNames([
        'rc-dialog',
        isClosing ? 'rc-dialog-close' : 'rc-dialog-open',
      ]),
    [isClosing]
  );
  const id = useRef(`rc-dialog-${nanoid()}`);

  const style = useMemo(
    () => ({
      '--min-width': `${width}px`,
      height: height ? `${height}px` : 'auto',
    }),
    [width, height]
  );

  const handleSuccess = useCallback(() => {
    onSuccess?.();
    onClose?.();
  }, []);

  useFocus(dialogRef);

  return (
    <div
      className={dialogClass}
      ref={dialogRef}
      role="dialog"
      aria-labelledby={id.current}
      style={style}
    >
      <header className="rc-dialog-header">
        <h2 className="rc-dialog-title" id={id.current}>
          {title}
        </h2>
        <div className="rc-dialog-button-wrapper">
          <Button type="icon" onClick={onClose} size="md" focusable={focusable}>
            <CloseIcon />
          </Button>
        </div>
      </header>
      <section className="rc-dialog-body">{children}</section>
      <footer className="rc-dialog-footer">
        <Button
          label="okay"
          type="primary"
          onClick={handleSuccess}
          size="sm"
          focusable={focusable}
        >
          <CheckIcon />
        </Button>
        <Button
          label="cancel"
          onClick={onClose}
          size="sm"
          focusable={focusable}
        >
          <CloseIcon />
        </Button>
      </footer>
    </div>
  );
};

const Dialog = withOverlay<DialogProps>(DialogComponent, {
  disableAnimation: false,
});

export { Dialog };
