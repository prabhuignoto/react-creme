import { ReactNode } from 'react';

export type BreadCrumbProps = {
  focusable?: boolean;
  icon?: 'chevron' | 'arrow' | 'slash';
  links: string[];
  onSelected?: (selected?: string) => void;
  selectedCrumbIndex?: number;
  size?: 'sm' | 'md' | 'lg';
};

export type BreadCrumbItemProps = Pick<
  BreadCrumbProps,
  'icon' | 'selectedCrumbIndex' | 'size' | 'focusable'
> & {
  child: ReactNode;
  id: string;
  index: number;
  name: string;
  onSelected?: (id: string, index: number) => void;
  selected?: boolean;
  showChevron?: boolean;
};
