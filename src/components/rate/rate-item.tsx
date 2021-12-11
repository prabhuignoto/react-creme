import classNames from "classnames";
import React, { useMemo } from "react";
import RateIcon from "../../icons/star";
import { useFocus } from "../common/effects/useFocus";
import { RateItemViewModel } from "./rate-model";

const RateItem: React.FunctionComponent<RateItemViewModel> = React.memo(
  ({
    active,
    disabled,
    focusable,
    hovered,
    icon,
    id,
    index,
    onMouseOver,
    onSelect,
    size,
  }: RateItemViewModel) => {
    const ref = React.useRef<HTMLLIElement | null>(null);

    if (focusable && !disabled) {
      useFocus(ref, () => onSelect(index));
    }

    const rateItemClass = useMemo(
      () =>
        classNames("rc-rate-item", {
          "rc-rate-item-active": active,
          [`rc-rate-item-${size}`]: true,
          "rc-rate-item-hovered": hovered,
          "rc-rate-item-disabled": disabled,
        }),
      [active, hovered, disabled]
    );

    const focusableProps = useMemo(
      () =>
        focusable && {
          tabIndex: 0,
          ref,
        },
      []
    );

    const disabledProps = useMemo(
      () =>
        disabled && {
          "aria-disabled": disabled,
        },
      [disabled]
    );

    return (
      <li
        key={id}
        className={rateItemClass}
        onMouseOver={() => onMouseOver(index)}
        aria-checked={active}
        role="radio"
        {...disabledProps}
      >
        <span role="img" onClick={() => onSelect(index)} {...focusableProps}>
          {icon || <RateIcon />}
        </span>
      </li>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.active === nextProps.active &&
      prevProps.hovered === nextProps.hovered &&
      prevProps.disabled === nextProps.disabled
    );
  }
);

RateItem.displayName = "RateItem";

export { RateItem };
