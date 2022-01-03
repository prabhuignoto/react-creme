import { ReactNode } from "react";

export interface AccordionModel extends AccordionCommon {
  alignIconRight?: boolean;
  children?: ReactNode;
  expanded?: boolean | null;
  id?: string;
  noBorder?: boolean;
  onCollapsed?: (id: string) => void;
  onExpanded?: (id: string) => void;
  transition?: string;
}

export interface AccordionGroupProps extends AccordionCommon {
  children: ReactNode[];
  titles?: string[];
  autoClose?: boolean;
  expanded?: boolean;
  border?: boolean;
  iconType?: "chevron" | "plus";
}

export interface AccordionItemProps {
  id?: string;
  expanded?: boolean;
  focusable?: boolean;
}

export interface AccordionHeaderProps extends AccordionCommon {
  accordionBodyId?: string;
  accordionId?: string;
  onToggle?: () => void;
  open?: boolean | null;
}

export interface AccordionCommon {
  alignIconRight?: boolean;
  disableCollapse?: boolean;
  customIcon?: ReactNode;
  disableIcon?: boolean;
  iconType?: "chevron" | "plus";
  focusable?: boolean;
  iconColor?: string;
  isTitleBold?: boolean;
  title?: string;
  titleColor?: string;
}
