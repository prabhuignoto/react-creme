import classNames from "classnames";
import { nanoid } from "nanoid";
import React, { useCallback, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import RateIcon from "../../icons/star";
import { useFirstRender } from "../common/effects/useFirstRender";
import { RateItemModel, RateProps } from "./rate-model";
import "./rate.scss";

const Rate: React.FunctionComponent<RateProps> = ({
  icon,
  onChange,
  size = "sm",
  value = 0,
  iconCount = 5,
}) => {
  const [items, setItems] = React.useState<RateItemModel[]>(
    Array.from({ length: iconCount }).map(() => ({
      id: nanoid(),
      active: false,
      hovered: false,
    }))
  );

  const lastSelectedIndex = React.useRef<number>(-1);

  const [selectedIndex, setSelectedIndex] = React.useState<number>(
    value ? value - 1 : -1
  );
  const [hoverIndex, setHoverIndex] = React.useState<number>(-1);

  const handleSelection = useCallback((idx: number) => {
    setSelectedIndex(idx);
    lastSelectedIndex.current = idx;
    onChange && onChange(idx + 1);
  }, []);

  const handleHover = useCallback(
    (idx: number) => {
      setHoverIndex(idx);
      lastSelectedIndex.current = selectedIndex;
      setSelectedIndex(-1);
    },
    [selectedIndex]
  );

  const handleLeave = useCallback(() => {
    setHoverIndex(-1);
    if (lastSelectedIndex.current !== -1) {
      setSelectedIndex(lastSelectedIndex.current);
    }
  }, []);

  const debouncedHover = useDebouncedCallback(handleHover, 10);

  useEffect(() => {
    if (!isFirstRender.current) {
      setItems((prev) =>
        prev.map((item, index) => ({ ...item, active: index <= selectedIndex }))
      );
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (!isFirstRender.current) {
      setItems((prev) =>
        prev.map((item, index) => ({
          ...item,
          hovered: index <= hoverIndex,
        }))
      );
    }
  }, [hoverIndex]);

  const isFirstRender = useFirstRender();

  return (
    <ul className="rc-rate-wrapper" role="radiogroup">
      {items.map(({ id, active, hovered }, index) => {
        return (
          <li
            key={id}
            className={classNames("rc-rate-item", {
              "rc-rate-item-active": active,
              [`rc-rate-item-${size}`]: true,
              "rc-rate-item-hovered": hovered,
            })}
            onClick={() => handleSelection(index)}
            onMouseEnter={() => debouncedHover(index)}
            onMouseLeave={handleLeave}
            aria-checked={active}
            role="radio"
          >
            <span role="img">{icon || <RateIcon />}</span>
          </li>
        );
      })}
    </ul>
  );
};

export { Rate };
