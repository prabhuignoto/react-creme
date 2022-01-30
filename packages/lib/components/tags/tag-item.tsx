import classNames from 'classnames';
import React, {
  CSSProperties,
  FunctionComponent,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { CloseIcon } from '../../icons';
import { useFirstRender } from '../common/effects/useFirstRender';
import useFocusNew from '../common/effects/useFocusNew';
import { useKey } from '../common/effects/useKey';
import { TagItemProps } from './tags-model';
import './tags.scss';

type TagItemViewProps = TagItemProps & {
  handleRemove: (id: string) => void;
};

const TagItem: FunctionComponent<TagItemViewProps> = React.memo(
  ({
    id,
    name,
    disabled,
    handleRemove,
    readonly,
    tagWidth,
    tagStyle,
    tagSize,
    markedForRemoval,
    focusable,
    accent,
  }: TagItemViewProps) => {
    const ref = useRef(null);

    const isFirstRender = useFirstRender();

    const handleClick = useCallback(() => {
      id && handleRemove(id);
    }, []);

    useKey(ref, handleClick);

    const editable = useMemo(() => !disabled && !readonly, []);
    const tagItemClass = useMemo(
      () =>
        classNames('rc-tag', {
          'rc-tag-disabled': disabled,
          'rc-tag-marked-for-removal':
            markedForRemoval && !isFirstRender.current,
          [`rc-tag-style-${tagStyle}`]: true,
          [`rc-tag-${tagSize}`]: true,
          'rc-tag-readonly': readonly,
          [`rc-tag-accent-${accent}`]: true,
        }),
      [markedForRemoval]
    );

    const tagIconClass = useMemo(
      () =>
        classNames('rc-tag-icon', {
          [`rc-tag-icon-${tagStyle}`]: true,
          [`rc-tag-icon-${tagSize}`]: true,
          'rc-tag-icon-editable': editable,
        }),
      [editable]
    );

    const tagName = useMemo(
      () =>
        classNames('rc-tag-name', {
          [`rc-tag-name-${tagSize}`]: true,
        }),
      []
    );

    const style = useMemo(
      () =>
        ({
          '--width': `${tagWidth}px`,
        } as CSSProperties),
      []
    );

    if (focusable) {
      useFocusNew(ref, handleClick);
    }

    return (
      <li key={id} role="listitem" className={tagItemClass} style={style}>
        <span className={tagName} title={name}>
          {name}
        </span>
        <span
          className={tagIconClass}
          onClick={handleClick}
          ref={ref}
          role="button"
          tabIndex={focusable ? 0 : -1}
        >
          <CloseIcon />
        </span>
      </li>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.disabled === nextProps.disabled &&
      prevProps.markedForRemoval === nextProps.markedForRemoval
    );
  }
);

TagItem.displayName = 'TagItem';

export { TagItem };
