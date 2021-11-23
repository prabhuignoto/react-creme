import { ReactNode } from "react";

export interface TabHeadProps extends TabsCommonModel {
  id: string;
  name?: string;
  selected?: boolean;
  handleTabSelection: (id: string) => void;
}

export interface TabsModel extends TabsCommonModel {
  children: ReactNode[];
  labels: string[];
  width?: number;
}

export interface TabItemModel {
  name: string;
  id: string;
  selected?: boolean;
}

export interface TabsCommonModel {
  tabStyle?: "flat" | "rounded";
  border?: boolean;
}
