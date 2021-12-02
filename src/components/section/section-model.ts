import React from "react";

export interface SectionModel {
  children: React.ReactNode | React.ReactNode[];
  title: string;
  height?: number;
}