import { ReactNode } from "react";

export interface ScrollPaneModel {
  width?: number;
  height?: number;
  children: ReactNode | ReactNode[];
  scrollBarWidth?: number;
}
