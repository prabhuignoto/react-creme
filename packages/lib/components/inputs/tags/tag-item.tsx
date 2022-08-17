import classNames from 'classnames';
import React, {
  CSSProperties,
  FunctionComponent,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { useFirstRender } from '../../common/effects/useFirstRender';
import useFocusNew from '../../common/effects/useFocusNew';
import { useKey } from '../../common/effects/useKey';
import { CloseIcon } from '../../common/icons';
import { isDark } from '../../common/utils';
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

    const isDarkMode = useMemo(() => isDark(), []);

    const tagItemClass = useMemo(
      () =>
        classNames(styles.tag, 'rc-tag', {
          [styles.disabled]: disabled,
          [styles.marked_for_removal]:
            markedForRemoval && !isFirstRender.current,
          [styles[`style_${tagStyle}`]]: true,
          [styles[`${size}`]]: true,
          [styles.readonly]: readonly,
          [styles[`accent_${accent}`]]: true,
          [styles.dark]: isDarkMode,
        }),
      [markedForRemoval]
    );

    const tagIconClass = useMemo(
      () =>
        classNames(styles.icon, {
          [styles[`icon_${tagStyle}`]]: true,
          [styles.icon_editable]: editable,
        }),
      [editable]
    );

    const tagName = useMemo(() => classNames(styles.name, {}), []);

    const style = useMemo(
      () =>
        ({
          '--width': `${tagWidth}px`,
        } as CSSProperties),
      []
    );

    useFocusNew(focusable ? ref : null, focusable ? handleClick : null);

    return (
      <li key={id} className={tagItemClass} style={style}>
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
