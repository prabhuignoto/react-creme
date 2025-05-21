import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React from 'react';
import {
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
  direction = 'horizontal',
  height = 400,
  transition = 'cubic-bezier(0.55, 0.08, 0.68, 0.53)',
  focusable = true,
  border = false,
  size = 'md',
}) => {
  // Carousel items state. Each item has an id, visibility status, and its dimensions.
  const [carouselItems, setCarouselItems] = useState<CarouselItemProps[]>(
    Array.isArray(children)
      ? children.map(() => ({
          height: 0,
          id: nanoid(),
          visible: false,
          width: 0,
        }))
      : []
  );

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

  // Debounced versions of slide dimensions for performance optimization.
  const [debouncedSlideWidth] = useDebounce(slideWidth, 100);
  const [debouncedSlideHeight] = useDebounce(slideHeight, 100);

  // Ref to store the instance of ResizeObserver for resizing the carousel items.
  const resizeObserver = useRef<ResizeObserver | null>(null);

  // Callback function to handle "Next" action in the carousel.
  const handleNext = useCallback(() => {
    activePage < trackCount.current - 1 && setActivePage(prev => prev + 1);
  }, [activePage]);

  // Callback function to handle "Previous" action in the carousel.
  const handlePrevious = useCallback(() => {
    setActivePage(prev => prev - 1);
  }, [activePage]);

  // Callback function to handle page activation in the carousel.
  const handleActivatePage = useCallback(
    (pageIndex: number) => setActivePage(pageIndex),
    []
  );

  // Callback function to handle the initial setup of the carousel.
  const onInitRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      const { clientHeight, clientWidth } = node;
      setSlideWidth(clientWidth);
      setSlideHeight(clientHeight);

      resizeObserver.current = new ResizeObserver(() => {
        const { clientHeight, clientWidth } = node as HTMLElement;
        setSlideWidth(clientWidth);
        setSlideHeight(clientHeight);
      });

      resizeObserver.current.observe(node);
    }
  }, []);

  // Effect to update the carousel items whenever the dimensions change.
  useLayoutEffect(() => {
    if (resizeObserver.current) {
      resizeObserver.current.disconnect();
    }

    if (slideWidth && slideHeight && Array.isArray(children)) {
      const prop = direction === 'horizontal' ? 'left' : 'top';
      setCarouselItems(
        children.map((_, index) => ({
          height: debouncedSlideHeight,
          id: nanoid(),
          [prop]: `${
            direction === 'horizontal'
              ? index * slideWidth
              : index * slideHeight
          }px`,
          visible: false,
          width: debouncedSlideWidth,
        }))
      );
    }
  }, [debouncedSlideWidth, debouncedSlideHeight, direction, children]);

  // Memoized value to determine whether to hide the next button.
  const hideNextButton = useMemo(
    () => activePage === trackCount.current - 1,
    [activePage]
  );

  // Effect to handle auto-playing of the carousel.
  useLayoutEffect(() => {
    if (
      !autoPlayRef.current &&
      autoPlay &&
      activePage < carouselItems.length - 1
    ) {
      setAutoPlaying(true);
      autoPlayRef.current = window.setInterval(() => {
        setActivePage(page => {
          if (page === carouselItems.length - 1) {
            clearInterval(autoPlayRef.current);
            setAutoPlaying(false);
            return page;
          }

          return page + 1;
        });
      }, autoPlay);
    }
  }, [autoPlay, carouselItems.length]);

  // Memoized value to determine whether to hide the previous button.
  const hidePreviousButton = useMemo(() => activePage === 0, [activePage]);

  // Classnames for the carousel track and container.
  const carouselTrackClass = useMemo(
    () =>
      classNames([
        styles.track_wrapper,
        direction === 'horizontal' ? styles.track_wrapper_horizontal : '',
      ]),
    [isAutoPlaying]
  );
  const carouselContainerClass = useMemo(
    () =>
      classNames(
        [
          styles.container,
          direction === 'horizontal'
            ? styles.container_horizontal
            : styles.container_vertical,
        ],
        {
          'rc-carousel-border': border,
        }
      ),
    []
  );

  // Styles for the carousel wrapper.
  const carouselWrapperStyle = useMemo(
    () =>
      ({
        '--min-height': `${height}px`,
        '--transition': transition,
      }) as CSSProperties,
    []
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
    []
  );

  // Swipe handler.
  const {
    onInit,
    swipeState: { dir, offset },
  } = useSwipe('low');

  // Effects to handle swipe gestures.
  useEffect(() => {
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
  }, [offset, dir]);

  // Effect to clean up on unmount.
  useEffect(() => {
    return () => {
      resizeObserver.current?.disconnect();
    };
  }, []);

  // Render the Carousel component.
  return (
    <div className={carouselContainerClass} ref={onInit}>
      <div
        className={wrapperClass}
        ref={onInitRef}
        style={carouselWrapperStyle}
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
        {!isAutoPlaying && (
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
        )}
      </div>
    </div>
  );
};

Carousel.displayName = 'Carousel';

export { Carousel };
