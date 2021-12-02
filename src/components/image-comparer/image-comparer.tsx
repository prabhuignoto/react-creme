import classNames from "classnames";
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CircularProgress, Image } from "..";
import { useDrag } from "../common/effects/useDrag";
import { ImageComparerModel } from "./image-comparer.model";
import "./image-comparer.scss";

const ImageComparer: React.FunctionComponent<ImageComparerModel> = ({
  sourceOne,
  sourceTwo,
  direction = "horizontal",
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef(null);
  const isFirstRender = useRef(true);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageLoaded2, setImageLoaded2] = useState(false);

  const [dragged, setDragged] = useState(false);

  const [wrapperWidth, setWrapperWidth] = useState(0);
  const [wrapperHeight, setWrapperHeight] = useState(0);

  const [percent] = useDrag(panelRef, dragRef, {
    direction,
    onDragStart: () => setDragged(true),
    onDragEnd: () => setDragged(false),
    observeContainer: true,
    offsetLeft: 6,
  });

  const style = useMemo(() => {
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
  }, [percent, direction]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, []);

  const imagesLoaded = useMemo(
    () => imageLoaded && imageLoaded2,
    [imageLoaded, imageLoaded2]
  );

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
    return classNames("rc-img-comparer-wrapper");
  }, [wrapperWidth]);

  const wrapperStyle = useMemo(() => {
    return {
      "--width": wrapperWidth ? `${wrapperWidth}px` : "95%",
      "--height": wrapperHeight ? `${wrapperHeight}px` : "95%",
    } as CSSProperties;
  }, [wrapperWidth, wrapperHeight]);

  const onImageLoad = useCallback((ev: any) => {
    const { width, height } = ev.target;
    setWrapperWidth(width);
    setWrapperHeight(height);
    setImageLoaded(true);
  }, []);

  const onImageLoad2 = (ev: any) => {
    setImageLoaded2(true);
  };

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
