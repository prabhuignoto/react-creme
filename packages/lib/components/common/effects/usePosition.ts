import React, { useCallback, useEffect, useState } from 'react';
import { FunctionType } from './use-position-model';

const usePosition: FunctionType = function (
  container,
  target,
  position,
  settings = { spacing: 15 }
) {
  const [_position, setPosition] = useState<React.CSSProperties>();
  const { spacing, alignToEdge } = settings;

  useEffect(() => {
    onInit();
  }, [position]);

  const onInit = useCallback(() => {
    const containerEle = container.current;
    const targetEle = target.current;

    if (containerEle && targetEle) {
      containerEle.style.position = 'relative';
      targetEle.style.position = 'absolute';

      const positionX = position.split(' ')[0];
      const positionY = position.split(' ')[1];

      const isPositionX = (match: string) => positionX === match;

      const isPositionY = (match: string) => positionY === match;

      const eleHeight = containerEle.clientHeight || 0;
      const eleWidth = containerEle.clientWidth || 0;

      const tooltipWidth = targetEle?.clientWidth || 0;
      const tooltipHalfWidth = Math.round(tooltipWidth / 2);

      const horizontalCenter: React.CSSProperties = {
        left: '50%',
        transform: 'translateX(-50%)',
      };
      const verticalCenter: React.CSSProperties = {
        top: '50%',
        transform: 'translateY(-50%)',
      };
      const heightWithSpace = eleHeight + spacing;
      let cssPosition: React.CSSProperties = {};

      switch (position) {
        case 'top center':
        case 'bottom center': {
          const prop = isPositionX('top') ? 'bottom' : 'top';
          cssPosition = {
            ...horizontalCenter,
            [prop]: `${heightWithSpace}px`,
          };
          break;
        }
        case 'top left':
        case 'top right': {
          const prop = alignToEdge
            ? positionY
            : isPositionY('left')
            ? 'right'
            : 'left';
          const value = alignToEdge ? 0 : `${eleWidth - tooltipHalfWidth}px`;
          cssPosition = {
            bottom: `${heightWithSpace}px`,
            [prop]: value,
          };
          break;
        }
        case 'bottom left':
        case 'bottom right': {
          const prop = alignToEdge
            ? positionY
            : isPositionY('left')
            ? 'right'
            : 'left';
          const value = alignToEdge ? 0 : `${eleWidth - tooltipHalfWidth}px`;
          cssPosition = {
            [prop]: value,
            top: `${heightWithSpace}px`,
          };
          break;
        }
        case 'left center':
        case 'right center': {
          const prop = isPositionX('left') ? 'right' : 'left';
          cssPosition = {
            ...verticalCenter,
            [prop]: eleWidth + spacing,
          };
          break;
        }
        case 'left top':
        case 'right top': {
          const prop = isPositionX('left') ? 'right' : 'left';
          cssPosition = {
            [prop]: eleWidth + spacing,
            top: 0,
          };
          break;
        }
        case 'right bottom':
        case 'left bottom': {
          const prop = isPositionX('left') ? 'right' : 'left';
          cssPosition = {
            bottom: 0,
            [prop]: eleWidth + spacing,
          };
          break;
        }
        default:
          break;
      }

      setPosition(cssPosition);
    }
  }, [position]);

  return {
    onInit,
    position: _position,
  };
};

export { usePosition };
