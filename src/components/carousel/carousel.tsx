import classNames from "classnames";
import { nanoid } from "nanoid";
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CarouselButton } from "./carousel-button";
import { CarouselItems } from "./carousel-items";
import { CarouselItemModel, CarouselModel } from "./carousel-model";
import { CarouselTrack } from "./carousel-track";
import "./carousel.scss";

const Carousel: React.FunctionComponent<CarouselModel> = ({
  children,
  direction = "horizontal",
  height = 400,
}) => {
  const [carouselItems, setCarouselItems] = useState<CarouselItemModel[]>(
    Array.isArray(children)
      ? children.map((_, index) => ({
          id: nanoid(),
          visible: false,
        }))
      : []
  );

  const trackCount = useRef(Array.isArray(children) ? children.length : 0);

  const [activePage, setActivePage] = useState(0);

  const carouselRef = useRef<HTMLDivElement>(null);

  const [slideWidth, setSlideWidth] = useState(0);

  const [slideHeight, setSlideHeight] = useState(0);

  const handleNext = useCallback(() => {
    setActivePage((prev) => prev + 1);
  }, []);

  const handlePrevious = useCallback(() => {
    if (activePage > 0) {
      setActivePage((prev) => prev - 1);
    }
  }, [activePage]);

  const handleActivatePage = useCallback(
    (pageIndex) => setActivePage(pageIndex),
    []
  );

  useEffect(() => {
    if (carouselRef.current) {
      const { clientHeight, clientWidth } = carouselRef.current;
      setSlideWidth(clientWidth);
      setSlideHeight(clientHeight);
    }
  }, []);

  useEffect(() => {
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

  const hidePreviousButton = useMemo(() => activePage === 0, [activePage]);

  const carouselTrackClass = useMemo(() => {
    return classNames([
      "rc-carousel-track-wrapper",
      `rc-carousel-track-wrapper-${direction}`,
    ]);
  }, []);

  const carouselContainerClass = useMemo(() => {
    return classNames([
      "rc-carousel-container",
      `rc-carousel-container-${direction}`,
    ]);
  }, []);

  const carouselWrapperStyle = useMemo(() => {
    return {
      "--min-height": `${height}px`,
    } as CSSProperties;
  }, []);

  return (
    <div className={carouselContainerClass}>
      <div
        className={"rc-carousel-wrapper"}
        ref={carouselRef}
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
        {!hidePreviousButton && (
          <CarouselButton onClick={handlePrevious} position="left" />
        )}
        {!hideNextButton && (
          <CarouselButton onClick={handleNext} position="right" />
        )}
      </div>
      <div className={carouselTrackClass}>
        <CarouselTrack
          activeIndex={activePage}
          handleSelection={handleActivatePage}
          length={trackCount.current}
          direction={direction}
        />
      </div>
    </div>
  );
};

export { Carousel };
