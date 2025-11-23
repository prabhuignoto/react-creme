import type { Preview } from '@storybook/react';
import './preview.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    a11y: {
      // Enable axe-core a11y checks
      config: {},
      options: {},
    },
  },
};

export default preview;
