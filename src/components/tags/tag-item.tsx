import classNames from "classnames";
import React, {
  CSSProperties,
  FunctionComponent,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { CloseIcon } from "../../icons";
import { useFocus } from "../common/effects/useFocus";
import { useKey } from "../common/effects/useKey";
import { TagItemModel } from "./tags-model";
import "./tags.scss";

type TagItemViewModel = TagItemModel & {
  handleRemove: (id: string) => void;
  width?: number;
  tagStyle?: "default" | "fill";
  tagSize?: "small" | "large";
};

const TagItem: FunctionComponent<TagItemViewModel> = React.memo(
  ({
    id,
    name,
    disabled,
    handleRemove,
    readonly,
    width,
    tagStyle,
    tagSize,
  }: TagItemViewModel) => {
    const ref = useRef(null);

    useFocus(ref);

    const handleClick = useCallback(() => {
      id && handleRemove(id);
    }, []);

    useKey(ref, handleClick);

    const editable = useMemo(() => !disabled && !readonly, []);
    const tagItemClass = useMemo(
      () =>
        classNames("rc-tag", {
          "rc-tag-disabled": disabled,
          "rc-tag-readonly": readonly,
          [`rc-tag-style-${tagStyle}`]: true,
          [`rc-tag-${tagSize}`]: true,
        }),
      []
    );

    const tagIconClass = useMemo(
      () =>
        classNames("rc-tag-icon", {
          [`rc-tag-icon-${tagStyle}`]: true,
        }),
      []
    );

    const style = useMemo(
      () =>
        ({
          "--width": `${width}px`,
        } as CSSProperties),
      []
    );

    return (
      <li key={id} role="listitem" className={tagItemClass} style={style}>
        <span className={classNames("rc-tag-name", "center")} title={name}>
          {name}
        </span>
        {editable && (
          <span
            className={tagIconClass}
            onClick={handleClick}
            ref={ref}
            role="button"
            tabIndex={0}
          >
            <CloseIcon />
          </span>
        )}
      </li>
    );
  }
);

TagItem.displayName = "TagItem";

export { TagItem };
