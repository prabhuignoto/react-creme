import { CSSProperties, ReactElement, ReactNode } from 'react';

// ⚙️ Internal props

/** 🟧 props passed to the tab header
=====================================**/

export type TabHeadProps = Pick<
  TabsProps,
  'focusable' | 'tabStyle' | 'size'
> & {
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

  onFocus?: () => void;

  parentHasFocus?: boolean;

  // selected state of the tab head
  selected?: boolean;
};

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
export type TabHeadersProps = Pick<
  TabsProps,
  'focusable' | 'tabStyle' | 'size'
> & {
  activeTabId: string;
  handleTabSelection: (id: string) => void;
  icons?: ReactNode[];
  items: TabItemProps[];
};

/** 🟧 props passed to the tabs panel
==============================================**/

export interface TabPanelProps {
  children?: React.ReactNode;
  disabled?: boolean;
  id?: string;
}

/*✨ Component props
==============================================**/

export interface TabsProps {
  // active tab
  activeTab?: string;

  // enables border
  border?: boolean;

  // children items that are rendered inside the tab panels
  children: ReactNode[];

  // array of tabs that needs to be disabled
  disabledTabs?: string[];

  // enables focus
  focusable?: boolean;

  // custom icons for tabs: { [key: string]: ReactNode };
  icons?: ReactNode[] | ReactElement[];

  // custom icon color
  iconsColor?: string;

  // labels for the tabs
  labels: string[];

  minHeight?: number;

  size?: 'sm' | 'md' | 'lg';

  // custom style that will be applied to the tab container
  style?: CSSProperties;

  // style of the tabs container
  tabStyle?: 'flat' | 'rounded';

  // width of the tabs
  width?: number | string;
}
