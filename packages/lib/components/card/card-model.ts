import { ReactNode } from 'react';

// CardProps interface
export interface CardProps {
  // alignFooter sets the alignment of the footer element
  alignFooter?: 'left' | 'center' | 'right';

  // alignHeader sets the alignment of the header element
  alignHeader?: 'left' | 'center' | 'right';

  // border determines whether or not to show a border
  border?: boolean;

  // children can be either a single ReactNode or an array of ReactNode elements
  children?: ReactNode | ReactNode[];

  // footer allows adding optional footer into the card
  footer?: ReactNode;

  // header allows adding a header into the card
  header?: ReactNode;

  // height defines the height of the card (default is auto)
  height?: number;

  // shadow sets a drop shadow on the card
  shadow?: boolean;
}
