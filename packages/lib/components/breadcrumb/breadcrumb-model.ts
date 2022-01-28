import React, { ReactNode } from 'react';

export interface BreadCrumbProps extends BreadCrumbCommonProps {
  children: React.ReactNode;
  onSelected?: (selectedIndex?: string) => void;
  selectedCrumbIndex?: number;
}

export interface BreadCrumbItemProps extends BreadCrumbCommonProps {
  child: ReactNode;
  id: string;
  index: number;
  onSelected?: (id: string, index: number) => void;
  selected?: boolean;
  showChevron?: boolean;
}

export interface BreadCrumbCommonProps {
  icon?: 'chevron' | 'arrow' | 'slash';
  size?: 'sm' | 'md' | 'lg';
}
