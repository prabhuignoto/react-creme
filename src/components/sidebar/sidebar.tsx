import { nanoid } from "nanoid";
import React, { startTransition, useCallback } from "react";
import { AccordionGroup, List } from "../index";
import { ListOption } from "../list/list-model";
import { SidebarGroupModel, SidebarModel } from "./sidebar-model";
import "./sidebar.scss";

const Sidebar: React.FunctionComponent<SidebarModel> = ({
  groups,
  onSelect,
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
        }))
      : []
  );

  const handleSelection = useCallback(
    (option: ListOption[], groupId?: string) => {
      if (option && groupId) {
        startTransition(() => {
          setGroups((prev) =>
            prev.map((item) => ({
              ...item,
              items: item.items.map((item) => ({
                ...item,
                selected: item.id === option[0].id,
              })),
            }))
          );
        });
        const grp = _groups.find((grp) => grp.id === groupId);

        if (grp) {
          onSelect?.(grp, option[0]);
        }
      }
    },
    []
  );

  return (
    <div className="rc-sidebar">
      <AccordionGroup
        titles={groups.map((grp) => grp.title)}
        initialState="open"
        autoClose={false}
      >
        {_groups.map(({ id, items }) => {
          return (
            <List
              key={id}
              options={items.map(({ name, selected, id }) => ({
                name,
                value: name,
                selected,
                id,
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
