import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, {
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { Menu } from '..';
import { isDark } from '../common/utils';
import { MenuBarProps } from './menu-bar.model';
import styles from './menu-bar.module.scss';

const MenuBar: FunctionComponent<MenuBarProps> = ({
  items,
  RTL = false,
  onSelect,
  noUniqueId = false,
}) => {
  const menuBarClass = useMemo(
    () =>
      classNames(
        styles.wrapper,
        RTL ? styles.right_aligned : styles.left_aligned
      ),
    []
  );

  const isDarkMode = useMemo(() => isDark(), []);

  const [_items, setItems] = useState(
    items.map(item => ({
      ...item,
      active: false,
      id: noUniqueId ? item.id : nanoid(),
    }))
  );

  const handleOnOpen = useCallback((id?: string) => {
    setItems(prev =>
      prev.map(item => ({
        ...item,
        active: item.id === id,
      }))
    );
  }, []);

  const handleSelection = useCallback(
    (parentId?: string, parentName?: string, child?: string) => {
      onSelect?.({
        id: parentId,
        path: parentName + '/' + child,
      });
    },
    []
  );

  return (
    <ul className={menuBarClass}>
      {_items.map(item => (
        <Menu
          items={item.items}
          dockPosition="left"
          key={item.id}
          hideArrow
          gutter={6}
          onOpen={() => handleOnOpen(item.id)}
          onSelected={name => handleSelection(item.id, item.name, name)}
        >
          <li
            className={classNames(styles.item, isDarkMode && styles.dark, {
              [styles.active]: item.active,
            })}
          >
            <span>{item.name}</span>
          </li>
        </Menu>
      ))}
    </ul>
  );
};

export { MenuBar };
