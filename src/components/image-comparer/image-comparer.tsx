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

  const [percent] = useDrag(panelRef, dragRef, {
    direction: "horizontal",
  });

  const [style, setStyle] = useState<CSSProperties>({});

  useEffect(() => {
    if (!panelRef.current) {
      return;
    }

    const { clientWidth } = panelRef.current;

    const percentToUse = !percent && isFirstRender.current ? 0.5 : percent;

    setStyle({
      width:
        Math.round(percentToUse * clientWidth) - 4 ||
        Math.round(clientWidth * 0.5),
    });
  }, [panelRef, percent]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, []);

  const dragHandleClass = useMemo(
    () => classNames("img-comparer-drag-handle"),
    []
  );

  return (
    <div className="img-comparer-wrapper" ref={panelRef}>
      <div className="img-comparer-panel img-comparer-panel-1" style={style}>
        <Image src={sourceOne} fitImage={false} />
      </div>
      <div className="img-comparer-panel img-comparer-panel-2">
        <Image src={sourceTwo} fitImage={false} />
      </div>
      <span className={dragHandleClass} ref={dragRef}></span>
    </div>
  );
};

export { ImageComparer };
