import React from "react";

export interface ScrollSpyProps {
  links: string[];
  children: React.ReactNode[] | React.ReactNode;
  linksPosition?: "left" | "right";
}

export interface ScrollSpyLinkInternal {
  id: string;
  name: string;
  active: boolean;
}

export interface ScrollSpyContent {
  id: string;
  active: boolean;
  hash: number;
}
