import classNames from 'classnames';
import { nanoid } from 'nanoid';
import * as React from 'react';
import { useMemo, useRef } from 'react';
import { CheckIcon, CloseIcon } from '../../icons';
import { Button } from '../button/button';
import useTrapFocus from '../common/effects/useTrapFocus';
import { withOverlay } from '../common/withOverlay';
import { DialogProps } from './dialog-model';
import './dialog.scss';

const DialogComponent: React.FunctionComponent<DialogProps> = ({
  animationDuration = 250,
  animationType = 'pop',
  children,
  focusable = true,
  height = 200,
  isClosing,
  onClose,
  onOpen,
  onSuccess,
  size = 'sm',
  title,
  width = 300,
  RTL = false,
}: DialogProps) => {
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const focusProps = useRef({});

  if (focusable) {
    const { onInit, handleKeyDown } = useTrapFocus<HTMLDivElement>(200, onOpen);
    focusProps.current = { onKeyDown: handleKeyDown, ref: onInit, tabIndex: 0 };
  } else {
    focusProps.current = { tabIndex: 0 };
  }

  const dialogClass = useMemo(
    () =>
      classNames(
        [
          'rc-dialog',
          isClosing
            ? `rc-dialog-${animationType}-leave`
            : `rc-dialog-${animationType}-enter`,
        ],
        {
          [`rc-dialog-${size}`]: true,
        }
      ),
    [isClosing, size]
  );
  const id = useRef(`rc-dialog-${nanoid()}`);

  const style = useMemo(
    () => ({
      '--min-width': `${width}px`,
      '--rc-dialog-animation': animationType,
      '--rc-dialog-animation-duration': `${animationDuration}ms`,
      minHeight: height ? `${height}px` : 'auto',
    }),
    [width, height]
  );

  const handleSuccess = () => {
    onSuccess?.();
    onClose?.();
  };

  const handleClose = () => {
    onClose?.();
  };

  return (
    <div
      className={dialogClass}
      role="dialog"
      aria-labelledby={id.current}
      style={style}
      {...focusProps.current}
    >
      <header className="rc-dialog-header">
        <h2 className="rc-dialog-title" id={id.current}>
          {title}
        </h2>
        <div className="rc-dialog-button-wrapper">
          <Button
            type="icon"
            onClick={handleClose}
            size={size}
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
          size={size}
        >
          <CheckIcon />
        </Button>
        <Button
          label="cancel"
          onClick={handleClose}
          focusable={focusable}
          size={size}
        >
          <CloseIcon />
        </Button>
      </footer>
    </div>
  );
};

const Dialog = withOverlay<DialogProps, null>(DialogComponent, {
  disableAnimation: false,
  hideDocumentOverflow: true,
});

Dialog.displayName = 'Dialog';

export { Dialog };
