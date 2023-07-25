import classNames from 'classnames';
import React, { CSSProperties, useEffect, useMemo, useRef } from 'react';
import { withOverlay } from '../../components/common/withOverlay';
import useOnClickOutside from '../common/effects/useOnClickOutside';
import { OverlayModel } from '../common/overlay-model';
import { isDark } from '../common/utils';
import { List } from '../list/list';
import { ListOption } from '../list/list-model';
import styles from './auto-suggest.module.scss';

// Define the shape of the data object.
type SuggestMenuData = {
  focus: boolean;
  items: ListOption[];
};

// Extend the OverlayModel to include specific props for SuggestionsOverlay
interface SuggestionsOverlayModel extends OverlayModel<SuggestMenuData> {
  id?: string;
  onSelection: (option: ListOption[]) => void;
  size?: 'sm' | 'md' | 'lg';
  width?: number;
}

// Define the SuggestionsMenu component.
const SuggestionsMenu: React.FunctionComponent<SuggestionsOverlayModel> = ({
  onSelection,
  id,
  width,
  data,
  size,
  onClose,
}) => {
  // Define styles dynamically based on width prop.
  const style = useMemo(() => {
    return width ? { '--suggestions-width': `${width}px` } : null;
  }, [width]);

  // useRef to store a reference to the HTMLUListElement.
  const ref = useRef<HTMLUListElement>(null);

  // Focus or blur on the element depending on the 'focus' property in the data prop.
  useEffect(() => {
    if (data?.focus) {
      ref.current?.focus();
    } else {
      ref.current?.blur();
    }
  }, [data?.focus]);

  // a custom hook to close the dropdown when clicking outside.
  const { onRef } = useOnClickOutside(onClose);

  // Determine if the app is running in dark mode.
  const isDarkMode = useMemo(() => isDark(), []);

  // Calculate the classnames for the div wrapper.
  const suggestionsClass = classNames(styles.suggestions_wrapper, {
    [styles.dark]: isDarkMode,
  });

  // Render the List inside a div wrapper.
  return (
    <div
      className={suggestionsClass}
      style={style as CSSProperties}
      ref={onRef}
      data-testid="suggestions-wrapper"
    >
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

// Wrap the SuggestionsMenu with the withOverlay HOC.
const SuggestionsMenuOverlay = withOverlay<
  SuggestionsOverlayModel,
  SuggestMenuData
>(SuggestionsMenu, {
  backdropColor: 'transparent',
  disableAnimation: true,
  placement: 'bottom',
});

export { SuggestionsMenuOverlay };
