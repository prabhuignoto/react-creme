import classNames from 'classnames';
import { nanoid } from 'nanoid';
import * as React from 'react';
import { useCallback, useMemo, useRef } from 'react';
import { CheckIcon, CloseIcon } from '../../icons';
import { Button } from '../button/button';
import { useFocus } from '../common/effects/useFocus';
import { withOverlay } from '../common/withOverlay';
import { DialogProps } from './dialog-model';
import './dialog.scss';

const DialogComponent: React.FunctionComponent<DialogProps> = ({
  children,
  isClosing,
  onOpen,
  onClose,
  onSuccess,
  title,
  width,
  height = 200,
  focusable = true,
  animationType = 'pop',
}: DialogProps) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const dialogClass = useMemo(
    () =>
      classNames([
        'rc-dialog',
        isClosing
          ? `rc-dialog-${animationType}-leave`
          : `rc-dialog-${animationType}-enter`,
      ]),
    [isClosing]
  );
  const id = useRef(`rc-dialog-${nanoid()}`);

  const style = useMemo(
    () => ({
      '--animation': animationType,
      '--min-width': `${width}px`,
      height: height ? `${height}px` : 'auto',
    }),
    [width, height]
  );

  const handleSuccess = useCallback(() => {
    onSuccess?.();
    onClose?.();
  }, []);

  const onDialogRef = useCallback((node: HTMLDivElement) => {
    dialogRef.current = node;
    onOpen?.();

    setTimeout(() => {
      if (focusable) {
        buttonRef.current?.focus();
      }
    }, 100);
  }, []);

  if (focusable) {
    useFocus(dialogRef);
  }

  return (
    <div
      className={dialogClass}
      ref={onDialogRef}
      role="dialog"
      aria-labelledby={id.current}
      style={style}
    >
      <header className="rc-dialog-header">
        <h2 className="rc-dialog-title" id={id.current}>
          {title}
        </h2>
        <div className="rc-dialog-button-wrapper">
          <Button
            type="icon"
            onClick={onClose}
            size="md"
            focusable={focusable}
            ref={buttonRef}
          >
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
          focusable={focusable}
        >
          <CheckIcon />
        </Button>
        <Button label="cancel" onClick={onClose} focusable={focusable}>
          <CloseIcon />
        </Button>
      </footer>
    </div>
  );
};

const Dialog = withOverlay<DialogProps>(DialogComponent, {
  disableAnimation: false,
  hideDocumentOverflow: true,
});

Dialog.displayName = 'Dialog';

export { Dialog };
