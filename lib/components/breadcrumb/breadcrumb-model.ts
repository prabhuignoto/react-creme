import React, { ReactNode } from "react";

export interface BreadCrumbModel extends BreadCrumbCommonModel {
  children: React.ReactNode;
  onClick?: () => void;
}

export interface BreadCrumbItemModel extends BreadCrumbCommonModel {
  id: string;
  onClick?: () => void;
  child: ReactNode;
  showChevron?: boolean;
}

export interface BreadCrumbCommonModel {
  icon?: "chevron" | "arrow" | "slash";
  size?: "sm" | "md" | "lg";
}
