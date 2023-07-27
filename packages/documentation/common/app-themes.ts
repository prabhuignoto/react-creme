import { Colors } from '../../lib/components/common/theme-provider-model';

export type AppTheme = 'Default' | 'Glacier' | 'Coffee' | 'Blueberry';

// export const Default: Colors = {
//   primary: '#0074B7',
//   secondary: '#BFD7ED',
//   tertiary: '#003B73',
//   text: '#000',
//   textSelection: '#fff',
// };

export const Default: Colors = {
  primary: '#007AFF', // The first color of the gradient in the original button design
  secondary: '#00C6FF', // The second color of the gradient in the original button design
  tertiary: '#ADD8E6', // A lighter shade of blue, could be used for backgrounds or inactive elements
  text: '#000', // The text color from the original button design
  textSelection: '#fff', // The text selection color from the original button design
};

export const Blueberry: Colors = {
  primary: '#47597E',
  secondary: '#abc4fa',
  tertiary: '#DBE6FD',
  text: '#000',
  textSelection: '#fff',
};

export const Dark: Colors = {
  primary: '#1597e5',
  secondary: '#323232',
  tertiary: '#464646',
  text: '#fff',
  textSelection: '#fff',
};

export const Cream: Colors = {
  primary: '#1572A1',
  secondary: '#9AD0EC',
  tertiary: '#D3DEDC',
  text: '#000',
  textSelection: '#fff',
};

export const Gray: Colors = {
  primary: '#495057',
  secondary: '#adb5bd',
  tertiary: '#D3DEDC',
  text: '#000',
  textSelection: '#fff',
};
