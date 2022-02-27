import { OverlayModel } from '@components/common/overlay-model';
import { ListOption } from '@components/list/list-model';
import React, { CSSProperties, useEffect, useMemo, useRef } from 'react';
import { withOverlay } from '../../components/common/withOverlay';
import useOnClickOutside from '../common/effects/useOnClickOutside';
import { List } from '../list/list';
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

  return (
    <div className={styles.suggestions_wrapper} style={style} ref={onRef}>
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
