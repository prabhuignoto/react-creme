import { nanoid } from "nanoid";
import React, { startTransition, useCallback } from "react";
import { AccordionGroup, Input, List } from "../index";
import { ListOption } from "../list/list-model";
import { SidebarGroupModel, SidebarModel } from "./sidebar-model";
import "./sidebar.scss";

const Sidebar: React.FunctionComponent<SidebarModel> = ({
  groups,
  onSelect,
  enableSearch = true,
}) => {
  const [_groups, setGroups] = React.useState<SidebarGroupModel[]>(
    groups
      ? groups.map((item) => ({
          ...item,
          items: item.items.map((red) => ({
            ...red,
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
        setGroups((prev) =>
          prev.map((item) => ({
            ...item,
            items: item.items.map((item) => ({
              ...item,
              selected: item.id === option[0].id,
            })),
          }))
        );
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
      const term = ter.trim().toLowerCase();
      startTransition(() => {
        setGroups((prev) =>
          prev.map((group) => {
            const visible = group.items.some((item) =>
              item.name.toLowerCase().includes(term)
            );

            return {
              ...group,
              items: group.items.map((item) => ({
                ...item,
                visible: item.name.toLowerCase().includes(term),
              })),
              visible,
            };
          })
        );
      });
    },
    [groups.length]
  );

  return (
    <div className="rc-sidebar">
      <div className="rc-sidebar-search-wrapper">
        {enableSearch && (
          <Input type="text" enableClear onChange={handleSearch} />
        )}
      </div>
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
                options={items.map(({ name, selected, id, visible }) => ({
                  name,
                  value: name,
                  selected,
                  id,
                  visible,
                }))}
                borderLess
                rowGap={5}
                itemHeight={35}
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
