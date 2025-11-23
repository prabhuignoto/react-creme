import React from 'react';

/**
 * Size variants for the ScrollSpy component
 */
export type ScrollSpySize = 'sm' | 'md' | 'lg';

/**
 * Props for the ScrollSpy component
 */
export interface ScrollSpyProps {
  /**
   * The content to be displayed in the scroll spy sections.
   * Can be a single element or an array of elements matching the links array.
   */
  children: React.ReactNode[] | React.ReactNode;

  /**
   * The list of scroll spy links to display in the side menu.
   * These labels will appear in the navigation sidebar.
   */
  links: string[];

  /**
   * The position of the side menu links.
   * @default 'left'
   */
  linksPosition?: 'left' | 'right';

  /**
   * Whether to show section titles in the content area.
   * When true, displays the link name as a header above each content section.
   * @default true
   */
  showSectionTitle?: boolean;

  /**
   * Size variant for the component.
   * Affects font sizes, padding, and navigation width.
   * @default 'md'
   */
  size?: ScrollSpySize;

  /**
   * Additional CSS class name for the wrapper element.
   */
  className?: string;

  /**
   * Custom ARIA label for the navigation menu.
   * @default 'Table of Contents'
   */
  ariaLabel?: string;

  /**
   * Vertical offset in pixels when scrolling to a section.
   * Useful when you have a fixed header.
   * @default 0
   */
  offsetTop?: number;
}

/**
 * Internal representation of a scroll spy link with active state
 */
export interface ScrollSpyLinkInternal {
  active: boolean;
  id: string;
  name: string;
}

/**
 * Internal representation of scroll spy content with intersection state
 */
export interface ScrollSpyContent {
  active: boolean;
  hash: number;
  id: string;
}
