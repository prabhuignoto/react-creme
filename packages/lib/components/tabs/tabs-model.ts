import { CSSProperties, ReactNode } from 'react';

export interface TabsCommonProps {
  border?: boolean;
  focusable?: boolean;
  tabStyle?: 'flat' | 'rounded';
}
export interface TabHeadProps extends TabsCommonProps {
  disabled?: boolean;
  handleTabSelection: (id: string) => void;
  icon?: ReactNode;
  id: string;
  name?: string;
  selected?: boolean;
}

export interface TabsProps extends TabsCommonProps {
  children: ReactNode[];
  disabledTabs?: string[];
  icons?: ReactNode[];
  iconsColor?: string;
  labels: string[];
  style?: CSSProperties;
  width?: number | string;
}

export interface TabItemProps {
  content?: ReactNode;
  disabled?: boolean;
  id: string;
  name: string;
  selected?: boolean;
}

export interface TabHeadersProps extends TabsCommonProps {
  handleTabSelection: (id: string) => void;
  icons?: ReactNode[];
  items: TabItemProps[];
}
