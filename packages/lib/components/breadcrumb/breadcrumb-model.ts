import React, { ReactNode } from 'react';

export interface BreadCrumbProps extends BreadCrumbCommonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export interface BreadCrumbItemProps extends BreadCrumbCommonProps {
  child: ReactNode;
  id: string;
  onClick?: () => void;
  showChevron?: boolean;
}

export interface BreadCrumbCommonProps {
  icon?: 'chevron' | 'arrow' | 'slash';
  size?: 'sm' | 'md' | 'lg';
}
