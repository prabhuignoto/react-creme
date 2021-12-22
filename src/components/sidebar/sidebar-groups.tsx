import React, { CSSProperties, useMemo } from "react";
import { AccordionGroup } from "../accordion-group/accordion-group";
import { List } from "../list/list";
import { SidebarGroupsModel } from "./sidebar-model";
import "./sidebar.scss";

const SidebarGroups: React.FunctionComponent<SidebarGroupsModel> = ({
  groups,
  groupIconColor,
  groupTitleColor,
  listMaxHeight,
  focusable,
  onSelection,
  sideBarHeight,
}) => {
  const groupsWrapperStyle = useMemo(() => {
    return {
      height: `${sideBarHeight}px`,
    } as CSSProperties;
  }, [sideBarHeight]);

  return (
    <div className="rc-sidebar-groups-wrapper" style={groupsWrapperStyle}>
      <AccordionGroup
        titles={groups.filter((grp) => grp.visible).map((grp) => grp.title)}
        expanded
        autoClose={false}
        border={false}
        titleColor={groupTitleColor}
        iconColor={groupIconColor}
      >
        {groups
          .filter((grp) => grp.visible)
          .map(({ id, items }) => {
            return (
              <List
                key={id}
                options={items}
                border={false}
                rowGap={5}
                itemHeight={35}
                maxHeight={listMaxHeight}
                onSelection={(option) => onSelection(option, id)}
                noUniqueIds
                focusable={focusable}
                showCheckIcon={false}
                highlightSelection
                textColor={groupTitleColor}
                backGroundColor="transparent"
              ></List>
            );
          })}
      </AccordionGroup>
    </div>
  );
};

export { SidebarGroups };
