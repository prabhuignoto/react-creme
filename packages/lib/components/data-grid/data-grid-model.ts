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
  /**
   * Allow rendering HTML content in cells for this column.
   * ⚠️ **SECURITY WARNING**: Only enable for trusted content!
   * HTML is sanitized with DOMPurify to prevent XSS attacks.
   * @default false
   */
  parseHtml?: boolean;
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
  /**
   * Allow rendering HTML content in this cell.
   * ⚠️ **SECURITY WARNING**: Only enable for trusted content!
   * HTML is sanitized with DOMPurify to prevent XSS attacks.
   */
  parseHtml?: boolean;
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
  rowIndex?: number;
  style?: CSSProperties;
};

export interface DataGridModel {
  rows: DataRow[];
}

export interface DataGridProps {
  /**
   * Accessible label for the data grid table
   * @default "Data grid"
   */
  ariaLabel?: string;
  /**
   * Show border around the grid
   */
  border?: boolean;
  /**
   * Column configuration
   */
  columns?: DataGridColumn[];
  /**
   * Data to display in the grid
   */
  data: Record[];
  /**
   * Use fixed height for cells (prevents wrapping)
   */
  fixedHeight?: boolean;
  /**
   * Fixed width for the grid in pixels
   */
  gridWidth?: number;
  /**
   * Layout density - compact or comfortable
   * @default 'comfortable'
   */
  layoutStyle?: 'compact' | 'comfortable';
  /**
   * Custom row height in pixels
   */
  rowHeight?: number;
  /**
   * Placeholder text for search input
   * @default 'Search...'
   */
  searchPlaceholder?: string;
  /**
   * Size variant for text and spacing
   * @default 'sm'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Apply zebra striping to alternating rows
   */
  zebra?: boolean;
}

export type DataGridHeaderProps = Pick<
  DataGridProps,
  'border' | 'columns' | 'layoutStyle' | 'size'
> & {
  columnWidth?: number;
  onSort?: (column: string, dir: SortDirection) => void;
  searchable?: boolean;
  sortData?: {
    column?: string;
    dir?: SortDirection;
  };
  style?: CSSProperties;
};

export type SortDirection = 'asc' | 'desc' | 'none';
