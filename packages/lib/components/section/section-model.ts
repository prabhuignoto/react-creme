import React from 'react';

export interface SectionProps {
  RTL?: boolean;
  children: React.ReactNode | React.ReactNode[];
  height?: number;
  layout?: 'row' | 'column';
  noPadding?: boolean;
  size?: 'sm' | 'md' | 'lg';
  title?: string;
}
