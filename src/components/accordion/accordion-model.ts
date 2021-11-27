import { ReactNode } from "react";

export interface AccordionModel {
  alignIconRight?: boolean;
  children?: ReactNode;
  controlledState?: boolean | null;
  id?: string;
  noBorder?: boolean;
  onCollapsed?: (id: string) => void;
  onExpanded?: (id: string) => void;
  title?: string;
  transition?: string;
  focusable?: boolean;
  iconType?: "chevron" | "plus";
}

export interface AccordionGroupProps {
  children: ReactNode[];
  titles?: string[];
  autoClose?: boolean;
  initialState?: "open" | "close";
  alignIconRight?: boolean;
  border?: boolean;
  iconType?: "chevron" | "plus";
}

export interface AccordionItemProps {
  id?: string;
  expanded?: boolean;
  focusable?: boolean;
}
