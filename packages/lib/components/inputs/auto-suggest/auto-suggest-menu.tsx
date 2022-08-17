import classNames from 'classnames';
import React, { CSSProperties, useEffect, useMemo, useRef } from 'react';
import { withOverlay } from '../../../components/common/withOverlay';
import useOnClickOutside from '../../common/effects/useOnClickOutside';
import { OverlayModel } from '../../common/overlay-model';
import { isDark } from '../../common/utils';
import { List } from '../../data/list/list';
import { ListOption } from '../../list/list-model';
import styles from './auto-suggest.module.scss';

type SuggestMenuData = {
  focus: boolean;
  items: ListOption[];
};

interface SuggestionsOverlayModel extends OverlayModel<SuggestMenuData> {
  focus?: boolean;
  id?: string;
  onSelection: (option: ListOption[]) => void;
  size?: 'sm' | 'md' | 'lg';
  width?: number;
}

const SuggestionsMenu: React.FunctionComponent<SuggestionsOverlayModel> = ({
  onSelection,
  id,
  width,
  data,
  size,
  onClose,
}) => {
  const style = useMemo(
    () =>
      width
        ? ({
            '--suggestions-width': `${width}px`,
          } as CSSProperties)
        : {},
    [width]
  );

  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (data?.focus) {
      ref.current?.focus();
    } else {
      ref.current?.blur();
    }
  }, [data?.focus]);

  const { onRef } = useOnClickOutside(onClose);

  const isDarkMode = useMemo(() => isDark(), []);

  const suggestionsClass = useMemo(
    () =>
      classNames(styles.suggestions_wrapper, {
        [styles.dark]: isDarkMode,
      }),
    []
  );

  return (
    <div className={suggestionsClass} style={style} ref={onRef}>
      <List
        options={data?.items as ListOption[]}
        onSelection={onSelection}
        showCheckIcon={false}
        itemHeight={35}
        id={id}
        border={false}
        ref={ref}
        size={size}
      />
    </div>
  );
};

const SuggestionsMenuOverlay = withOverlay<
  SuggestionsOverlayModel,
  SuggestMenuData
>(SuggestionsMenu, {
  backdropColor: 'transparent',
  disableAnimation: true,
  placement: 'bottom',
});

export { SuggestionsMenuOverlay };
