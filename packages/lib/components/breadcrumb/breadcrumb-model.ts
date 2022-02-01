import React, { ReactNode } from 'react';

export type BreadCrumbProps = {
  children: React.ReactNode;
  focusable?: boolean;
  icon?: 'chevron' | 'arrow' | 'slash';
  onSelected?: (selectedIndex?: string) => void;
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
  onSelected?: (id: string, index: number) => void;
  selected?: boolean;
  showChevron?: boolean;
};
