import classNames from "classnames";
import { nanoid } from "nanoid";
import React, { useCallback, useMemo } from "react";
import { SearchIcon } from "../../icons";
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
        "rc-sidebar-border": border,
      }),
    [border]
  );

  return (
    <div className={sideBarClass}>
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
      <AccordionGroup
        titles={_groups.filter((grp) => grp.visible).map((grp) => grp.title)}
        initialState="open"
        autoClose={false}
        border={false}
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
              ></List>
            );
          })}
      </AccordionGroup>
    </div>
  );
};

export { Sidebar };
