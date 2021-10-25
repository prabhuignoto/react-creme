import classNames from "classnames";
import React, { FunctionComponent, useCallback, useMemo, useRef } from "react";
import { CloseIcon } from "../../icons";
import { useFocus } from "../common/effects/useFocus";
import { useKey } from "../common/effects/useKey";
import { TagItemModel } from "./tags-model";
import "./tags.scss";

type TagItemViewModel = TagItemModel & {
  handleRemove: (id: string) => void;
};

const TagItem: FunctionComponent<TagItemViewModel> = React.memo(
  ({ id, name, disabled, handleRemove, readonly }: TagItemViewModel) => {
    const handleClick = useCallback(() => {
      id && handleRemove(id);
    }, []);
    const ref = useRef(null);
    useFocus(ref);
    useKey(ref, handleClick);

    const editable = useMemo(() => !disabled && !readonly, []);
    const tagItemClass = useMemo(
      () =>
        classNames("rc-tag", {
          "rc-tag-disabled": disabled,
          "rc-tag-readonly": readonly,
        }),
      []
    );

    return (
      <>
        <li key={id} role="listitem" className={tagItemClass}>
          <span className="center">{name}</span>
          {editable && (
            <span
              className="rc-tag-icon"
              onClick={handleClick}
              tabIndex={0}
              ref={ref}
            >
              <CloseIcon />
            </span>
          )}
        </li>
      </>
    );
  }
);

TagItem.displayName = "TagItem";

export { TagItem };
