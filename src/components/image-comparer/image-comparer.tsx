import classNames from "classnames";
import React, {
  CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Image } from "..";
import { useDrag } from "../common/effects/useDrag";
import "./image-comparer.scss";

export interface ImageComparerModel {
  sourceOne?: string;
  sourceTwo: string;
}

const ImageComparer: React.FunctionComponent<ImageComparerModel> = ({
  sourceOne,
  sourceTwo,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef(null);
  const isFirstRender = useRef(true);

  const [dragged, setDragged] = useState(false);

  const [wrapperWidth, setWrapperWidth] = useState(0);

  const [percent] = useDrag(panelRef, dragRef, {
    direction: "horizontal",
    onDragStart: () => setDragged(true),
    onDragEnd: () => setDragged(false),
    observeContainer: true,
  });

  const style = useMemo(() => {
    const percentToUse = percent
      ? Math.round(percent * 100)
      : isFirstRender.current
      ? 50
      : 0;
    return {
      clipPath: `polygon(0% 0%, ${percentToUse}% 0%, ${percentToUse}% 100%, 0% 100%)`,
    } as CSSProperties;
  }, [percent]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, []);

  const dragHandleClass = useMemo(
    () =>
      classNames("img-comparer-drag-handle", {
        "rc-comparer-drag-handle-dragged": dragged,
      }),
    [dragged]
  );

  const wrapperClass = useMemo(() => {
    return classNames("img-comparer-wrapper", {
      "rc-comparer-wrapper-visible": wrapperWidth > 0,
      "rc-comparer-wrapper-hidden": wrapperWidth === 0,
    });
  }, [wrapperWidth]);

  const wrapperStyle = useMemo(() => {
    return {
      width: `${wrapperWidth}px`,
    } as CSSProperties;
  }, [wrapperWidth]);

  const onImageLoad = (ev: any) => {
    const { width } = ev.target;
    setWrapperWidth(width);
  };

  return (
    <div className={wrapperClass} ref={panelRef} style={wrapperStyle}>
      <div className="img-comparer-panel img-comparer-panel-1" style={style}>
        <Image src={sourceOne} fitImage={false} onLoad={onImageLoad} />
      </div>
      <div className="img-comparer-panel img-comparer-panel-2">
        <Image src={sourceTwo} fitImage={false} />
      </div>
      <span className={dragHandleClass} ref={dragRef}>
        <span className="rc-drag-handle-square"></span>
      </span>
    </div>
  );
};

export { ImageComparer };
