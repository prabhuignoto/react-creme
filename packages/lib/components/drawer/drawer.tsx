import classNames from 'classnames';
import * as React from 'react';
import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import { CloseIcon } from '../../icons';
import { Button } from '../button/button';
import { useKey } from '../common/effects/useKey';
import useTrapFocus from '../common/effects/useTrapFocus';
import { withOverlay } from '../common/withOverlay';
import { DrawerProps } from './drawer-model';
import './drawer.scss';

const DrawerComponent: React.FunctionComponent<DrawerProps> = ({
  children,
  height = 300,
  isClosing,
  onClose,
  position = 'left',
  width = 300,
  transition = 'cubic-bezier(0.79, 0.14, 0.15, 0.86)',
  focusable = true,
}) => {
  const [activate, setActivate] = useState(false);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const {
    onInit,
    targetRef: drawerRef,
    handleKeyDown,
  } = useTrapFocus<HTMLDivElement>(200);

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

  const drawerClass = useMemo(
    () =>
      classNames(['rc-drawer', `rc-drawer-${position}`], {
        [`visible slide-${position}-enter`]: activate && !isClosing,
        [`visible slide-${position}-exit`]: isClosing,
      }),
    [activate, isClosing]
  );

  useEffect(() => {
    setActivate(true);
  }, []);

  if (onClose) {
    useKey(drawerRef, onClose);
  }

  return (
    <div
      className={drawerClass}
      style={style}
      ref={onInit}
      tabIndex={0}
      role="dialog"
      aria-modal="true"
      onKeyDown={handleKeyDown}
    >
      <div className="rc-drawer-close-btn-wrapper">
        <Button
          type="icon"
          size="lg"
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

const Drawer = withOverlay<DrawerProps>(DrawerComponent, {
  disableAnimation: false,
});

Drawer.displayName = 'Drawer';

export { Drawer };
