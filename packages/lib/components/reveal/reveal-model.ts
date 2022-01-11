import React from "react";

export interface RevealProps {
  children: React.ReactNode | React.ReactNode[];
  parent: React.RefObject<HTMLElement>;
}
