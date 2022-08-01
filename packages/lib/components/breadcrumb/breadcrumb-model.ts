import { ReactNode } from 'react';

export type BreadCrumbProps = {
  RTL?: boolean;
  children?: ReactNode | ReactNode[];
  focusable?: boolean;
  icon?: 'chevron' | 'arrow' | 'slash';
  links: string[];
  onSelected?: (selected?: string) => void;
  selectedCrumbIndex?: number;
  size?: 'sm' | 'md' | 'lg';
};

export type BreadCrumbItemProps = Pick<
  BreadCrumbProps,
  'icon' | 'selectedCrumbIndex' | 'size' | 'focusable' | 'RTL'
> & {
  child: ReactNode;
  id: string;
  index: number;
  name: string;
  onSelected?: (id: string, name: string) => void;
  selected?: boolean;
  showChevron?: boolean;
};
