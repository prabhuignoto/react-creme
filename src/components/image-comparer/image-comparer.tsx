import classNames from "classnames";
import React, {
  CSSProperties,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDrag } from "../common/effects/useDrag";
import { useFirstRender } from "../common/effects/useFirstRender";
import { Image } from "../image/image";
import { CircularProgress } from "../progress/circular-progress";
import { ImageComparerModel } from "./image-comparer.model";
import "./image-comparer.scss";

const ImageComparer: React.FunctionComponent<ImageComparerModel> = ({
  sourceOne,
  sourceTwo,
  direction = "horizontal",
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
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  // const isFirstRender = useRef(null);

  // checks if both the images are loaded
  const imagesLoaded = useMemo(
    () => imageLoaded && imageLoaded2,
    [imageLoaded, imageLoaded2]
  );

  // classes
  const dragHandleClass = useMemo(
    () =>
      classNames("rc-img-comparer-drag-handle", {
        "rc-comparer-drag-handle-dragged": dragged,
        [`rc-comparer-drag-handle-${direction}`]: true,
        "rc-comparer-drag-handle-visible": imagesLoaded,
        "rc-comparer-drag-handle-hidden": !imagesLoaded,
      }),
    [dragged, direction, imagesLoaded]
  );

  const wrapperClass = useMemo(() => {
    return classNames("rc-img-comparer-wrapper", {
      "rc-image-comparer-loaded": imagesLoaded,
    });
  }, [imagesLoaded]);

  const wrapperStyle = useMemo(() => {
    const { width, height } = wrapperDimensions;
    return {
      "--width": width ? `${width}px` : "95%",
      "--height": height ? `${height}px` : "95%",
      visibility: imagesLoaded ? "visible" : "hidden",
    } as CSSProperties;
  }, [wrapperDimensions.height, wrapperDimensions.width, imagesLoaded]);

  // callback executed on first image load
  const onImageLoad = useCallback((ev: any) => {
    const { width, height } = ev.target;

    setWrapperDimensions({
      width: width,
      height: height,
    });

    setImageLoaded(true);
  }, []);

  // callback executed when the second image is loaded
  const onImageLoad2 = (ev: any) => setImageLoaded2(true);

  // setup the drag effect
  const [percent] = useDrag(panelRef, dragRef, {
    direction,
    onDragStart: () => setDragged(true),
    onDragEnd: () => setDragged(false),
    observeContainer: true,
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
          direction === "horizontal"
            ? `polygon(0% 0%, ${percentToUse}% 0%, ${percentToUse}% 100%, 0% 100%)`
            : `polygon(0% 0%, 100% 0%, 100% ${percentToUse}%, 0% ${percentToUse}%)`,
      } as CSSProperties;
    }
  }, [percent, direction]);

  return (
    <div className={wrapperClass} ref={panelRef} style={wrapperStyle}>
      {!imagesLoaded && (
        <div className="rc-circular-loader-wrapper">
          <CircularProgress />
        </div>
      )}
      <div className="img-comparer-panel img-comparer-panel-1" style={style}>
        <Image
          src={sourceOne}
          fitImage={false}
          onLoad={onImageLoad}
          showLoader={false}
        />
      </div>
      <div className="img-comparer-panel img-comparer-panel-2">
        <Image
          src={sourceTwo}
          fitImage={false}
          onLoad={onImageLoad2}
          showLoader={false}
        />
      </div>
      <span className={dragHandleClass} ref={dragRef}>
        <span className="rc-drag-handle-square"></span>
      </span>
    </div>
  );
};

export { ImageComparer };
