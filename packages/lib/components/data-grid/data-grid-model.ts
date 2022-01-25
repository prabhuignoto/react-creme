import { CSSProperties } from 'react';

export type Record = {
  [key: string]: string | number;
};

export interface DataGridCommon {
  border?: boolean;
  fixedHeight?: boolean;
  layoutStyle?: 'compact' | 'comfortable';
  rowHeight?: number;
  zebra?: boolean;
}

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

export interface DataRow extends DataGridCommon {
  columnConfigs?: DataGridColumn[];
  columnWidth?: number;
  data: Record;
  id?: string;
  style?: CSSProperties;
}

export interface DataGridModel {
  rows: DataRow[];
}

export interface DataGridProps extends DataGridCommon {
  columns?: DataGridColumn[];
  data: Record[];
  gridWidth?: number;
}

export interface DataGridHeaderProps extends DataGridCommon {
  border?: boolean;
  columnWidth?: number;
  columns: DataGridColumn[];
  onSort?: (column: string, dir: SortDirection) => void;
  style?: CSSProperties;
}

export type SortDirection = 'asc' | 'desc' | 'none';
