import classNames from 'classnames';
import React, { CSSProperties, useCallback, useEffect, useMemo } from 'react';
import useClickOutside from '../common/effects/useOnClickOutside';
import { List } from '../list/list';
import styles from './dropdown-menu.module.scss';
import { DropdownMenuProps } from './dropdown-model';

const DropDownMenu: React.FunctionComponent<DropdownMenuProps> = ({
  allowMultiSelection,
  enableSearch,
  handleSelection,
  isClosing,
  onClosing,
  open,
  options,
  style: { width, maxMenuHeight },
  virtualize,
  RTL,
  focusable,
  selectedIndex,
  onClose,
}: DropdownMenuProps) => {
  // STYLES
  const menuStyle = useMemo(() => {
    return {
      '--menu-max-height': `${maxMenuHeight || 0}px`,
      '--menu-width': `${width || 0}px`,
    } as CSSProperties;
  }, [top, width]);

  const menuClass = useMemo(
    () =>
      classNames([
        styles.dropdown_menu_container,
        {
          [styles.dropdown_menu_close]: !open || isClosing,
          [styles.dropdown_menu_open]: open && !isClosing,
        },
      ]),
    [open, isClosing]
  );

  useEffect(() => {
    if (isClosing) {
      onClosing?.();
    }
  }, [isClosing]);

  const handleClose = useCallback(() => open && onClose?.(), [open]);

  const { onRef } = useClickOutside(handleClose);

  return (
    <div className={menuClass} style={menuStyle} ref={onRef}>
      <List
        options={options}
        onSelection={handleSelection}
        allowMultiSelection={allowMultiSelection}
        border={false}
        enableSearch={enableSearch}
        maxHeight={maxMenuHeight}
        virtualized={virtualize}
        RTL={RTL}
        focusable={focusable}
        selectedIndex={selectedIndex}
        backGroundColor="transparent"
      />
    </div>
  );
};

DropDownMenu.displayName = 'DropDownMenu';

export { DropDownMenu };
