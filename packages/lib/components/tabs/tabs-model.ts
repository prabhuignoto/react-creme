import { CSSProperties, ReactNode } from "react";

export interface TabsCommonModel {
  border?: boolean;
  focusable?: boolean;
  tabStyle?: "flat" | "rounded";
}
export interface TabHeadProps extends TabsCommonModel {
  disabled?: boolean;
  handleTabSelection: (id: string) => void;
  icon?: ReactNode;
  id: string;
  name?: string;
  selected?: boolean;
}

export interface TabsModel extends TabsCommonModel {
  children: ReactNode[];
  disabledTabs?: string[];
  icons?: ReactNode[];
  iconsColor?: string;
  labels: string[];
  style?: CSSProperties;
  width?: number | string;
}

export interface TabItemModel {
  content?: ReactNode;
  disabled?: boolean;
  id: string;
  name: string;
  selected?: boolean;
}

export interface TabHeadersModel extends TabsCommonModel {
  handleTabSelection: (id: string) => void;
  icons?: ReactNode[];
  items: TabItemModel[];
}
