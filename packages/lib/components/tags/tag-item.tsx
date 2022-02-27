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
import styles from './tags.module.scss';

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
    size,
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
        classNames(styles.tag, {
          [styles.tag_disabled]: disabled,
          [styles.tag_marked_for_removal]:
            markedForRemoval && !isFirstRender.current,
          [styles[`tag_style_${tagStyle}`]]: true,
          [styles[`tag_${size}`]]: true,
          [styles.tag_readonly]: readonly,
          [styles[`tag_accent_${accent}`]]: true,
        }),
      [markedForRemoval]
    );

    const tagIconClass = useMemo(
      () =>
        classNames(styles.tag_icon, {
          [styles[`tag_icon_${tagStyle}`]]: true,
          [styles.tag_icon_editable]: editable,
        }),
      [editable]
    );

    const tagName = useMemo(() => classNames(styles.tag_name, {}), []);

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
          aria-label="delete tag"
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
