import React, { ReactNode, useRef } from "react";
import useSortable from "./../common/effects/useSortable";
import "./sortable.scss";

interface SortableProps {
  direction?: "horizontal" | "vertical";
  children?: ReactNode | ReactNode[];
}

const Sortable: React.FunctionComponent<SortableProps> = ({
  direction = "vertical",
  children,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useSortable(ref, { rowGap: 10 });

  return (
    <div className={"rc-sortable-wrapper"} ref={ref}>
      {children}
    </div>
  );
};

export { Sortable };
