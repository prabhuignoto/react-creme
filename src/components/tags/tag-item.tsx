import classNames from "classnames";
import React, { FunctionComponent, useCallback, useRef } from "react";
import { CloseIcon } from "../../icons";
import { useFocus } from "../common/effects/useFocus";
import { useKey } from "../common/effects/useKey";
import "./tags.scss";

export interface TagItemModel {
  id?: string;
  name: string;
  handleRemove: (id: string) => void;
  disabled?: boolean;
}

const TagItem: FunctionComponent<TagItemModel> = React.memo(
  ({ id, name, disabled, handleRemove }: TagItemModel) => {
    const handleClick = useCallback(() => {
      id && handleRemove(id);
    }, []);
    const ref = useRef(null);
    useFocus(ref);
    useKey(ref, handleClick);
    return (
      <>
        <li
          key={id}
          role="listitem"
          className={classNames(["rc-tag", disabled ? "rc-tag-disabled" : ""])}
        >
          <span className="center">{name}</span>
          {!disabled && (
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
