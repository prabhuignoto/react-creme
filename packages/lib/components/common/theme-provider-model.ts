import { ReactNode } from 'react';

export type Colors = {
  primary: string;
  secondary: string;
  tertiary: string;
  text: string;
  textSelection: string;
};

export type FontSizes = Pick<Sizes, 'sm' | 'md' | 'lg'>;

export type Sizes = {
  lg: number;
  md: number;
  sm: number;
};

export type IconSizes = Pick<Sizes, 'sm' | 'md' | 'lg'> & {
  xs: number;
};

export type zIndexes = {
  dialog: number;
  globalNotification: number;
  menu: number;
  notification: number;
};

export type Theme = {
  colors?: Colors;
  darkMode?: boolean;
  fontSizes?: FontSizes;
  iconSizes?: IconSizes;
  sizes?: Sizes;
  zIndexes?: zIndexes;
};

export interface ThemeProviderProps {
  children?: ReactNode | ReactNode[];
  theme?: Theme;
}

export type ThemeColor = keyof Colors;
