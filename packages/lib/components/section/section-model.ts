import React from "react";

export interface SectionModel {
  children: React.ReactNode | React.ReactNode[];
  title?: string;
  height?: number;
  layout?: "row" | "column";
  RTL?: boolean;
  size?: "sm" | "md" | "lg";
}
