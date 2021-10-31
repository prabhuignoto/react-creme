import { ReactNode } from "react";

export interface AccordionModel {
  title?: string;
  children?: ReactNode;
  noBorder?: boolean;
  onExpanded?: (id: string) => void;
  onCollapsed?: (id: string) => void;
  id?: string;
  controlledState?: boolean | null;
  transition?: string;
}

export interface AccordionGroupProps {
  children: ReactNode[];
  titles?: string[];
  autoClose?: boolean;
}

export interface AccordionItemProps {
  id?: string;
  expanded?: boolean;
}
