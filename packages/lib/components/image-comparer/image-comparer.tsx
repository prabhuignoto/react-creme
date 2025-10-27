import { AlignJustify } from '@icons';
import classNames from 'classnames';
import React from 'react';
import { CSSProperties, useCallback, useMemo, useRef, useState } from 'react';
import { useDrag } from '../common/effects/useDrag';
import { useFirstRender } from '../common/effects/useFirstRender';
import { useKeyNavigation } from '../common/effects/useKeyNavigation';
import { Image } from '../image/image';
import { CircularProgress } from '../progress/circular-progress';
import { ImageComparerProps } from './image-comparer.model';
import styles from './image-comparer.module.scss';

const ImageComparer: React.FunctionComponent<ImageComparerProps> = ({
  sourceOne,
  sourceTwo,
  direction = 'horizontal',
  ariaLabel = 'Image comparison slider',
  largeStep = 10,
}) => {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<HTMLElement | null>(null);
  const separatorRef = useRef<HTMLSpanElement | null>(null);

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
  const onImageLoad2 = useCallback(() => setImageLoaded2(true), []);

  // setup the drag effect
  const [percent, setPercent] = useDrag(panelRef as React.RefObject<HTMLElement>, dragRef, {
    direction,
    observeContainer: true,
    onDragEnd: () => setDragged(false),
    onDragStart: () => setDragged(true),
    updatePosition: false,
  });

  // Keyboard navigation - following Slider pattern
  // Normalize percent (0-1) to 0-100 range for useKeyNavigation
  // Default to 50 if percent is NaN or undefined (but 0 is valid!)
  const normalizedPercent = useMemo(() => {
    const validPercent = (percent == null || isNaN(percent)) ? 0.5 : percent;
    return Math.round(validPercent * 100);
  }, [percent]);

  // Setup keyboard navigation with useCallback to avoid stale closures
  const handleNavigate = useCallback((index: number) => {
    // Convert from 0-100 range back to 0-1 range
    const newPercent = index / 100;
    const clampedPercent = Math.max(0, Math.min(1, newPercent));
    setPercent(clampedPercent);
  }, [setPercent]);

  const handlePageUp = useCallback(() => {
    // Use functional update to avoid stale closure
    setPercent((prevPercent) => {
      const validPercent = (prevPercent == null || isNaN(prevPercent)) ? 0.5 : prevPercent;
      return Math.min(1, validPercent + (largeStep / 100));
    });
  }, [largeStep, setPercent]);

  const handlePageDown = useCallback(() => {
    // Use functional update to avoid stale closure
    setPercent((prevPercent) => {
      const validPercent = (prevPercent == null || isNaN(prevPercent)) ? 0.5 : prevPercent;
      return Math.max(0, validPercent - (largeStep / 100));
    });
  }, [largeStep, setPercent]);

  // Setup keyboard navigation
  useKeyNavigation(separatorRef as React.RefObject<HTMLElement>, normalizedPercent, 101, {
    orientation: direction === 'horizontal' ? 'horizontal' : 'vertical',
    wrap: false,
    onNavigate: handleNavigate,
    onPageUp: handlePageUp,
    onPageDown: handlePageDown,
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
  }, [percent, direction, isFirstRender]);

  const dragHandleStyle = useMemo(() => {
    return {
      [direction === 'horizontal' ? 'left' : 'top']: `${percent * 100}%`,
    };
  }, [percent, direction]);

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
        ref={separatorRef}
        className={dragHandleClass}
        role="separator"
        tabIndex={0}
        style={dragHandleStyle}
        aria-label={ariaLabel}
        aria-valuenow={Math.round(((percent == null || isNaN(percent)) ? 0.5 : percent) * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`${Math.round(((percent == null || isNaN(percent)) ? 0.5 : percent) * 100)}% comparison`}
        aria-orientation={direction}
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
