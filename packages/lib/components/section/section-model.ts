import React from "react";

export interface SectionModel {
  RTL?: boolean;
  children: React.ReactNode | React.ReactNode[];
  height?: number;
  layout?: "row" | "column";
  size?: "sm" | "md" | "lg";
  title?: string;
}
