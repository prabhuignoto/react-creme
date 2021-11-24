import { CSSProperties, ReactNode } from "react";

export interface TabsCommonModel {
  tabStyle?: "flat" | "rounded";
  border?: boolean;
}
export interface TabHeadProps extends TabsCommonModel {
  id: string;
  name?: string;
  selected?: boolean;
  handleTabSelection: (id: string) => void;
}

export interface TabsModel extends TabsCommonModel {
  children: ReactNode[];
  labels: string[];
  width?: number | string;
  style?: CSSProperties;
}

export interface TabItemModel {
  name: string;
  id: string;
  selected?: boolean;
}

export interface TabHeadersModel extends TabsCommonModel {
  items: TabItemModel[];
  handleTabSelection: (id: string) => void;
}
