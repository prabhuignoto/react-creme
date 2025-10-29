import { SearchIcon } from '@icons';
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, { CSSProperties, useCallback, useMemo, useRef } from 'react';
import { isArray, isDark } from '../common/utils';
import { Input } from '../input/input';
import { ListOption } from '../list/list-model';
import { SidebarGroups } from './sidebar-groups';
import { SidebarGroupModel, SidebarProps } from './sidebar-model';
import styles from './sidebar.module.scss';

const Sidebar: React.FunctionComponent<SidebarProps> = ({
  border = false,
  enableSearch = false,
  focusable = true,
  groupIconColor,
  groupTitleColor,
  groups,
  height = '100%',
  listMaxHeight = 750,
  onSelect,
  searchPlaceholder = 'Search ...',
  sectionsCollapsible = true,
  icons,
}) => {
  const [_groups, setGroups] = React.useState<SidebarGroupModel[]>(
    isArray(groups)
      ? groups.map(item => ({
          ...item,
          id: nanoid(),
          items: item.items.map(obj => ({
            ...obj,
            id: nanoid(),
            selected: false,
          })),
          visible: true,
        }))
      : []
  );

  const [sidebarHeight, setSidebarHeight] = React.useState(0);

  const ref = useRef<HTMLDivElement | null>(null);

  const isDarkMode = useMemo(() => isDark(), []);

  const handleSelection = useCallback(
    (option: ListOption[], groupId?: string) => {
      if (option && groupId) {
        setGroups(prev => {
          return prev.map(item => ({
            ...item,
            items: item.items.map(item => ({
              ...item,
              selected: item.id === option?.[0]?.id,
            })),
          }));
        });
        const grp = _groups.find(grp => grp.id === groupId);
        const selectedOption = option?.[0];

        if (grp && selectedOption) {
          onSelect?.(grp, selectedOption);
        }
      }
    },
    []
  );

  const handleSearch = useCallback(
    (ter: string) => {
      const tester = new RegExp(`\\b${ter.trim()}`, 'i');

      setGroups(prev =>
        prev.map(group => {
          const visible = group.items.some(item => tester.test(item.name));

          return {
            ...group,
            items: group.items.map(item => ({
              ...item,
              visible: tester.test(item.name),
            })),
            visible,
          };
        })
      );
    },
    [groups.length]
  );

  const sideBarClass = useMemo(
    () =>
      classNames(styles.sidebar, {
        [styles.dark]: isDarkMode,
      }),
    [isDarkMode]
  );

  const style = useMemo(() => {
    return {
      '--sidebar-height': Number.isInteger(height) ? `${height}px` : height,
    } as CSSProperties;
  }, []);

  const contentWrapper = useMemo(() => {
    return classNames(styles.content_wrapper, {
      [styles.border]: border,
    });
  }, [border]);

  const onRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      ref.current = node;
      setSidebarHeight(
        node.clientHeight ? node.clientHeight : window.innerHeight
      );
    }
  }, []);

  return (
    <div className={sideBarClass} style={style} ref={onRef}>
      <div className={contentWrapper}>
        {enableSearch && (
          <div className={styles.search_wrapper}>
            <Input
              type="text"
              enableClear
              onChange={handleSearch}
              placeholder={searchPlaceholder}
              controlled
              focusable={focusable}
            >
              <SearchIcon />
            </Input>
          </div>
        )}
        <SidebarGroups
          groups={_groups}
          focusable={focusable}
          onSelection={handleSelection}
          groupIconColor={groupIconColor}
          groupTitleColor={groupTitleColor}
          sideBarHeight={sidebarHeight}
          listMaxHeight={listMaxHeight}
          sectionsCollapsible={sectionsCollapsible}
          icons={icons}
          enableSearch={enableSearch}
        />
      </div>
    </div>
  );
};

Sidebar.displayName = 'Sidebar';

export { Sidebar };
