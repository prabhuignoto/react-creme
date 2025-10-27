import classNames from 'classnames';
import { CSSProperties, FunctionComponent, useMemo } from 'react';
import { Image } from '../image/image';
import { GalleryProps } from './gallery.model';
import styles from './gallery.module.scss';

/**
 * Gallery component for displaying images in a responsive grid layout
 * Supports both custom children and automatic image rendering from URLs
 */
const Gallery: FunctionComponent<GalleryProps> = ({
  gap,
  gridDimension = [3, 3],
  imageDimension = 100,
  children = [],
  imagesURL = [],
  imagesALT = [],
  expandImageOnClick = false,
  ariaLabel = 'Image gallery',
  size = 'md',
}) => {
  // ✅ FIXED: Complete dependency array with all used values
  const style = useMemo(
    () =>
      ({
        '--rc-gallery-gap': gap !== undefined ? `${gap}px` : undefined,
        '--rc-gallery-grid-dimension-cols': gridDimension[0],
        '--rc-gallery-grid-dimension-rows': gridDimension[1],
        '--rc-gallery-image-dimension': `${imageDimension}px`,
      }) as CSSProperties,
    [gap, gridDimension, imageDimension]
  );

  // ✅ FIXED: Use actual arrays as dependencies, not just lengths
  // This ensures content updates when array contents change
  const getContent = useMemo(() => {
    const childrenLength = children.length;
    const imagesURLLength = imagesURL.length;

    if (childrenLength > 0) {
      // Render custom children
      return children.map((child, index) => (
        <span key={index} className={styles.item}>
          {child}
        </span>
      ));
    } else if (imagesURLLength > 0) {
      // Render images from URLs with safe array access
      return imagesURL.map((url, index) => (
        <Image
          key={index}
          src={url}
          expandImageOnClick={expandImageOnClick}
          alt={imagesALT[index] || `Image ${index + 1}`}
          className={styles.item}
        />
      ));
    }

    return null;
  }, [children, imagesURL, imagesALT, expandImageOnClick]);

  const galleryClass = classNames(styles.gallery, {
    [styles.sm]: size === 'sm',
    [styles.md]: size === 'md',
    [styles.lg]: size === 'lg',
  });

  return (
    <div
      style={style}
      className={galleryClass}
      role="region"
      aria-label={ariaLabel}
    >
      {getContent}
    </div>
  );
};

Gallery.displayName = 'Gallery';

export { Gallery };
