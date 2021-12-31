import classNames from "classnames";
import { nanoid } from "nanoid";
import React, { CSSProperties, useCallback, useMemo, useRef } from "react";
import { ChevronRightIcon, SearchIcon } from "../../icons";
import { isArray } from "../common/utils";
import { Input } from "../index";
import { ListOption } from "../list/list-model";
import { SidebarGroups } from "./sidebar-groups";
import { SidebarGroupModel, SidebarModel } from "./sidebar-model";
import "./sidebar.scss";

const Sidebar: React.FunctionComponent<SidebarModel> = ({
  backGroundColor = "#fff",
  border = false,
  enableSearch = false,
  focusable = false,
  groupIconColor = "#000",
  groupTitleColor = "#000",
  groups,
  height = "100%",
  listMaxHeight = 750,
  minimizeSidebar = false,
  onSelect,
  searchPlaceholder = "Search ...",
  sectionsCollapsible = true,
}) => {
  const [_groups, setGroups] = React.useState<SidebarGroupModel[]>(
    isArray(groups)
      ? groups.map((item) => ({
          ...item,
          items: item.items.map((obj) => ({
            ...obj,
            id: nanoid(),
            selected: false,
          })),
          id: nanoid(),
          visible: true,
        }))
      : []
  );

  const [minimize, setMinimize] = React.useState(false);
  const [sidebarHeight, setSidebarHeight] = React.useState(0);

  const ref = useRef<HTMLDivElement | null>(null);

  const handleSelection = useCallback(
    (option: ListOption[], groupId?: string) => {
      if (option && groupId) {
        setGroups((prev) => {
          return prev.map((item) => ({
            ...item,
            items: item.items.map((item) => ({
              ...item,
              selected: item.id === option[0].id,
            })),
          }));
        });
        const grp = _groups.find((grp) => grp.id === groupId);

        if (grp) {
          onSelect?.(grp, option[0]);
        }
      }
    },
    []
  );

  const handleSearch = useCallback(
    (ter: string) => {
      const tester = new RegExp(`\\b${ter.trim()}`, "i");

      setGroups((prev) =>
        prev.map((group) => {
          const visible = group.items.some((item) => tester.test(item.name));

          return {
            ...group,
            items: group.items.map((item) => ({
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
      classNames("rc-sidebar", {
        "rc-sidebar-minimize": minimizeSidebar,
      }),
    [minimizeSidebar]
  );

  const handleMinimize = useCallback(() => setMinimize((prev) => !prev), []);
  const style = useMemo(() => {
    return {
      "--bg-color": backGroundColor,
      "--sidebar-height": Number.isInteger(height) ? `${height}px` : "height",
    } as CSSProperties;
  }, []);

  const contentWrapper = useMemo(() => {
    return classNames("rc-sidebar-content-wrapper", {
      "rc-sidebar-minimize": minimizeSidebar,
      "rc-sidebar-hide": minimize,
      "rc-sidebar-open": !minimize,
      "rc-sidebar-border": border || minimizeSidebar,
    });
  }, [minimize, minimizeSidebar, border]);

  const minimizeButton = useMemo(() => {
    return classNames("rc-sidebar-minimize-btn", {
      "rc-sidebar-minimize-btn-open": !minimize,
      "rc-sidebar-minimize-btn-close": minimize,
    });
  }, [minimize]);

  const onRef = useCallback((node) => {
    if (node) {
      ref.current = node;
      setSidebarHeight(node.clientHeight - 40 * 2);
    }
  }, []);

  return (
    <div className={sideBarClass} style={style} ref={onRef}>
      {minimizeSidebar && (
        <span className={minimizeButton} onClick={handleMinimize}>
          <ChevronRightIcon />
        </span>
      )}
      <div className={contentWrapper}>
        {enableSearch && (
          <div className="rc-sidebar-search-wrapper">
            <Input
              type="text"
              enableClear
              onChange={handleSearch}
              placeholder={searchPlaceholder}
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
        />
      </div>
    </div>
  );
};

export { Sidebar };
