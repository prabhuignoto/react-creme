import classNames from 'classnames';
import React, { useMemo } from 'react';
import RateIcon from '../../icons/star';
import useFocusNew from '../common/effects/useFocusNew';
import { RateItemViewProps } from './rate-model';
import styles from './rate.module.scss';

const RateItem: React.FunctionComponent<RateItemViewProps> = ({
  active,
  disabled,
  focusable,
  hovered,
  icon,
  id,
  index,
  onMouseOver,
  onSelect,
  size = 'sm',
}: RateItemViewProps) => {
  const ref = React.useRef<HTMLLIElement | null>(null);

  if (focusable && !disabled) {
    useFocusNew(ref, () => onSelect(index));
  }

  const rateItemClass = useMemo(
    () =>
      classNames(styles.item, {
        [styles.active]: active,
        [styles[size]]: true,
        [styles.disabled]: disabled,
        [styles.hovered]: hovered,
      }),
    [active, hovered, disabled]
  );

  const focusableProps = useMemo(
    () =>
      focusable && {
        ref,
        tabIndex: 0,
      },
    []
  );

  const disabledProps = useMemo(
    () =>
      disabled && {
        'aria-disabled': disabled,
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
      {...focusableProps}
      {...disabledProps}
    >
      <span role="img" onClick={() => onSelect(index)} aria-label="star">
        {icon || <RateIcon />}
      </span>
    </li>
  );
};

RateItem.displayName = 'RateItem';

export { RateItem };
