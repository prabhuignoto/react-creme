import classNames from 'classnames';
import * as React from 'react';
import { CSSProperties, useCallback, useMemo, useRef, useState } from 'react';
import { useDrag } from '../../common/effects/useDrag';
import { useFirstRender } from '../../common/effects/useFirstRender';
import { AlignJustify } from '../../common/icons';
import { CircularProgress } from '../../feedback/progress/circular-progress';
import { Image } from '../../image/image';
import { ImageComparerProps } from './image-comparer.model';
import styles from './image-comparer.module.scss';

const ImageComparer: React.FunctionComponent<ImageComparerProps> = ({
  sourceOne,
  sourceTwo,
  direction = 'horizontal',
}) => {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<HTMLElement | null>(null);

  // tracks if the fist image is loaded
  const [imageLoaded, setImageLoaded] = useState(false);

  // tracks if the second image is loaded
  const [imageLoaded2, setImageLoaded2] = useState(false);

  // tracks the dragging state
  const [dragged, setDragged] = useState(false);

  // this state is used to set the dimension of the wrapper
  const [wrapperDimensions, setWrapperDimensions] = useState<{
    height: number;
    width: number;
  }>({ height: 0, width: 0 });

  // const isFirstRender = useRef(null);

  // checks if both the images are loaded
  const imagesLoaded = useMemo(
    () => imageLoaded && imageLoaded2,
    [imageLoaded, imageLoaded2]
  );

  // classes
  const dragHandleClass = useMemo(
    () =>
      classNames(styles.drag_handle, {
        [styles.handle_dragged]: dragged,
        [styles[`handle_${direction}`]]: true,
        [styles.handle_hidden]: !imagesLoaded,
        [styles.handle_visible]: imagesLoaded,
      }),
    [dragged, direction, imagesLoaded]
  );

  const wrapperClass = useMemo(() => {
    return classNames(styles.wrapper, {
      [styles.image_comparer_loaded]: imagesLoaded,
    });
  }, [imagesLoaded]);

  const wrapperStyle = useMemo(() => {
    const { width, height } = wrapperDimensions;
    return {
      '--height': height ? `${height}px` : '95%',
      '--width': width ? `${width}px` : '95%',
      visibility: imagesLoaded ? 'visible' : 'hidden',
    } as CSSProperties;
  }, [wrapperDimensions.height, wrapperDimensions.width, imagesLoaded]);

  // callback executed on first image load
  const onImageLoad = useCallback((ev: React.SyntheticEvent) => {
    const { width, height } = ev.target as HTMLImageElement;

    setWrapperDimensions({
      height: height,
      width: width,
    });

    setImageLoaded(true);
  }, []);

  // callback executed when the second image is loaded
  const onImageLoad2 = () => setImageLoaded2(true);

  // setup the drag effect
  const [percent] = useDrag(panelRef, dragRef, {
    direction,
    observeContainer: true,
    onDragEnd: () => setDragged(false),
    onDragStart: () => setDragged(true),
    updatePosition: false,
  });

  // tracks the first render of the component
  const isFirstRender = useFirstRender();

  // styling object for the first image panel
  const style = useMemo(() => {
    if (isFirstRender) {
      const percentToUse = percent
        ? Math.round(percent * 100)
        : isFirstRender.current
        ? 50
        : 0;
      return {
        clipPath:
          direction === 'horizontal'
            ? `polygon(0% 0%, ${percentToUse}% 0%, ${percentToUse}% 100%, 0% 100%)`
            : `polygon(0% 0%, 100% 0%, 100% ${percentToUse}%, 0% ${percentToUse}%)`,
      } as CSSProperties;
    }
  }, [percent, direction]);

  const dragHandleStyle = useMemo(() => {
    return {
      [direction === 'horizontal' ? 'left' : 'top']: `${percent * 100}%`,
    };
  }, [percent]);

  return (
    <div className={wrapperClass} ref={panelRef} style={wrapperStyle}>
      {!imagesLoaded && (
        <div className={styles.circular_loader_wrapper}>
          <CircularProgress />
        </div>
      )}
      <div className={classNames(styles.panel, styles.panel_1)} style={style}>
        <Image
          src={sourceOne}
          fitImage={false}
          onLoad={onImageLoad}
          showLoader={false}
        />
      </div>
      <div className={classNames(styles.panel, styles.panel_2)}>
        <Image
          src={sourceTwo}
          fitImage={false}
          onLoad={onImageLoad2}
          showLoader={false}
        />
      </div>
      <span
        className={dragHandleClass}
        role="separator"
        tabIndex={0}
        style={dragHandleStyle}
      >
        <span className={styles.drag_handle_square} ref={dragRef}>
          <AlignJustify />
        </span>
      </span>
    </div>
  );
};

ImageComparer.displayName = 'ImageComparer';

export { ImageComparer };
