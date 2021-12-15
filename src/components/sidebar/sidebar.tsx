import classNames from "classnames";
import { nanoid } from "nanoid";
import React, { CSSProperties, useCallback, useMemo, useRef } from "react";
import { ChevronRightIcon, SearchIcon } from "../../icons";
import { isArray } from "../common/utils";
import { AccordionGroup, Input, List } from "../index";
import { ListOption } from "../list/list-model";
import { SidebarGroupModel, SidebarModel } from "./sidebar-model";
import "./sidebar.scss";

const Sidebar: React.FunctionComponent<SidebarModel> = ({
  groups,
  onSelect,
  enableSearch = false,
  searchPlaceholder = "Search ...",
  border = false,
  listMaxHeight = 750,
  minimizeSidebar = false,
  groupIconColor = "#000",
  groupTitleColor = "#000",
  backGroundColor = "#fff",
  height = "100%",
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

  const ref = useRef<HTMLDivElement | null>(null);
  const [sidebarHeight, setSidebarHeight] = React.useState(0);

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

  const groupsWrapperStyle = useMemo(() => {
    return {
      height: `${sidebarHeight}px`,
    } as CSSProperties;
  }, [sidebarHeight]);

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
        <div className="rc-sidebar-groups-wrapper" style={groupsWrapperStyle}>
          <AccordionGroup
            titles={_groups
              .filter((grp) => grp.visible)
              .map((grp) => grp.title)}
            expanded
            autoClose={false}
            border={false}
            titleColor={groupTitleColor}
            iconColor={groupIconColor}
          >
            {_groups
              .filter((grp) => grp.visible)
              .map(({ id, items }) => {
                return (
                  <List
                    key={id}
                    options={items}
                    borderLess
                    rowGap={5}
                    itemHeight={35}
                    maxHeight={listMaxHeight}
                    onSelection={(option) => handleSelection(option, id)}
                    noUniqueIds
                    focusable
                    showCheckIcon={false}
                    highlightSelection
                    textColor={groupTitleColor}
                    backGroundColor="transparent"
                  ></List>
                );
              })}
          </AccordionGroup>
        </div>
      </div>
    </div>
  );
};

export { Sidebar };
