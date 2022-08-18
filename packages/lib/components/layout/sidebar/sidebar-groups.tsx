import React, { CSSProperties, useMemo } from 'react';
import { AccordionGroup } from '@core';
import { List } from '@data';
import { SidebarGroupsModel } from './sidebar-model';
import styles from './sidebar.module.scss';

const SidebarGroups: React.FunctionComponent<SidebarGroupsModel> = ({
  groups,
  groupIconColor,
  groupTitleColor,
  listMaxHeight,
  focusable,
  onSelection,
  sideBarHeight,
  sectionsCollapsible,
  icons,
  enableSearch,
}) => {
  const groupsWrapperStyle = useMemo(() => {
    return {
      height: `${sideBarHeight}px`,
    } as CSSProperties;
  }, [sideBarHeight]);

  return (
    <div className={styles.groups_wrapper} style={groupsWrapperStyle}>
      <AccordionGroup
        titles={groups.filter(grp => grp.visible).map(grp => grp.title)}
        expanded
        autoClose={false}
        border={false}
        titleColor={groupTitleColor}
        iconColor={groupIconColor}
        isTitleBold
        disableCollapse={!sectionsCollapsible}
        icons={icons}
        fullWidth
        colorizeHeader
        headerHeight={45}
      >
        {groups
          .filter(grp => grp.visible)
          .map(({ id, items, title }) => {
            return (
              <List
                key={id}
                options={items}
                border={false}
                rowGap={5}
                itemHeight={35}
                maxHeight={listMaxHeight}
                onSelection={option => onSelection(option, id)}
                noUniqueIds
                focusable={focusable}
                showCheckIcon={false}
                highlightSelection
                textColor="#000"
                backGroundColor="transparent"
                label={title}
                enableSearch={enableSearch}
              ></List>
            );
          })}
      </AccordionGroup>
    </div>
  );
};

SidebarGroups.displayName = 'SidebarGroups';

export { SidebarGroups };
