import { CSSProperties } from 'react';

export type Record = {
  [key: string]: string | number;
};

export interface DataGridColumn {
  align?: string;
  format?: string;
  formatter?: (value: string | number) => string | number;
  id?: string;
  name: string;
  sortOrder?: string;
  sortable?: boolean;
  type?: 'string' | 'number';
  width?: number;
}

export interface DataGridCell {
  border?: boolean;
  fixedHeight?: boolean;
  formatter?: (value: string | number) => string | number;
  name: string;
  value: string | number;
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
  style?: CSSProperties;
};

export type SortDirection = 'asc' | 'desc' | 'none';
