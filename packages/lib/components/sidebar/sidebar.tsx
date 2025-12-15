import { SearchIcon } from '@icons';
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, {
  CSSProperties,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
  const [_groups, setGroups] = useState<SidebarGroupModel[]>(
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

  const isDarkMode = useMemo(() => isDark(), []);

  const handleSelection = useCallback(
    (option: ListOption[], groupId?: string) => {
      if (option && groupId) {
        let updatedGroup: SidebarGroupModel | undefined;

        setGroups(prev => {
          const updated = prev.map(item => ({
            ...item,
            items: item.items.map(item => ({
              ...item,
              selected: item.id === option?.[0]?.id,
            })),
          }));

          updatedGroup = updated.find(grp => grp.id === groupId);
          return updated;
        });

        const selectedOption = option?.[0];

        if (updatedGroup && selectedOption) {
          onSelectRef.current?.(updatedGroup, selectedOption);
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
    [groups?.length]
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
  }, [height]);

  const contentWrapper = useMemo(() => {
    return classNames(styles.content_wrapper, {
      [styles.border]: border,
    });
  }, [border]);

  const onSelectRef = useRef(onSelect);
  useLayoutEffect(() => {
    onSelectRef.current = onSelect;
  });

  return (
    <div className={sideBarClass} style={style}>
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
