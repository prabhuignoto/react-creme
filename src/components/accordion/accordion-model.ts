import { ReactNode } from "react";

export interface AccordionModel extends AccordionCommon {
  alignIconRight?: boolean;
  children?: ReactNode;
  expanded?: boolean | null;
  id?: string;
  noBorder?: boolean;
  onCollapsed?: (id: string) => void;
  onExpanded?: (id: string) => void;
  title?: string;
  transition?: string;
  focusable?: boolean;
  iconType?: "chevron" | "plus";
  disableIcon?: boolean;
  customIcon?: ReactNode;
}

export interface AccordionGroupProps extends AccordionCommon {
  children: ReactNode[];
  titles?: string[];
  autoClose?: boolean;
  expanded?: boolean;
  alignIconRight?: boolean;
  border?: boolean;
  iconType?: "chevron" | "plus";
}

export interface AccordionItemProps {
  id?: string;
  expanded?: boolean;
  focusable?: boolean;
}

export interface AccordionCommon {
  titleColor?: string;
  iconColor?: string;
  titleBold?: boolean;
  disableCollapse?: boolean;
}
