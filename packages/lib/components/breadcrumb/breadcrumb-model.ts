import React, { ReactNode } from "react";

export interface BreadCrumbModel extends BreadCrumbCommonModel {
  children: React.ReactNode;
  onClick?: () => void;
}

export interface BreadCrumbItemModel extends BreadCrumbCommonModel {
  child: ReactNode;
  id: string;
  onClick?: () => void;
  showChevron?: boolean;
}

export interface BreadCrumbCommonModel {
  icon?: "chevron" | "arrow" | "slash";
  size?: "sm" | "md" | "lg";
}
