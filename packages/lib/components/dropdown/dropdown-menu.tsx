import classNames from 'classnames';
import React, { CSSProperties, memo, useEffect, useMemo } from 'react';
import { List } from '../list/list';
import './dropdown-menu.scss';
import { DropdownMenuProps } from './dropdown-model';

const DropDownMenu: React.FunctionComponent<DropdownMenuProps> = memo(
  ({
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
          'rc-dropdown-menu-container',
          {
            'rc-dropdown-menu-close': !open || isClosing,
            'rc-dropdown-menu-open': open && !isClosing,
          },
        ]),
      [open, isClosing]
    );

    useEffect(() => {
      if (isClosing) {
        onClosing?.();
      }
    }, [isClosing]);

    return (
      <div className={menuClass} style={menuStyle}>
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
        />
      </div>
    );
  },
  (prev, next) => prev.isClosing === next.isClosing && prev.open === next.open
);

DropDownMenu.displayName = 'DropDownMenu';

export { DropDownMenu };
