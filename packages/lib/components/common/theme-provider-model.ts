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

export type IconSizes = Pick<Sizes, 'sm' | 'md' | 'lg'>;

export type Theme = {
  colors: Colors;
  fontSizes?: FontSizes;
  iconSizes?: IconSizes;
  sizes?: Sizes;
};

export interface ThemeProviderProps {
  theme?: Theme;
}

export type ThemeColor = keyof Colors;
