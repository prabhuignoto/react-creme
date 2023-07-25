/**
 * @file This file defines the CarouselItems component.
 * @module CarouselItems
 */

import React, { CSSProperties, ReactNode, useMemo } from 'react';
import { CarouselItemsProps } from './carousel-model';
import styles from './carousel.module.scss';

/**
 * CarouselItems is a React Function Component for displaying the items of the carousel.
 * It receives several props to handle its behavior and styling.
 *
 * @param {Object} CarouselItemsProps - The properties that define the CarouselItems component.
 * @returns {JSX.Element} The CarouselItems component.
 */
const CarouselItems: React.FunctionComponent<CarouselItemsProps> = ({
  activePage = 0,
  carouselItems,
  children,
  direction = 'horizontal',
  height,
  totalItems,
  width,
}: CarouselItemsProps) => {
  // Compute the styles for the carousel.
  const carouselStyle = useMemo(() => {
    return {
      transform:
        direction === 'horizontal'
          ? `translateX(-${width * activePage}px)`
          : `translateY(-${height * activePage}px)`,
      width: `${width * totalItems}px`,
    } as CSSProperties;
  }, [width, height, activePage]);

  // Render the CarouselItems component.
  return (
    <ul className={styles.carousel} style={carouselStyle} role="list">
      {carouselItems.map((item, index) => (
        <li
          key={item.id}
          className={styles.item}
          role="listitem"
          data-visible={activePage === index}
          aria-hidden={activePage !== index}
          style={{
            left: direction === 'horizontal' ? `${index * width}px` : 0,
            top: direction === 'horizontal' ? 0 : `${index * height}px`,
            visibility: activePage !== index ? 'hidden' : 'visible',
            width: item.width,
          }}
        >
          <div className={styles.item_container}>
            {(children as ReactNode[])[index]}
          </div>
        </li>
      ))}
    </ul>
  );
};

CarouselItems.displayName = 'CarouselItems';

export { CarouselItems };
