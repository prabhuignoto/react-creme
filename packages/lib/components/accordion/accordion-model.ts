import { ReactNode } from 'react';

export interface AccordionModel extends AccordionCommon {
  alignIconRight?: boolean;
  border?: boolean;
  children?: ReactNode;
  expanded?: boolean | null;
  id?: string;
  onCollapsed?: (id: string) => void;
  onExpanded?: (id: string) => void;
  transition?: string;
}

export interface AccordionGroupProps extends AccordionCommon {
  autoClose?: boolean;
  border?: boolean;
  children: ReactNode[];
  expanded?: boolean;
  iconType?: 'chevron' | 'plus';
  titles?: string[];
}

export interface AccordionItemProps {
  expanded?: boolean;
  focusable?: boolean;
  id?: string;
}

export interface AccordionHeaderProps extends AccordionCommon {
  accordionBodyId?: string;
  accordionId?: string;
  onToggle?: () => void;
  open?: boolean | null;
}

export interface AccordionCommon {
  alignIconRight?: boolean;
  customIcon?: ReactNode;
  disableCollapse?: boolean;
  disableIcon?: boolean;
  focusable?: boolean;
  iconColor?: string;
  iconType?: 'chevron' | 'plus';
  isTitleBold?: boolean;
  title?: string;
  titleColor?: string;
}
