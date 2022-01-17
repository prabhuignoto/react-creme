import { CSSProperties, ReactNode } from 'react';

// ⚙️ Internal props

/** 🟧 Common props
====================================*/

export interface TabsCommonProps {
  // enables border
  border?: boolean;

  // enables focus
  focusable?: boolean;

  // style of the tabs container
  tabStyle?: 'flat' | 'rounded';
}

/** 🟧 props passed to the tab header
=====================================**/

export interface TabHeadProps extends TabsCommonProps {
  // disables the tab head
  disabled?: boolean;

  // handler for tab selection
  handleTabSelection: (id: string) => void;

  // icon for the tab head
  icon?: ReactNode;

  // unique id
  id: string;

  // name of the tab head
  name?: string;

  // selected state of the tab head
  selected?: boolean;
}

/** 🟧 props passed to the tab item component
==============================================**/
export interface TabItemProps {
  content?: ReactNode;
  disabled?: boolean;
  id: string;
  name: string;
  selected?: boolean;
}

/** 🟧 props passed to the tabs header
==============================================**/
export interface TabHeadersProps extends TabsCommonProps {
  handleTabSelection: (id: string) => void;
  icons?: ReactNode[];
  items: TabItemProps[];
}

/** 🟧 props passed to the tabs panel
==============================================**/

export interface TabPanelProps {
  children?: React.ReactNode;
  disabled?: boolean;
  id?: string;
}

/*✨ Component props
==============================================**/

export interface TabsProps extends TabsCommonProps {
  // active tab
  activeTab?: string;

  // children items that are rendered inside the tab panels
  children: ReactNode[];

  // array of tabs that needs to be disabled
  disabledTabs?: string[];

  // custom icons for tabs: { [key: string]: ReactNode };
  icons?: ReactNode[];

  // custom icon color
  iconsColor?: string;

  // labels for the tabs
  labels: string[];

  // custom style that will be applied to the tab container
  style?: CSSProperties;

  // width of the tabs
  width?: number | string;
}
