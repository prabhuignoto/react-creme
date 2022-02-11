import { OverlayModel } from '@components/common/overlay-model';
import { ListOption } from '@components/list/list-model';
import React, { CSSProperties, useEffect, useMemo, useRef } from 'react';
import { withOverlay } from '../../components/common/withOverlay';
import { List } from '../list/list';

type SuggestMenuData = {
  focus: boolean;
  items: ListOption[];
};

interface SuggestionsOverlayModel extends OverlayModel<SuggestMenuData> {
  focus?: boolean;
  id?: string;
  // eslint-disable-next-line no-unused-vars
  onSelection: (option: ListOption[]) => void;
  width?: number;
}

const SuggestionsMenu: React.FunctionComponent<SuggestionsOverlayModel> = ({
  onSelection,
  id,
  width,
  data,
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

  return (
    <div className="rc-auto-suggest-suggestions-wrapper" style={style}>
      <List
        options={data?.items as ListOption[]}
        onSelection={onSelection}
        showCheckIcon={false}
        itemHeight={35}
        id={id}
        border={false}
        ref={ref}
      />
    </div>
  );
};

const SuggestionsMenuOverlay = withOverlay<
  SuggestionsOverlayModel,
  SuggestMenuData
>(SuggestionsMenu, {
  backdropColor: 'transparent',
  // disableBackdrop: true,
  placement: 'bottom',
});

export { SuggestionsMenuOverlay };
