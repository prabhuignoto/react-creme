import React, { FunctionComponent, ReactNode, useRef } from "react";
import { ChevronRightIcon } from "../../icons";
import { useFocus } from "../common/effects/useFocus";
import { useKey } from "../common/effects/useKey";

interface BreadCrumbItemModel {
  id: string;
  onClick?: () => void;
  child: ReactNode;
  showChevron?: boolean;
}

const BreadCrumbItem: FunctionComponent<BreadCrumbItemModel> = ({
  id,
  onClick,
  child,
  showChevron,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  useFocus(ref, { bgHighlight: false });

  useKey(ref, () => {
    if (ref.current) {
      ref.current.querySelector("a")?.click();
    }
  });

  return (
    <li className="bread-crumb" key={id}>
      <span
        className="bread-crumb-node"
        ref={ref}
        tabIndex={0}
        onClick={onClick}
      >
        {child}
      </span>
      {showChevron && (
        <span className="bread-crumb-icon">
          <ChevronRightIcon />
        </span>
      )}
    </li>
  );
};

export { BreadCrumbItem };
