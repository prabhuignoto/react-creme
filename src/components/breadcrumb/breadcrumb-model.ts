import React from "react";

export interface BreadCrumbModel {
  children: React.ReactNode;
  onClick?: () => void;
}
