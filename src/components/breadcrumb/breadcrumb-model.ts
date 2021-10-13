import React from "react";

export interface BreadCrumbModel {
  children: React.ReactNode;
  onClick?: (ev: React.MouseEvent) => void;
}
