import { CSSProperties } from "react";

interface DataGridCommon {
  layoutStyle?: "compact" | "comfortable";
}

export interface DataGridColumn {
  align?: string;
  format?: string;
  id?: string;
  name: string;
  sortOrder?: string;
  sortable?: boolean;
  type?: "string" | "number";
  width?: number;
}

export interface DataGridCell {
  name: string;
  value: string;
}

export interface DataRow extends DataGridCommon {
  columnConfigs?: DataGridColumn[];
  columnWidth?: number;
  data: any;
  id?: string;
  style?: CSSProperties;
}

export interface DataGridModel {
  rows: DataRow[];
}

export interface DataGridProps extends DataGridCommon {
  columns?: DataGridColumn[];
  data: { [key: string]: string | number }[];
}

export interface DataGridHeaderProps extends DataGridCommon {
  columnWidth?: number;
  columns: DataGridColumn[];
  onSort?: (column: string, dir: SortDirection) => void;
  style?: CSSProperties;
}

export type SortDirection = "asc" | "desc" | "none";
