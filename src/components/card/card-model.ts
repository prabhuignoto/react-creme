import { ReactNode } from "react";

export interface CardModel {
  header?: ReactNode;
  footer?: ReactNode;
  minHeight?: number;
  maxHeight?: number;
  borderLess?: boolean;
  alignHeader?: "left" | "center" | "right";
  alignFooter?: "left" | "center" | "right";
  children?: ReactNode | ReactNode[];
  shadow?: boolean;
}
