import { CSSProperties, ReactNode } from 'react';

export type Record = {
  [key: string]: string | number | undefined;
  id?: string;
};

export interface DataGridColumn {
  align?: 'left' | 'center' | 'right';
  format?: string;
  formatter?: (value: string | number) => string | number | ReactNode;
  id?: string;
  name: string;
  searchable?: boolean;
  sortDirection?: SortDirection;
  sortOrder?: string;
  sortable?: boolean;
  type?: 'string' | 'number' | 'date' | 'boolean';
  width?: number;
}

export interface DataGridCell {
  border?: boolean;
  fixedHeight?: boolean;
  formatter?: (value: string | number) => string | number | ReactNode;
  isHeader?: boolean;
  name: string;
  value: string | number;
  zebra?: boolean;
}

export type DataRow = Pick<
  DataGridProps,
  'zebra' | 'layoutStyle' | 'border' | 'fixedHeight' | 'rowHeight' | 'size'
> & {
  columnConfigs?: DataGridColumn[];
  columnWidth?: number;
  data: Record;
  id?: string;
  style?: CSSProperties;
};

export interface DataGridModel {
  rows: DataRow[];
}

export interface DataGridProps {
  border?: boolean;
  columns?: DataGridColumn[];
  data: Record[];
  fixedHeight?: boolean;
  gridWidth?: number;
  layoutStyle?: 'compact' | 'comfortable';
  rowHeight?: number;
  size?: 'sm' | 'md' | 'lg';
  zebra?: boolean;
}

export type DataGridHeaderProps = Pick<
  DataGridProps,
  'border' | 'columns' | 'layoutStyle' | 'size'
> & {
  columnWidth?: number;
  onSort?: (column: string, dir: SortDirection) => void;
  searchable?: boolean;
  style?: CSSProperties;
};

export type SortDirection = 'asc' | 'desc' | 'none';
