import React, { CSSProperties, ReactNode, useMemo } from 'react';
import { CarouselItemsProps } from './carousel-model';
import styles from './carousel.module.scss';

const CarouselItems: React.FunctionComponent<CarouselItemsProps> = ({
  activePage = 0,
  carouselItems,
  children,
  direction,
  height,
  totalItems,
  width,
}: CarouselItemsProps) => {
  const carouselStyle = useMemo(() => {
    return {
      transform:
        direction === 'horizontal'
          ? `translateX(-${width * activePage}px)`
          : `translateY(-${height * activePage}px)`,
      width: `${width * totalItems}px`,
    } as CSSProperties;
  }, [width, height, activePage]);

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
            left: direction === 'horizontal' ? item.left : 0,
            top: direction === 'horizontal' ? 0 : item.top,
            visibility: item.width === 0 ? 'hidden' : 'visible',
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
