import { CSSProperties, ReactNode } from "react";

export interface TabsCommonModel {
  tabStyle?: "flat" | "rounded";
  border?: boolean;
  enableSwipe?: boolean;
  focusable?: boolean;
}
export interface TabHeadProps extends TabsCommonModel {
  id: string;
  name?: string;
  selected?: boolean;
  disabled?: boolean;
  handleTabSelection: (id: string) => void;
}

export interface TabsModel extends TabsCommonModel {
  children: ReactNode[];
  labels: string[];
  width?: number | string;
  style?: CSSProperties;
  disabledTabs?: string[];
}

export interface TabItemModel {
  name: string;
  id: string;
  selected?: boolean;
  disabled?: boolean;
  content?: ReactNode;
}

export interface TabHeadersModel extends TabsCommonModel {
  items: TabItemModel[];
  handleTabSelection: (id: string) => void;
}
