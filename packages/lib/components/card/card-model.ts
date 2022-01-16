import { ReactNode } from "react";

export interface CardModel {
  alignFooter?: "left" | "center" | "right";
  alignHeader?: "left" | "center" | "right";
  border?: boolean;
  children?: ReactNode | ReactNode[];
  footer?: ReactNode;
  header?: ReactNode;
  minHeight?: number;
  shadow?: boolean;
}
