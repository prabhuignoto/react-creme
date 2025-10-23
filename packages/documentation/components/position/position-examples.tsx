import classNames from 'classnames';
import React, { useCallback, useRef } from 'react';
import { useAtomValue } from 'jotai';
import { Position } from '../../../lib/components/common/effects/use-position-model';
import { usePosition } from '../../../lib/components/common/effects/usePosition';
import { themeState } from '../../atoms/home';
import './position-examples.scss';

export const PositionComponent: React.FunctionComponent<{
  position: Position;
}> = ({ position }) => {
  const container = useRef<HTMLDivElement | null>(null);
  const element = useRef<HTMLElement | null>(null);
  const theme = useAtomValue(themeState);

  const { position: cssPosition, onInit } = usePosition(
    container,
    element,
    position,
    {
      spacing: 0,
    }
  );

  const onRef = useCallback((node: HTMLDivElement) => {
    container.current = node;
    onInit();
  }, []);

  return (
    <div
      className={classNames(
        'rc-demo-position-outer-box',
        theme.darkMode ? 'dark' : ''
      )}
      ref={onRef}
    >
      <span
        className={classNames('rc-demo-position-inner-box')}
        style={{ ...cssPosition }}
        ref={element}
      ></span>
    </div>
  );
};

export const PositionLeft = () => <PositionComponent position="left center" />;
export const PositionRight = () => (
  <PositionComponent position="right center" />
);
export const PositionTop = () => <PositionComponent position="top center" />;
export const PositionLeftBottom = () => (
  <PositionComponent position="left bottom" />
);
export const PositionRightTop = () => (
  <PositionComponent position="right top" />
);
export const PositionRightBottom = () => (
  <PositionComponent position="right bottom" />
);
export const PositionLeftTop = () => <PositionComponent position="left top" />;
