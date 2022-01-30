import { Theme } from '../../lib/components/common/theme-provider';

export type AppTheme = 'Default' | 'Glacier' | 'Coffee' | 'Blueberry';

export const Default: Theme = {
  primary: '#0074B7',
  secondary: '#BFD7ED',
  tertiary: '#003B73',
  textSelection: '#003B73',
};

export const Glacier: Theme = {
  primary: '#1995AD',
  secondary: '#a1d6e2',
  tertiary: '#062127',
  textSelection: '#1995AD',
};

export const Coffee: Theme = {
  primary: '#b38867',
  secondary: '#ddbc95',
  tertiary: '#231912',
  textSelection: '#231912',
};

export const Tangerine: Theme = {
  primary: '#3F3351',
  secondary: '#864879',
  tertiary: '#1F1D36',
  textSelection: '#864879',
};

export const Blueberry: Theme = {
  primary: '#47597E',
  secondary: '#DBE6FD',
  tertiary: '#293B5F',
  textSelection: '#293B5F',
};
