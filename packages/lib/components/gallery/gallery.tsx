import { CSSProperties, FunctionComponent, useMemo } from 'react';
import { Image } from '../image/image';
import { GalleryProps } from './gallery.model';
import styles from './gallery.module.scss';

const Gallery: FunctionComponent<GalleryProps> = ({
  gap,
  gridDimension = [3, 3],
  imageDimension = 100,
  children = [],
  imagesURL = [],
  imagesALT = [],
  expandImageOnclick = false,
}) => {
  const style = useMemo(
    () =>
      ({
        '--rc-gallery-gap': `${gap}px`,
        '--rc-gallery-grid-dimension-cols': gridDimension[0],
        '--rc-gallery-grid-dimension-rows': gridDimension[1],
        '--rc-gallery-image-dimension': `${imageDimension}px`,
      } as CSSProperties),
    []
  );

  const getContent = useMemo(() => {
    const childrenLength = children.length;
    const imagesURLLength = imagesURL.length;

    if (childrenLength) {
      return Array.from({ length: childrenLength }).map((_, index) => (
        <span key={index}>{children[index]}</span>
      ));
    } else if (imagesURLLength) {
      return Array.from({ length: imagesURLLength }).map((_, index) => (
        <Image
          key={index}
          src={imagesURL[index]}
          expandImageOnClick={expandImageOnclick}
          alt={imagesALT[index]}
        />
      ));
    }
  }, [children.length, imagesURL?.length]);

  return (
    <div style={style} className={styles.gallery}>
      {getContent}
    </div>
  );
};

export { Gallery };
