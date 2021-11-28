import classNames from "classnames";
import { nanoid } from "nanoid";
import React, {
  CSSProperties,
  startTransition,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CarouselItems } from "./carousel-items";
import { CarouselItemModel, CarouselModel } from "./carousel-model";
import { CarouselTrack } from "./carousel-track";
import "./carousel.scss";

const Carousel: React.FunctionComponent<CarouselModel> = ({
  autoPlay = 0,
  children,
  direction = "horizontal",
  height = 400,
  transition = "cubic-bezier(0.55, 0.08, 0.68, 0.53)",
}) => {
  const [carouselItems, setCarouselItems] = useState<CarouselItemModel[]>(
    Array.isArray(children)
      ? children.map(() => ({
          id: nanoid(),
          visible: false,
          height: 0,
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

  const handleNext = useCallback(() => {
    startTransition(() => setActivePage((prev) => prev + 1));
  }, []);

  const handlePrevious = useCallback(
    () => startTransition(() => setActivePage((prev) => prev - 1)),
    []
  );

  const handleActivatePage = useCallback(
    (pageIndex) => setActivePage(pageIndex),
    []
  );

  const onInitRef = useCallback((node) => {
    if (node) {
      const { clientHeight, clientWidth } = node;
      setSlideWidth(clientWidth);
      setSlideHeight(clientHeight);
    }
  }, []);

  useLayoutEffect(() => {
    if (slideWidth && slideHeight && Array.isArray(children)) {
      const prop = direction === "horizontal" ? "left" : "top";
      setCarouselItems(
        children.map((_, index) => ({
          id: nanoid(),
          width: slideWidth,
          height: slideHeight,
          visible: false,
          [prop]: `${
            direction === "horizontal"
              ? index * slideWidth
              : index * slideHeight
          }px`,
        }))
      );
    }
  }, [slideWidth, slideHeight]);

  const hideNextButton = useMemo(
    () => activePage === trackCount.current - 1,
    [activePage]
  );

  useEffect(() => {
    if (
      !autoPlayRef.current &&
      autoPlay &&
      activePage < carouselItems.length - 1
    ) {
      setAutoPlaying(true);
      autoPlayRef.current = setInterval(() => {
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

  const carouselTrackClass = useMemo(() => {
    return classNames([
      "rc-carousel-track-wrapper",
      `rc-carousel-track-wrapper-${direction}`,
      {
        "rc-carousel-track-auto-play": isAutoPlaying,
      },
    ]);
  }, [isAutoPlaying]);

  const carouselContainerClass = useMemo(() => {
    return classNames([
      "rc-carousel-container",
      `rc-carousel-container-${direction}`,
    ]);
  }, []);

  const carouselWrapperStyle = useMemo(() => {
    return {
      "--min-height": `${height}px`,
      "--transition": transition,
    } as CSSProperties;
  }, []);

  const wrapperClass = useMemo(
    () =>
      classNames(["rc-carousel-wrapper", `rc-carousel-wrapper-${direction}`]),
    []
  );

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
          />
        )}
      </div>
    </div>
  );
};

export { Carousel };
