import { Colors } from '../../lib/components/common/theme-provider-model';

export type AppTheme = 'Default' | 'Glacier' | 'Coffee' | 'Blueberry';

export const Default: Partial<Colors> = {
  primary: '#0074B7',
  secondary: '#BFD7ED',
  tertiary: '#003B73',
  text: '#000',
  textSelection: '#fff',
};

export const Blueberry: Partial<Colors> = {
  primary: '#47597E',
  secondary: '#abc4fa',
  tertiary: '#DBE6FD',
  text: '#000',
  textSelection: '#fff',
};

export const Dark: Partial<Colors> = {
  primary: '#1597e5',
  secondary: '#323232',
  tertiary: '#464646',
  text: '#fff',
  textSelection: '#fff',
};

export const Cream: Partial<Colors> = {
  primary: '#1572A1',
  secondary: '#9AD0EC',
  tertiary: '#D3DEDC',
  text: '#000',
  textSelection: '#fff',
};
