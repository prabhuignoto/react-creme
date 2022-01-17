import classNames from "classnames";
import { nanoid } from "nanoid";
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ResizeObserver from "resize-observer-polyfill";
import { useDebounce } from "use-debounce";
import useSwipe from "../common/effects/useSwipe";
import { CarouselItems } from "./carousel-items";
import { CarouselItemProps, CarouselProps } from "./carousel-model";
import { CarouselTrack } from "./carousel-track";
import "./carousel.scss";

const Carousel: React.FunctionComponent<CarouselProps> = ({
  autoPlay = 0,
  children,
  direction = "horizontal",
  height = 400,
  transition = "cubic-bezier(0.55, 0.08, 0.68, 0.53)",
  enableSwipe = false,
  focusable = false,
}) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
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

  const trackCount = useRef(Array.isArray(children) ? children.length : 0);
  const autoPlayRef = useRef<number>();

  const [activePage, setActivePage] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const [slideHeight, setSlideHeight] = useState(0);
  const [isAutoPlaying, setAutoPlaying] = useState(!!autoPlay);

  const [debouncedSlideWidth] = useDebounce(slideWidth, 100);
  const [debouncedSlideHeight] = useDebounce(slideHeight, 100);

  const resizeObserver = useRef<ResizeObserver | null>(null);

  const handleNext = useCallback(() => {
    activePage < trackCount.current - 1 && setActivePage((prev) => prev + 1);
  }, [activePage]);

  const handlePrevious = useCallback(() => {
    setActivePage((prev) => prev - 1);
  }, [activePage]);

  const handleActivatePage = useCallback(
    (pageIndex) => setActivePage(pageIndex),
    []
  );

  const onInitRef = useCallback((node) => {
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

  useLayoutEffect(() => {
    if (slideWidth && slideHeight && Array.isArray(children)) {
      const prop = direction === "horizontal" ? "left" : "top";
      setCarouselItems(
        children.map((_, index) => ({
          height: debouncedSlideHeight,
          id: nanoid(),
          [prop]: `${
            direction === "horizontal"
              ? index * slideWidth
              : index * slideHeight
          }px`,
          visible: false,
          width: debouncedSlideWidth,
        }))
      );
    }
  }, [debouncedSlideWidth, debouncedSlideHeight]);

  const hideNextButton = useMemo(
    () => activePage === trackCount.current - 1,
    [activePage]
  );

  useLayoutEffect(() => {
    if (
      !autoPlayRef.current &&
      autoPlay &&
      activePage < carouselItems.length - 1
    ) {
      setAutoPlaying(true);
      autoPlayRef.current = window.setInterval(() => {
        setActivePage((page) => {
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

  const hidePreviousButton = useMemo(() => activePage === 0, [activePage]);

  const carouselTrackClass = useMemo(
    () =>
      classNames([
        "rc-carousel-track-wrapper",
        `rc-carousel-track-wrapper-${direction}`,
        {
          "rc-carousel-track-auto-play": isAutoPlaying,
        },
      ]),
    [isAutoPlaying]
  );

  const carouselContainerClass = useMemo(
    () =>
      classNames([
        "rc-carousel-container",
        `rc-carousel-container-${direction}`,
      ]),
    []
  );

  const carouselWrapperStyle = useMemo(
    () =>
      ({
        "--min-height": `${height}px`,
        "--transition": transition,
      } as CSSProperties),
    []
  );

  const wrapperClass = useMemo(
    () =>
      classNames(["rc-carousel-wrapper", `rc-carousel-wrapper-${direction}`]),
    []
  );

  if (enableSwipe) {
    const { dir, offset } = useSwipe(carouselRef, "low");

    useEffect(() => {
      if (
        (dir === "RIGHT" && direction === "horizontal") ||
        (dir === "BOTTOM" && direction === "vertical")
      ) {
        handlePrevious();
      } else if (
        (dir === "LEFT" && direction === "horizontal") ||
        (dir === "TOP" && direction === "vertical")
      ) {
        handleNext();
      }
    }, [offset, dir]);
  }

  useEffect(() => {
    return () => {
      resizeObserver.current?.disconnect();
    };
  }, []);

  return (
    <div className={carouselContainerClass}>
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
          />
        )}
      </div>
    </div>
  );
};

export { Carousel };
