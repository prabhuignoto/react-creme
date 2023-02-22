import React, { CSSProperties, KeyboardEvent, MouseEvent } from 'react';

// export interface ButtonProps defines the props that will be passed to a custom React Button component
export interface ButtonProps {
  // accent can take either the value 'flat' or 'rounded' (optional)
  accent?: 'flat' | 'rounded';

  // border turns on/off the button's border (optional)
  border?: boolean;

  // children can contain any valid React components (optional)
  children?: React.ReactNode;

  // disabled makes the button unclickable if set to true (optional)
  disabled?: boolean;

  // focusable allows for keyboard navigation and tab index (optional)
  focusable?: boolean;

  // isBusy changes the appearance of the button when its performing a role, like submitting data (optional)
  isBusy?: boolean;

  // label gives the user information about the button when not using an icon (optional)
  label?: string;

  // onClick triggers a function after being clicked (optional)
  onClick?: (ev?: MouseEvent | KeyboardEvent) => void;

  // primary changes the color of the button to emphasize it being selected (optional)
  primary?: boolean;

  // size sets the sizeof the button (optional)
  size?: 'sm' | 'md' | 'lg';

  // style provides styling options at runtime (optional)
  style?: CSSProperties;

  // type is related to the design theme of the buttons (primary, default, danger, icon, progress) (optional)
  type?: 'primary' | 'default' | 'danger' | 'icon' | 'progress';
}
