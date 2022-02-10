import { ReactNode } from 'react';

export type AccordionProps = {
  alignIconRight?: boolean;
  autoSetBodyHeight?: boolean;
  border?: boolean;
  children?: ReactNode;
  customContent?: React.ReactNode;
  customIcon?: ReactNode;
  disableCollapse?: boolean;
  disableIcon?: boolean;
  expanded?: boolean | null;
  focusable?: boolean;
  iconColor?: string;
  iconType?: 'chevron' | 'plus';
  id?: string;
  isTitleBold?: boolean;
  maxHeight?: number;
  onChange?: (open: boolean) => void;
  onCollapsed?: (id: string) => void;
  onExpanded?: (id: string) => void;
  onRendered?: () => void;
  selected?: boolean;
  title?: string;
  titleColor?: string;
  transition?: string;
};

export type AccordionGroupProps = Pick<
  AccordionProps,
  | 'disableCollapse'
  | 'alignIconRight'
  | 'iconColor'
  | 'titleColor'
  | 'isTitleBold'
  | 'focusable'
> & {
  autoClose?: boolean;
  border?: boolean;
  children?: ReactNode[];
  disableIcon?: boolean;
  expanded?: boolean;
  iconType?: 'chevron' | 'plus';
  icons?: React.ReactNode[];
  titles?: string[];
};

export interface AccordionItemProps {
  expanded?: boolean;
  focusable?: boolean;
  id?: string;
}

export type AccordionHeaderProps = Pick<
  AccordionProps,
  | 'disableIcon'
  | 'focusable'
  | 'alignIconRight'
  | 'disableCollapse'
  | 'iconType'
  | 'iconColor'
  | 'title'
  | 'customIcon'
  | 'isTitleBold'
  | 'selected'
  | 'customContent'
> & {
  accordionBodyId?: string;
  accordionId?: string;
  onToggle?: () => void;
  open?: boolean | null;
};
