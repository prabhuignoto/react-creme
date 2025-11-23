import type { Preview } from '@storybook/react';
import React from 'react';

import '../packages/documentation/App.scss';
import '../packages/lib/design/core.scss';
import '../packages/lib/design/theme.scss';

const preview: Preview = {
  parameters: {
    controls: { expanded: true, sort: 'alpha' },
    actions: { argTypesRegex: '^on[A-Z].*' },
    layout: 'padded',
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
  },
  decorators: [
    Story => (
      <div style={{ padding: 16 }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default preview;
