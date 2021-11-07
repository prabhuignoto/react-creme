import classNames from "classnames";
import React from "react";
import RateIcon from "../../icons/star";
import { RateItemViewModel } from "./rate-model";

const RateItem: React.FunctionComponent<RateItemViewModel> = React.memo(
  ({
    id,
    active,
    hovered,
    onMouseOver,
    index,
    size,
    icon,
    onSelect,
  }: RateItemViewModel) => {
    return (
      <li
        key={id}
        className={classNames("rc-rate-item", {
          "rc-rate-item-active": active,
          [`rc-rate-item-${size}`]: true,
          "rc-rate-item-hovered": hovered,
        })}
        onClick={() => onSelect(index)}
        onMouseOver={() => onMouseOver(index)}
        aria-checked={active}
        role="radio"
        tabIndex={0}
      >
        <span role="img">{icon || <RateIcon />}</span>
      </li>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.active === nextProps.active &&
      prevProps.hovered === nextProps.hovered
    );
  }
);

RateItem.displayName = "RateItem";

export { RateItem };
