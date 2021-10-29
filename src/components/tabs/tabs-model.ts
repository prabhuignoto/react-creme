import { ReactNode } from "react";

export interface TabHeadProps {
  id: string;
  name?: string;
  selected?: boolean;
  handleTabSelection: (id: string) => void;
}

export interface TabsModel {
  children: ReactNode[];
  labels: string[];
  width?: number;
}

export interface TabItemModel {
  name: string;
  id: string;
  selected?: boolean;
}
