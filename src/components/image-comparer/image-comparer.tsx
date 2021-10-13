import React, {
  CSSProperties,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDrag } from "../common/effects/useDrag";
import "./image-comparer.scss";

export interface ImageComparerModel {
  children: [ReactNode, ReactNode];
}

const ImageComparer: React.FunctionComponent<ImageComparerModel> = ({
  children,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef(null);

  const [percent] = useDrag(panelRef, dragRef, {
    direction: "horizontal",
  });

  const [style, setStyle] = useState<CSSProperties>({});

  useEffect(() => {
    const percentToUse = percent || 0.5;

    if (panelRef.current) {
      setStyle({
        width:
          Math.round(percentToUse * panelRef.current.clientWidth) - 4 ||
          Math.round(panelRef.current.clientWidth * 0.5),
      });
    }
  }, [panelRef, percent]);

  return (
    <div className="image-comparer-wrapper" ref={panelRef}>
      <div
        className="image-comparer-panel image-comparer-panel-1"
        style={style}
      >
        {children[0]}
      </div>
      <div className="image-comparer-panel image-comparer-panel-2">
        {children[1]}
      </div>
      <span className="image-comparer-drag-handle" ref={dragRef}></span>
    </div>
  );
};

export { ImageComparer };
