import React, { useCallback, useEffect, useState } from 'react';
import { FunctionType } from './use-position-model';

// Define the usePosition hook
const usePosition: FunctionType = function (
  container, // Ref to the container element
  target, // Ref to the target element
  position, // Position of the target element relative to the container element
  settings = { spacing: 15 } // Optional settings object
) {
  const [_position, setPosition] = useState<React.CSSProperties>(); // State to store the position of the target element
  const { spacing, alignToEdge } = settings; // Destructure the spacing and alignToEdge properties from the settings object

  // Run the onInit function whenever the position changes
  useEffect(() => {
    onInit();
  }, [position]);

  // Define the onInit function
  const onInit = useCallback(() => {
    const containerEle = container?.current; // Get the container element if it exists
    const targetEle = target.current; // Get the target element

    // If both elements exist
    if (containerEle && targetEle) {
      containerEle.style.position = 'relative'; // Set the container element's position to relative
      targetEle.style.position = 'absolute'; // Set the target element's position to absolute

      const positionX = position.split(' ')[0]; // Get the horizontal position
      const positionY = position.split(' ')[1]; // Get the vertical position

      // Define functions to check if the position matches a given value
      const isPositionX = (match: string) => positionX === match;
      const isPositionY = (match: string) => positionY === match;

      const eleHeight = containerEle.clientHeight || 0; // Get the height of the container element
      const eleWidth = containerEle.clientWidth || 0; // Get the width of the container element

      const tooltipWidth = targetEle?.clientWidth || 0; // Get the width of the target element
      const tooltipHalfWidth = Math.round(tooltipWidth / 2); // Get half the width of the target element

      // Define CSS properties for centering the target element horizontally and vertically
      const horizontalCenter: React.CSSProperties = {
        left: '50%',
        transform: 'translateX(-50%)',
      };
      const verticalCenter: React.CSSProperties = {
        top: '50%',
        transform: 'translateY(-50%)',
      };

      const heightWithSpace = eleHeight + spacing; // Calculate the height of the container element plus the spacing
      let cssPosition: React.CSSProperties = {}; // Initialize the CSS position object

      // Switch statement to determine the CSS position based on the position string
      switch (position) {
        case 'top center':
        case 'bottom center': {
          const prop = isPositionX('top') ? 'bottom' : 'top'; // Determine the vertical property to set
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
              : 'left'; // Determine the horizontal property to set
          const value = alignToEdge ? 0 : `${eleWidth - tooltipHalfWidth}px`; // Determine the value to set
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
              : 'left'; // Determine the horizontal property to set
          const value = alignToEdge ? 0 : `${eleWidth - tooltipHalfWidth}px`; // Determine the value to set
          cssPosition = {
            [prop]: value,
            top: `${heightWithSpace}px`,
          };
          break;
        }
        case 'left center':
        case 'right center': {
          const prop = isPositionX('left') ? 'right' : 'left'; // Determine the horizontal property to set
          cssPosition = {
            ...verticalCenter,
            [prop]: eleWidth + spacing,
          };
          break;
        }
        case 'left top':
        case 'right top': {
          const prop = isPositionX('left') ? 'right' : 'left'; // Determine the horizontal property to set
          cssPosition = {
            [prop]: eleWidth + spacing,
            top: 0,
          };
          break;
        }
        case 'right bottom':
        case 'left bottom': {
          const prop = isPositionX('left') ? 'right' : 'left'; // Determine the horizontal property to set
          cssPosition = {
            bottom: 0,
            [prop]: eleWidth + spacing,
          };
          break;
        }
        default:
          break;
      }

      setPosition(cssPosition); // Set the position state to the CSS position object
    }
  }, [position]);

  return {
    onInit,
    position: _position,
  };
};

export { usePosition };
