import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { useDebounce } from 'use-debounce';
import useSwipe from '../common/effects/useSwipe';
import { CarouselItems } from './carousel-items';
import { CarouselItemProps, CarouselProps } from './carousel-model';
import { CarouselTrack } from './carousel-track';
import styles from './carousel.module.scss';

// Carousel is a React Function Component for displaying a carousel of items.
const Carousel: React.FunctionComponent<CarouselProps> = ({
  autoPlay = 0,
  children,
  className,
  ariaLabel = 'Image carousel',
  direction = 'horizontal',
  height = 400,
  transition = 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Default to Hybrid Theme spring easing for playful slide transitions
  focusable = true,
  border = false,
  size = 'md',
  onSlideChange,
  enableSwipe = true,
}) => {
  // Generate stable IDs for children (only regenerate when children count changes)
  const childrenIds = useMemo(() => {
    const childArray = Array.isArray(children) ? children : [];
    return childArray.map(() => nanoid());
  }, [Array.isArray(children) ? children.length : 0]);

  // Ref to store the count of the carousel items.
  const trackCount = useRef(Array.isArray(children) ? children.length : 0);
  // Ref to store the autoPlay interval id.
  const autoPlayRef = useRef<number | undefined>(undefined);

  // State to store the index of the active (currently displayed) item.
  const [activePage, setActivePage] = useState(0);
  // State to store the dimensions of each slide.
  const [slideWidth, setSlideWidth] = useState(0);
  const [slideHeight, setSlideHeight] = useState(0);
  // State to store the auto-playing status of the carousel.
  const [isAutoPlaying, setAutoPlaying] = useState(!!autoPlay);
  // State to store whether autoPlay is paused
  const [isPaused, setIsPaused] = useState(false);

  // Debounced versions of slide dimensions for performance optimization.
  const [debouncedSlideWidth] = useDebounce(slideWidth, 100);
  const [debouncedSlideHeight] = useDebounce(slideHeight, 100);

  // Ref to store the instance of ResizeObserver for resizing the carousel items.
  const resizeObserver = useRef<ResizeObserver | null>(null);

  // Callback function to handle "Next" action in the carousel.
  const handleNext = useCallback(() => {
    setActivePage(prev => {
      if (prev < trackCount.current - 1) {
        const nextPage = prev + 1;
        onSlideChange?.(nextPage);
        return nextPage;
      }
      return prev;
    });
  }, [onSlideChange]);

  // Callback function to handle "Previous" action in the carousel.
  const handlePrevious = useCallback(() => {
    setActivePage(prev => {
      if (prev > 0) {
        const prevPage = prev - 1;
        onSlideChange?.(prevPage);
        return prevPage;
      }
      return prev;
    });
  }, [onSlideChange]);

  // Callback function to handle page activation in the carousel.
  const handleActivatePage = useCallback(
    (pageIndex: number) => {
      setActivePage(pageIndex);
      onSlideChange?.(pageIndex);
    },
    [onSlideChange]
  );

  // Callback function to toggle pause state for autoPlay
  const handleTogglePause = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  // Callback function to handle the initial setup of the carousel.
  const onInitRef = useCallback(
    (node: HTMLDivElement) => {
      if (node) {
        const { clientHeight, clientWidth } = node;
        // Use default dimensions if client dimensions are 0 (e.g., in test environments)
        const defaultWidth = 800;
        const defaultHeight = height || 400;
        const width = clientWidth || defaultWidth;
        const initialHeight = clientHeight || defaultHeight;
        setSlideWidth(width);
        setSlideHeight(initialHeight);

        resizeObserver.current = new ResizeObserver(() => {
          const { clientHeight, clientWidth } = node as HTMLElement;
          const newWidth = clientWidth || width;
          const newHeight = clientHeight || initialHeight;
          setSlideWidth(newWidth);
          setSlideHeight(newHeight);
        });

        resizeObserver.current.observe(node);
      }
    },
    [height]
  );

  // Derive carousel items from dimensions and children
  const carouselItems = useMemo<CarouselItemProps[]>(() => {
    if (!slideWidth || !slideHeight || !Array.isArray(children)) {
      return [];
    }

    const prop = direction === 'horizontal' ? 'left' : 'top';
    return children.map((_, index) => ({
      height: debouncedSlideHeight,
      id: childrenIds[index] ?? nanoid(),
      [prop]: `${
        direction === 'horizontal' ? index * slideWidth : index * slideHeight
      }px`,
      visible: false,
      width: debouncedSlideWidth,
    }));
  }, [
    debouncedSlideWidth,
    debouncedSlideHeight,
    direction,
    children,
    childrenIds,
    slideWidth,
    slideHeight,
  ]);

  // Memoized value to determine whether to hide the next button.
  const hideNextButton = useMemo(
    () => activePage === trackCount.current - 1,
    [activePage]
  );

  // Effect to handle auto-playing of the carousel.
  useLayoutEffect(() => {
    // Clear existing interval if paused or autoPlay disabled
    if (autoPlayRef.current && (isPaused || !autoPlay)) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = undefined;
      setAutoPlaying(false);
    }

    // Start autoPlay if not paused and conditions met
    if (
      !autoPlayRef.current &&
      autoPlay &&
      !isPaused &&
      carouselItems.length > 0
    ) {
      setAutoPlaying(true);
      autoPlayRef.current = window.setInterval(() => {
        setActivePage(page => {
          const nextPage = page + 1;
          if (nextPage >= carouselItems.length) {
            if (autoPlayRef.current) {
              clearInterval(autoPlayRef.current);
              autoPlayRef.current = undefined;
            }
            setAutoPlaying(false);
            return page;
          }

          onSlideChange?.(nextPage);
          return nextPage;
        });
      }, autoPlay);
    }

    // Cleanup function to clear interval
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = undefined;
      }
    };
  }, [autoPlay, carouselItems.length, isPaused, onSlideChange]);

  // Memoized value to determine whether to hide the previous button.
  const hidePreviousButton = useMemo(() => activePage === 0, [activePage]);

  // Classnames for the carousel track and container.
  const carouselTrackClass = useMemo(
    () =>
      classNames([
        styles.track_wrapper,
        direction === 'horizontal' ? styles.track_wrapper_horizontal : '',
      ]),
    [direction]
  );

  const carouselContainerClass = useMemo(
    () =>
      classNames(
        [
          styles.container,
          direction === 'horizontal'
            ? styles.container_horizontal
            : styles.container_vertical,
          className,
        ],
        {
          'rc-carousel-border': border,
        }
      ),
    [direction, border, className]
  );

  // Styles for the carousel wrapper.
  const carouselWrapperStyle = useMemo(
    () =>
      ({
        '--min-height': `${height}px`,
        '--transition': transition,
      }) as CSSProperties,
    [height, transition]
  );

  // Classname for the carousel wrapper.
  const wrapperClass = useMemo(
    () =>
      classNames([
        styles.wrapper,
        direction === 'horizontal'
          ? styles.wrapper_horizontal
          : styles.wrapper_vertical,
      ]),
    [direction]
  );

  // Swipe handler.
  const {
    onInit,
    swipeState: { dir, offset },
  } = useSwipe('low');

  // Effects to handle swipe gestures.
  useEffect(() => {
    if (!enableSwipe) {
      return;
    }

    if (
      (dir === 'RIGHT' && direction === 'horizontal') ||
      (dir === 'BOTTOM' && direction === 'vertical')
    ) {
      handlePrevious();
    } else if (
      (dir === 'LEFT' && direction === 'horizontal') ||
      (dir === 'TOP' && direction === 'vertical')
    ) {
      handleNext();
    }
  }, [offset, dir, direction, handleNext, handlePrevious, enableSwipe]);

  // Effect to clean up on unmount.
  useEffect(() => {
    return () => {
      resizeObserver.current?.disconnect();
    };
  }, []);

  // Render the Carousel component.
  return (
    <section
      className={carouselContainerClass}
      ref={enableSwipe ? onInit : undefined}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <div
        className={wrapperClass}
        ref={onInitRef}
        style={carouselWrapperStyle}
        aria-live="polite"
        aria-atomic="false"
      >
        <CarouselItems
          carouselItems={carouselItems}
          direction={direction}
          activePage={activePage}
          totalItems={trackCount.current}
          height={slideHeight}
          width={slideWidth}
        >
          {children}
        </CarouselItems>
      </div>
      <div className={carouselTrackClass}>
        <CarouselTrack
          activeIndex={activePage}
          handleSelection={handleActivatePage}
          length={trackCount.current}
          direction={direction}
          onNext={handleNext}
          onPrevious={handlePrevious}
          hideNext={hideNextButton}
          hidePrevious={hidePreviousButton}
          focusable={focusable}
          size={size}
        />
        {autoPlay > 0 && isAutoPlaying && (
          <button
            type="button"
            onClick={handleTogglePause}
            className={styles.pause_button}
            aria-label={isPaused ? 'Resume carousel' : 'Pause carousel'}
            aria-pressed={isPaused}
          >
            {isPaused ? '▶' : '⏸'}
          </button>
        )}
      </div>
    </section>
  );
};

Carousel.displayName = 'Carousel';

export { Carousel };
