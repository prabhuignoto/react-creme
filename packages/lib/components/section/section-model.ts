import React from 'react';

export interface SectionProps {
  RTL?: boolean;
  background?: boolean;
  border?: boolean;
  children: React.ReactNode | React.ReactNode[];
  hashPrefix?: string;
  height?: number;
  layout?: 'row' | 'column';
  noPadding?: boolean;
  size?: 'sm' | 'md' | 'lg';
  title?: string;
  useHash?: boolean;
  /** Optional footer element to display at the bottom (e.g., Show Code toggle) */
  footer?: React.ReactNode;
}
