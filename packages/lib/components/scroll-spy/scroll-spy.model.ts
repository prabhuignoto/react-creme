import React from "react";

export interface ScrollSpyProps {
  children: React.ReactNode[] | React.ReactNode;
  links: string[];
  linksPosition?: "left" | "right";
  showSectionTitle?: boolean;
}

export interface ScrollSpyLinkInternal {
  active: boolean;
  id: string;
  name: string;
}

export interface ScrollSpyContent {
  active: boolean;
  hash: number;
  id: string;
}
